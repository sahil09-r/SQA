# MySQL Workbench - Quick Action Guide

## ✅ MySQL Connection Test Passed!
Port 3306 is **OPEN** and **RESPONDING** on EXOTIC - ready to set up!

---

## Get Started in 3 Minutes

### 🔗 **Step 1: Open Workbench Connection**

1. **Open MySQL Workbench**
2. On the home screen, you'll see **MySQL Connections**
3. Look for connection named **EXOTIC** (or similar)
4. **Double-click** to connect
5. You should see the SQL editor open

---

### 📂 **Step 2: Open Database Setup Script**

**Method A (Fastest):**
1. In Workbench, click: **File** → **Open SQL Script**
2. Navigate to: `c:\Users\sahil\Desktop\qualityhub-sqa\qualityhub-sqa\`
3. Select: `database_setup.sql`
4. Click: **Open**

**Method B (Copy-Paste):**
1. Open `database_setup.sql` in VS Code
2. Select all: **Ctrl+A**
3. Copy: **Ctrl+C**
4. In Workbench: **File** → **New Query Tab**
5. Paste: **Ctrl+V**

---

### ⚡ **Step 3: Execute the Script**

1. **Select all** in editor: **Ctrl+A**
2. Click **⚡ Execute** button (lightning bolt icon in toolbar)
   - OR Press: **Ctrl+Shift+Enter**

3. **Watch the Output Panel** at the bottom for progress:
   ```
   ✅ 0 rows affected (Database created)
   ✅ 0 rows affected (Table users created)
   ✅ 0 rows affected (Table modules created)
   ✅ 0 rows affected (Table test_cases created)
   ✅ 0 rows affected (Table bugs created)
   ✅ 3 rows affected (Users inserted)
   ✅ 6 rows affected (Modules inserted)
   ✅ 4 rows affected (Test cases inserted)
   ✅ 3 rows affected (Bugs inserted)
   ```

---

### ✅ **Step 4: Verify Setup (1 minute)**

1. **Refresh**: Click **🔄** or press **Ctrl+R**
2. In left sidebar, expand **Schemas**
3. You should see **SQA** database
4. Expand **SQA** and verify 4 tables:
   - ✅ `users`
   - ✅ `modules`
   - ✅ `test_cases`
   - ✅ `bugs`

**View sample data:**
1. Right-click on `users` table
2. Select: **Select Rows - Limit 1000**
3. Bottom panel shows data:
   ```
   alice    | alice@qualityhub.com     | tester
   bob      | bob@qualityhub.com       | developer
   charlie  | charlie@qualityhub.com   | admin
   ```

---

### 🎉 **Done!**

Your database is now set up with:
- ✅ 3 Users
- ✅ 6 Modules
- ✅ 4 Test Cases
- ✅ 3 Bug Reports
- ✅ All relationships configured

---

## Next: Start the Backend

Once database is verified, open a terminal and run:

```bash
cd c:\Users\sahil\Desktop\qualityhub-sqa\qualityhub-sqa
npm install
npm start
```

Backend will run on: **http://localhost:5000**

---

## Quick Test Queries (Optional)

After setup, you can run these queries in Workbench to verify:

**Query 1: Count test cases**
```sql
SELECT COUNT(*) as total_test_cases FROM test_cases;
```
Expected: **4**

**Query 2: View test cases with modules**
```sql
SELECT tc.id, tc.title, m.name as module, tc.status
FROM test_cases tc
JOIN modules m ON tc.module_id = m.id;
```

**Query 3: Count open bugs**
```sql
SELECT COUNT(*) as open_bugs FROM bugs WHERE status = 'open';
```
Expected: **2**

---

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Script doesn't execute | Check if all text is selected (Ctrl+A) before clicking Execute |
| Tables not visible | Press **Ctrl+R** to refresh schemas |
| Connection error | Verify EXOTIC connection exists and double-click it |
| No data appears | Run test queries above to verify |
| Script already executed | Option: `DROP DATABASE IF EXISTS SQA;` then re-run |

---

**Ready? Open MySQL Workbench and follow Steps 1-4 above!** ⚡
