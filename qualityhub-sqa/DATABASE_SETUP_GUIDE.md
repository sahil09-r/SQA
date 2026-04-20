# MySQL Workbench Database Setup - Step by Step Guide

## Prerequisites
- MySQL Server installed and running on `EXOTIC:3306`
- MySQL Workbench installed
- MySQL Credentials:
  - **Host:** EXOTIC
  - **Port:** 3306
  - **Username:** root
  - **Password:** Sahil

---

## Step 1: Connect to MySQL Server in Workbench

1. **Open MySQL Workbench**
2. In the home screen, you'll see "MySQL Connections" section
3. Look for an existing connection or create a new one:
   - Click **"+"** button next to "MySQL Connections"
   - Enter connection name: `EXOTIC` (or any name you prefer)
   - Connection Method: `Standard (TCP/IP)`
   - Hostname: `EXOTIC`
   - Port: `3306`
   - Username: `root`
   - Password: `Sahil` (click "Store in Vault" if prompted)
   - Click **"Test Connection"** to verify
   - Click **"OK"** to save

4. **Double-click the connection** to open it
   - You should see the main Workbench editor

---

## Step 2: Open the Database Setup Script

### Option A: Open File from Disk

1. In MySQL Workbench, click **File** → **Open SQL Script**
2. Navigate to: `c:\Users\sahil\Desktop\qualityhub-sqa\qualityhub-sqa\`
3. Select **`database_setup.sql`**
4. Click **Open**

### Option B: Copy-Paste Script

1. Open `database_setup.sql` in VS Code or any text editor
2. Select all content (Ctrl+A)
3. Copy (Ctrl+C)
4. In MySQL Workbench, click **File** → **New Query Tab**
5. Right-click in the editor → **Paste** (or Ctrl+V)

---

## Step 3: Review the Script

Once the script is open in the editor, you'll see:

```sql
-- Create Database
CREATE DATABASE IF NOT EXISTS SQA;
USE SQA;

-- Tables:
-- Users Table
-- Modules Table
-- Test Cases Table
-- Bugs Table

