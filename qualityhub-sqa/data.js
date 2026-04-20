
// === API Configuration ===
const API_URL = 'http://localhost:5000/api';

// Initialize empty arrays - will be populated from API
let testCases = [];
let bugs = [];

// === Fetch Data from Backend ===
async function fetchTestCases() {
  try {
    const response = await fetch(`${API_URL}/testcases`);
    testCases = await response.json();
    renderTestCases();
  } catch (error) {
    console.error('Error fetching test cases:', error);
    document.getElementById('tc-tbody').innerHTML = `<tr><td colspan="7" class="empty">Error loading test cases</td></tr>`;
  }
}

async function fetchBugs() {
  try {
    const response = await fetch(`${API_URL}/bugs`);
    bugs = await response.json();
    renderBugs();
  } catch (error) {
    console.error('Error fetching bugs:', error);
    document.getElementById('bug-list').innerHTML = `<div class="card empty">Error loading bugs</div>`;
  }
}

async function fetchDashboardStats() {
  try {
    const response = await fetch(`${API_URL}/dashboard/stats`);
    const stats = await response.json();
    return stats;
  } catch (error) {
    console.error('Error fetching stats:', error);
    return null;
  }
}

// === Create Test Case ===
async function submitTestCase(formData) {
  try {
    const tcId = `TC-${String(testCases.length + 1).padStart(3, '0')}`;
    const response = await fetch(`${API_URL}/testcases`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: tcId,
        title: formData.get('title'),
        description: formData.get('description'),
        module: formData.get('module'),
        priority: formData.get('priority'),
        assignedTo: formData.get('assignedTo')
      })
    });
    if (response.ok) {
      fetchTestCases();
    }
  } catch (error) {
    console.error('Error creating test case:', error);
  }
}

// === Create Bug ===
async function submitBug(formData) {
  try {
    const bugId = `BUG-${String(bugs.length + 1).padStart(3, '0')}`;
    const response = await fetch(`${API_URL}/bugs`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        id: bugId,
        title: formData.get('title'),
        description: formData.get('description'),
        module: formData.get('module'),
        severity: formData.get('severity'),
        assignedTo: formData.get('assignedTo'),
        reporter: 'Current User'
      })
    });
    if (response.ok) {
      fetchBugs();
    }
  } catch (error) {
    console.error('Error creating bug:', error);
  }
}

// Load data on page load
window.addEventListener('load', () => {
  fetchTestCases();
  fetchBugs();
  renderDashboard();
});
