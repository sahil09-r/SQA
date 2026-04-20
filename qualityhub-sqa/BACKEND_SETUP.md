# QualityHub SQA System - Backend Setup Guide

## Database Setup Instructions

### Prerequisites
- MySQL Server installed and running on `EXOTIC:3306`
- MySQL credentials: `root` / `Sahil`
- MySQL Workbench (optional, for GUI management)

### Step 1: Create Database and Tables

1. **Open MySQL Workbench** or MySQL command line:
   ```bash
   mysql -h EXOTIC -u root -p
   # Enter password: Sahil
   ```

2. **Run the database setup script:**
   - Open `database_setup.sql` in MySQL Workbench
   - Execute the entire script (Ctrl+Shift+Enter or click Execute)
   
   **OR** from command line:
   ```bash
   mysql -h EXOTIC -u root -p Sahil < database_setup.sql
   ```

3. **Verify tables were created:**
   ```sql
   USE SQA;
   SHOW TABLES;
   ```

   You should see:
   - `bugs`
   - `modules`
   - `test_cases`
   - `users`

### Step 2: Backend Installation

1. **Install Node.js dependencies:**
   ```bash
   cd c:\Users\sahil\Desktop\qualityhub-sqa\qualityhub-sqa
   npm install
   ```

2. **Start the backend server:**
   ```bash
   npm start
   ```
   
   Or for development with auto-reload:
   ```bash
   npm run dev
   ```

3. **Verify backend is running:**
   - Open http://localhost:5000/api/health in your browser
   - You should see: `{"status":"Backend is running"}`

## API Endpoints

### Test Cases
- `GET /api/testcases` - Get all test cases
- `GET /api/testcases/:id` - Get specific test case
- `POST /api/testcases` - Create new test case
- `PUT /api/testcases/:id` - Update test case
- `DELETE /api/testcases/:id` - Delete test case

### Bugs
- `GET /api/bugs` - Get all bugs
- `GET /api/bugs/:id` - Get specific bug
- `POST /api/bugs` - Create new bug
- `PUT /api/bugs/:id` - Update bug
- `DELETE /api/bugs/:id` - Delete bug

### Dashboard & Utility
- `GET /api/dashboard/stats` - Get dashboard statistics
- `GET /api/modules` - Get all modules
- `GET /api/users` - Get all users
- `GET /api/health` - Health check

## Database Schema

### Tables

**users**
- id (INT, Primary Key)
- username (VARCHAR 100, Unique)
- email (VARCHAR 100, Unique)
- role (ENUM: admin, tester, developer)
- created_at (TIMESTAMP)

**modules**
- id (INT, Primary Key)
- name (VARCHAR 100, Unique)
- description (TEXT)
- created_at (TIMESTAMP)

**test_cases**
- id (VARCHAR 20, Primary Key) - Format: TC-001, TC-002, etc.
- title (VARCHAR 255)
- description (TEXT)
- module_id (INT, Foreign Key)
- priority (ENUM: critical, high, medium, low)
- status (ENUM: passed, failed, running, not_run)
- assigned_to (INT, Foreign Key to users)
- created_at (DATE)
- last_run (DATE, nullable)

**bugs**
- id (VARCHAR 20, Primary Key) - Format: BUG-001, BUG-002, etc.
- title (VARCHAR 255)
- description (TEXT)
- module_id (INT, Foreign Key)
- severity (ENUM: critical, high, medium, low)
- status (ENUM: open, in_progress, resolved, closed)
- assigned_to (INT, Foreign Key to users)
- reporter (INT, Foreign Key to users)
- created_at (DATE)
- updated_at (DATE)

## Sample Data Included

The database setup includes:
- **3 Users:** alice, bob, charlie
- **6 Modules:** Authentication, Cart, Search, Payments, Orders, Profile
- **4 Sample Test Cases:** Various test scenarios
- **3 Sample Bugs:** Authentication, Cart, and Search issues

## Troubleshooting

### Connection Error: "connect ECONNREFUSED 127.0.0.1:3306"
- Ensure MySQL Server is running on EXOTIC:3306
- Verify credentials in `config.js`

### Database doesn't exist
- Run the database setup script: `database_setup.sql`
- Verify the script executed without errors

### Port 5000 already in use
- Change PORT in `server.js` or use:
  ```bash
  PORT=5001 npm start
  ```

### No results from API
- Verify database tables have data by checking in MySQL Workbench
- Ensure database connection is successful

## Next Steps

1. Connect the frontend (index.html) to these API endpoints
2. Update `app.js` and `data.js` to fetch data from backend
3. Start the Express backend before opening the frontend
4. Test API endpoints using Postman or curl

## Connecting Frontend to Backend

Update your frontend JavaScript files to call the backend APIs:

```javascript
// Example: Get all test cases
fetch('http://localhost:5000/api/testcases')
  .then(res => res.json())
  .then(data => console.log(data));
```
