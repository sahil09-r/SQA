const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const pool = require('./config');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// ============= TEST CASES ENDPOINTS =============

// GET all test cases
app.get('/api/testcases', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        tc.id, tc.title, tc.description, 
        m.name as module, tc.priority, tc.status, 
        u.username as assignedTo, tc.created_at as createdAt, tc.last_run as lastRun
      FROM test_cases tc
      JOIN modules m ON tc.module_id = m.id
      LEFT JOIN users u ON tc.assigned_to = u.id
      ORDER BY tc.created_at DESC
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single test case
app.get('/api/testcases/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        tc.id, tc.title, tc.description, 
        m.name as module, tc.priority, tc.status, 
        u.username as assignedTo, tc.created_at as createdAt, tc.last_run as lastRun
      FROM test_cases tc
      JOIN modules m ON tc.module_id = m.id
      LEFT JOIN users u ON tc.assigned_to = u.id
      WHERE tc.id = ?
    `, [req.params.id]);
    connection.release();
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new test case
app.post('/api/testcases', async (req, res) => {
  try {
    const { id, title, description, module, priority, status, assignedTo } = req.body;
    const connection = await pool.getConnection();
    
    // Get module ID
    const [moduleRows] = await connection.query('SELECT id FROM modules WHERE name = ?', [module]);
    const moduleId = moduleRows[0]?.id;
    
    // Get user ID if assigned
    let userId = null;
    if (assignedTo) {
      const [userRows] = await connection.query('SELECT id FROM users WHERE username = ?', [assignedTo]);
      userId = userRows[0]?.id;
    }
    
    const today = new Date().toISOString().split('T')[0];
    const [result] = await connection.query(
      'INSERT INTO test_cases (id, title, description, module_id, priority, status, assigned_to, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [id, title, description, moduleId, priority, status || 'not_run', userId, today]
    );
    
    connection.release();
    res.status(201).json({ message: 'Test case created', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update test case
app.put('/api/testcases/:id', async (req, res) => {
  try {
    const { title, description, priority, status, assignedTo } = req.body;
    const connection = await pool.getConnection();
    
    let userId = null;
    if (assignedTo) {
      const [userRows] = await connection.query('SELECT id FROM users WHERE username = ?', [assignedTo]);
      userId = userRows[0]?.id;
    }
    
    await connection.query(
      'UPDATE test_cases SET title = ?, description = ?, priority = ?, status = ?, assigned_to = ? WHERE id = ?',
      [title, description, priority, status, userId, req.params.id]
    );
    
    connection.release();
    res.json({ message: 'Test case updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE test case
app.delete('/api/testcases/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM test_cases WHERE id = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Test case deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= BUGS ENDPOINTS =============

// GET all bugs
app.get('/api/bugs', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        b.id, b.title, b.description, 
        m.name as module, b.severity, b.status, 
        u1.username as assignedTo, u2.username as reporter, 
        b.created_at as createdAt, b.updated_at as updatedAt
      FROM bugs b
      JOIN modules m ON b.module_id = m.id
      LEFT JOIN users u1 ON b.assigned_to = u1.id
      LEFT JOIN users u2 ON b.reporter = u2.id
      ORDER BY b.updated_at DESC
    `);
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET single bug
app.get('/api/bugs/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query(`
      SELECT 
        b.id, b.title, b.description, 
        m.name as module, b.severity, b.status, 
        u1.username as assignedTo, u2.username as reporter, 
        b.created_at as createdAt, b.updated_at as updatedAt
      FROM bugs b
      JOIN modules m ON b.module_id = m.id
      LEFT JOIN users u1 ON b.assigned_to = u1.id
      LEFT JOIN users u2 ON b.reporter = u2.id
      WHERE b.id = ?
    `, [req.params.id]);
    connection.release();
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST create new bug
app.post('/api/bugs', async (req, res) => {
  try {
    const { id, title, description, module, severity, status, assignedTo, reporter } = req.body;
    const connection = await pool.getConnection();
    
    // Get module ID
    const [moduleRows] = await connection.query('SELECT id FROM modules WHERE name = ?', [module]);
    const moduleId = moduleRows[0]?.id;
    
    // Get user IDs
    let assignedToId = null;
    if (assignedTo) {
      const [userRows] = await connection.query('SELECT id FROM users WHERE username = ?', [assignedTo]);
      assignedToId = userRows[0]?.id;
    }
    
    const [reporterRows] = await connection.query('SELECT id FROM users WHERE username = ?', [reporter]);
    const reporterId = reporterRows[0]?.id;
    
    const today = new Date().toISOString().split('T')[0];
    const [result] = await connection.query(
      'INSERT INTO bugs (id, title, description, module_id, severity, status, assigned_to, reporter, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
      [id, title, description, moduleId, severity, status || 'open', assignedToId, reporterId, today, today]
    );
    
    connection.release();
    res.status(201).json({ message: 'Bug created', id });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// PUT update bug
app.put('/api/bugs/:id', async (req, res) => {
  try {
    const { title, description, severity, status, assignedTo } = req.body;
    const connection = await pool.getConnection();
    
    let userId = null;
    if (assignedTo) {
      const [userRows] = await connection.query('SELECT id FROM users WHERE username = ?', [assignedTo]);
      userId = userRows[0]?.id;
    }
    
    const today = new Date().toISOString().split('T')[0];
    await connection.query(
      'UPDATE bugs SET title = ?, description = ?, severity = ?, status = ?, assigned_to = ?, updated_at = ? WHERE id = ?',
      [title, description, severity, status, userId, today, req.params.id]
    );
    
    connection.release();
    res.json({ message: 'Bug updated' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// DELETE bug
app.delete('/api/bugs/:id', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    await connection.query('DELETE FROM bugs WHERE id = ?', [req.params.id]);
    connection.release();
    res.json({ message: 'Bug deleted' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ============= DASHBOARD ENDPOINTS =============

// GET dashboard stats
app.get('/api/dashboard/stats', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    
    const [stats] = await connection.query(`
      SELECT 
        (SELECT COUNT(*) FROM test_cases) as totalTests,
        (SELECT COUNT(*) FROM test_cases WHERE status = 'passed') as passedTests,
        (SELECT COUNT(*) FROM bugs WHERE status = 'open') as openBugs,
        (SELECT COUNT(*) FROM bugs WHERE severity = 'critical') as criticalBugs,
        (SELECT COUNT(*) FROM bugs WHERE status = 'in_progress') as inProgressBugs
    `);
    
    connection.release();
    res.json(stats[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET modules
app.get('/api/modules', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT id, name, description FROM modules');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// GET users
app.get('/api/users', async (req, res) => {
  try {
    const connection = await pool.getConnection();
    const [rows] = await connection.query('SELECT id, username, email, role FROM users');
    connection.release();
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'Backend is running' });
});

// Start server
app.listen(PORT, () => {
  console.log(`QualityHub Backend running on http://localhost:${PORT}`);
  console.log(`Database: SQA on EXOTIC:3306`);
});
