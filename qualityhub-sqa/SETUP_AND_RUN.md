# QualityHub SQA - Complete Setup & Run Guide

## ✅ System Architecture

```
Frontend (HTML/CSS/JS)
        ↓ (Fetch API)
Express Backend (Node.js)
        ↓ (mysql2 driver)
MySQL Database (EXOTIC:3306)
```

---

## 🚀 Quick Start (3 Steps)

### Step 1: Setup Database ⚙️

**Database already created with sample data?** Skip to Step 2.

Otherwise, run in MySQL Workbench:
1. **File** → **Open SQL Script**
2. Select: `database_setup.sql`
3. Click **Execute** (⚡ or Ctrl+Shift+Enter)
4. Verify: 4 tables created in SQA database

Or use command line:
```bash
mysql -h EXOTIC -u root -p Sahil < database_setup.sql
```

---

### Step 2: Start Backend Server 🔧

1. Open PowerShell/Terminal in project directory:
   ```bash
   cd c:\Users\sahil\Desktop\qualityhub-sqa\qualityhub-sqa
   ```

2. Install dependencies (first time only):
   ```bash
   npm install
   ```

3. Start the server:
   ```bash
   npm start
   ```

4. You should see:
   ```
   QualityHub Backend running on http://localhost:5000
   Database: SQA on EXOTIC:3306
   ```

⚠️ **Keep this terminal open!** Backend must be running.

---

### Step 3: Open Frontend 🌐

1. Open browser and go to:
   ```
   file:///c:/Users/sahil/Desktop/qualityhub-sqa/qualityhub-sqa/index.html
   ```

2. Or use a local HTTP server:
   ```bash
   # In another terminal (keep backend running in first terminal)
   cd c:\Users\sahil\Desktop\qualityhub-sqa\qualityhub-sqa
   python -m http.server 8000
   # Then open: http://localhost:8000
   ```

✅ **Frontend loads data from backend API!**

---

## 📊 What You'll See

**Dashboard Tab:**
- Total test cases from database
- Pass rate calculation
- Open bugs count
- Bug distribution by module
- Recent bugs list

**Test Cases Tab:**
- All test cases from MySQL database
- Search & filter functionality
- Add new test cases (saves to database)
- Status updates (passed, failed, running, not_run)

**Bug Tracking Tab:**
- All bugs from MySQL database
- Filter by severity & status
- Report new bugs (saves to database)
- Bug details with module assignment

**Reports Tab:**
- Weekly test trends
- Module health scores

---

## 🔌 API Endpoints (Running on http://localhost:5000)

### Test Cases
- `GET /api/testcases` - Fetch all test cases
- `GET /api/testcases/:id` - Fetch single test case
- `POST /api/testcases` - Create new test case
- `PUT /api/testcases/:id` - Update test case
- `DELETE /api/testcases/:id` - Delete test case

### Bugs
- `GET /api/bugs` - Fetch all bugs
- `GET /api/bugs/:id` - Fetch single bug
- `POST /api/bugs` - Create new bug
- `PUT /api/bugs/:id` - Update bug
- `DELETE /api/bugs/:id` - Delete bug

### Utilities
- `GET /api/dashboard/stats` - Get statistics
- `GET /api/modules` - Get all modules
- `GET /api/users` - Get all users
- `GET /api/health` - Health check

**Example API Call (in browser console):**
```javascript
fetch('http://localhost:5000/api/testcases')
  .then(r => r.json())
  .then(data => console.log(data))
```

---

## 📁 Project Structure

```
qualityhub-sqa/
├── index.html                 # Frontend UI
├── app.js                      # Frontend logic
├── data.js                     # API calls & data management
├── styles.css                  # Styling
├── server.js                   # Express backend
├── config.js                   # Database connection
├── database_setup.sql          # Database schema
├── package.json               # Node dependencies
├── BACKEND_SETUP.md           # Backend documentation
├── DATABASE_SETUP_GUIDE.md    # Detailed DB setup
├── WORKBENCH_QUICK_START.md   # Workbench quick guide
└── COMPLETE_SETUP_GUIDE.md    # This file
```

---

## ⚡ Troubleshooting

| Issue | Solution |
|-------|----------|
| **Frontend shows "Loading..."** | Backend not running. Run `npm start` in terminal |
| **"Cannot connect to EXOTIC:3306"** | MySQL Server not running. Start MySQL service |
| **API returns 500 error** | Check backend terminal for error messages |
| **Database empty** | Run `database_setup.sql` in MySQL Workbench |
| **Port 5000 already in use** | Kill process: `netstat -ano \| findstr 5000` or use different port |
| **CORS errors** | Backend CORS is enabled for localhost. Clear browser cache |

---

## 🔄 Development Workflow

1. **Make changes to HTML/CSS/JS** → Browser auto-reloads
2. **Make changes to backend (server.js)** → Restart: Ctrl+C, then `npm start`
3. **Make changes to database** → Query in Workbench, frontend auto-fetches

---

## 📝 Adding Sample Data

After running `database_setup.sql`, you get:
- **3 Users:** alice, bob, charlie
- **6 Modules:** Authentication, Cart, Search, Payments, Orders, Profile
- **4 Test Cases:** TC-001 through TC-004
- **3 Bugs:** BUG-001 through BUG-003

Add more via UI:
1. Click **"+ New Test Case"** or **"+ Report Bug"**
2. Fill form & submit
3. Data automatically saves to database

---

## 🐛 Debug Mode

**Check what's being fetched:**
1. Open browser DevTools (F12)
2. Go to **Console** tab
3. Check for any error messages
4. Check **Network** tab to see API calls

**Test Backend Directly:**
```bash
# Test backend health
curl http://localhost:5000/api/health

# Get all test cases
curl http://localhost:5000/api/testcases

# Get all bugs
curl http://localhost:5000/api/bugs
```

---

## 🎯 Working Features

✅ Database connected to frontend  
✅ Real-time data loading from MySQL  
✅ Add test cases (saved to DB)  
✅ Add bugs (saved to DB)  
✅ Search & filter functionality  
✅ Dashboard with live statistics  
✅ Module-based organization  
✅ CORS enabled for local development  

---

## 📦 Deployment Checklist

Before deploying to production:
- [ ] Change `localhost:5000` to production server URL
- [ ] Update database credentials in `config.js`
- [ ] Set up HTTPS for secure connections
- [ ] Enable production error logging
- [ ] Configure CORS for production domain
- [ ] Test all CRUD operations
- [ ] Load test with multiple users

---

## 🆘 Need Help?

**Check these files:**
1. [BACKEND_SETUP.md](BACKEND_SETUP.md) - Backend details
2. [DATABASE_SETUP_GUIDE.md](DATABASE_SETUP_GUIDE.md) - Database details
3. [WORKBENCH_QUICK_START.md](WORKBENCH_QUICK_START.md) - MySQL Workbench guide

**Verify everything is working:**
```bash
# Terminal 1: Backend must be running
npm start

# Terminal 2: Test the API
curl http://localhost:5000/api/health
curl http://localhost:5000/api/testcases
```

---

## 🎉 You're All Set!

Your QualityHub SQA System is:
✅ Frontend connected to backend  
✅ Backend connected to MySQL database  
✅ API endpoints fully functional  
✅ Ready to track test cases and bugs  

**Start with:** `npm start` then open `index.html` in browser