-- Sample Data Insertion
```

**Key sections:**

| Section | Creates |
|---------|---------|
| `CREATE DATABASE IF NOT EXISTS SQA;` | Database named "SQA" |
| `CREATE TABLE users` | User records (admin, tester, developer) |
| `CREATE TABLE modules` | Project modules (Auth, Cart, Search, etc.) |
| `CREATE TABLE test_cases` | Test case records with status tracking |
| `CREATE TABLE bugs` | Bug reports with severity and assignment |
| `INSERT INTO...` | Sample data for testing |

---

## Step 4: Execute the Script

### Method 1: Execute All at Once

1. **In the script editor**, select all content (Ctrl+A)
2. Click the **⚡ lightning bolt icon** (Execute) in the toolbar
   - OR press **Ctrl+Shift+Enter**
3. Watch the execution panel at the bottom
4. You should see:
   ```
   0 rows affected (Database created)
   0 rows affected (Table created)
   ...
   3 rows affected (Data inserted)
   ```

### Method 2: Execute Specific Sections

1. **Select specific SQL statements** in the editor
2. Right-click → **Execute Selection**
   - OR highlight text → press Ctrl+Shift+Enter

---

## Step 5: Verify Database Creation

After execution completes, verify everything was created:

### Check Databases
1. In the left sidebar under **Schemas**, you should see:
   - 🗂️ `SQA` (our new database)
   - Other default MySQL databases

### Check Tables
1. Click the **🔄 refresh icon** or press **Ctrl+R**
2. Expand the **SQA** database by clicking the arrow/expand icon
3. You should see 4 tables:
   - 📋 `bugs`
   - 📋 `modules`
   - 📋 `test_cases`
   - 📋 `users`

### View Sample Data
1. Right-click on any table → **Select Rows - Limit 1000**
2. The data will appear in the bottom panel
3. You can see:
   - **users:** 3 users (alice, bob, charlie)
   - **modules:** 6 modules (Authentication, Cart, Search, Payments, Orders, Profile)
   - **test_cases:** 4 test cases (TC-001, TC-002, etc.)
   - **bugs:** 3 bugs (BUG-001, BUG-002, BUG-003)

---

## Step 6: Verify Table Structure

To view the table structure (columns, data types, constraints):

1. Right-click on a table → **Alter Table** or **Table Inspector**
2. View columns:

### Example: `test_cases` Table
| Column | Type | Details |
|--------|------|---------|
| id | VARCHAR(20) | Primary Key - Format: TC-001, TC-002 |
| title | VARCHAR(255) | Test case name |
| description | TEXT | Detailed description |
| module_id | INT | Foreign key to modules |
| priority | ENUM | critical, high, medium, low |
| status | ENUM | passed, failed, running, not_run |
| assigned_to | INT | Foreign key to users (nullable) |
| created_at | DATE | Creation date |
| last_run | DATE | Last execution date (nullable) |

### Example: `bugs` Table
| Column | Type | Details |
|--------|------|---------|
| id | VARCHAR(20) | Primary Key - Format: BUG-001, BUG-002 |
| title | VARCHAR(255) | Bug title |
| description | TEXT | Bug description |
| module_id | INT | Foreign key to modules |
| severity | ENUM | critical, high, medium, low |
| status | ENUM | open, in_progress, resolved, closed |
| assigned_to | INT | Foreign key to users (nullable) |
| reporter | INT | Foreign key to users (bug reporter) |
| created_at | DATE | Creation date |
| updated_at | DATE | Last update date |

---

## Step 7: Run Test Queries

Once setup is complete, test with simple queries:

### Query 1: Count all test cases
```sql
USE SQA;
SELECT COUNT(*) as total FROM test_cases;
```
**Expected result:** 4 rows

### Query 2: View all users with their roles
```sql
SELECT username, email, role FROM users;
```
**Expected result:**
```
alice    | alice@qualityhub.com     | tester
bob      | bob@qualityhub.com       | developer
charlie  | charlie@qualityhub.com   | admin
```

### Query 3: View test cases with module names
```sql
SELECT tc.id, tc.title, m.name as module, tc.status
FROM test_cases tc
JOIN modules m ON tc.module_id = m.id;
```
**Expected result:**
```
TC-001 | Login with valid credentials  | Authentication | passed
TC-002 | Add item to cart              | Cart           | passed
TC-003 | Search product by name        | Search         | failed
TC-004 | Process payment               | Payments       | running
```

### Query 4: View open bugs
```sql
SELECT id, title, severity, status, module
FROM bugs
WHERE status = 'open';
```

---

## Troubleshooting

### Error: "Access denied for user 'root'@'EXOTIC'"
- **Solution:**
  1. Check connection settings (Hostname: EXOTIC, Port: 3306)
  2. Verify password is "Sahil"
  3. Ensure MySQL Server is running
  4. Try connecting from MySQL command line first:
     ```bash
     mysql -h EXOTIC -u root -p
     ```

### Error: "Unknown database 'SQA'"
- **Solution:**
  1. The script might not have executed successfully
  2. Check the "Output" panel for error messages
  3. Verify the script file is complete and not corrupted
  4. Try executing line by line to find the issue

### Error: "Duplicate entry for key"
- **Solution:**
  1. The script may have already been executed once
  2. Option A: Drop the existing database
     ```sql
     DROP DATABASE IF EXISTS SQA;
     ```
     Then re-run the setup script
  3. Option B: Skip INSERT statements and only run CREATE statements

### Tables not showing up after refresh
- **Solution:**
  1. Press **Ctrl+R** to refresh the schema list
  2. Disconnect and reconnect to the server
  3. In Workbench, click **Server** → **Refresh**

### No data appears when selecting from tables
- **Solution:**
  1. Verify INSERT statements executed (check execution results)
  2. Run `SELECT COUNT(*) FROM table_name;` to check if data exists
  3. Re-run just the INSERT statements from the setup script

---

## Success Indicators

✅ Setup is complete when you see:

1. ✅ **SQA database** visible in Schemas panel
2. ✅ **4 tables** visible under SQA:
   - bugs
   - modules
   - test_cases
   - users
3. ✅ **3 users** in users table
4. ✅ **6 modules** in modules table
5. ✅ **4 test cases** in test_cases table
6. ✅ **3 bugs** in bugs table
7. ✅ **Sample data** visible when selecting from tables
8. ✅ **Foreign keys** properly linked (no referential integrity errors)

---

## Next Steps

Once database setup is complete:

1. ✅ Database configured and running
2. ⏭️ Install Node.js dependencies: `npm install`
3. ⏭️ Start Express backend: `npm start`
4. ⏭️ Connect frontend to backend APIs
5. ⏭️ Test API endpoints with Postman or browser

For backend setup, see: [BACKEND_SETUP.md](BACKEND_SETUP.md)

---

## Quick Reference Commands

If using MySQL Command Line instead of Workbench:

```bash
# Connect to MySQL
mysql -h EXOTIC -u root -p
# Enter password: Sahil

# Run the setup script
mysql -h EXOTIC -u root -p Sahil < database_setup.sql

# Verify setup
mysql -h EXOTIC -u root -p Sahil -e "USE SQA; SHOW TABLES; SELECT COUNT(*) as users FROM users;"
```

---

## FAQ

**Q: Can I modify the sample data?**
A: Yes! You can edit the INSERT statements in database_setup.sql before running, or use:
```sql
UPDATE users SET role = 'admin' WHERE username = 'alice';
DELETE FROM bugs WHERE id = 'BUG-003';
```

**Q: Can I add more test cases manually?**
A: Yes! Use standard SQL INSERT:
```sql
INSERT INTO test_cases (id, title, description, module_id, priority, status, assigned_to, created_at)
VALUES ('TC-005', 'Test case title', 'Description', 1, 'high', 'not_run', 1, '2026-04-20');
```

**Q: What if I need to reset the database?**
A: Run this command:
```sql
DROP DATABASE IF EXISTS SQA;
```
Then re-run the entire database_setup.sql script.

**Q: How do I backup the database?**
A: In Workbench:
1. Right-click on SQA database
2. Select **Dump SQL File**
3. Choose location and save

---

**Setup Complete!** 🎉 Your QualityHub database is ready to use.
