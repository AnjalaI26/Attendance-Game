# Attendance-Game

Future Work: 
- think more about long-term retention of topics --> potential solution: on personal desk space when users select a piece added to their deskspace and are able to view additional questions to reinforce topic knowledge

Additional Future Work:
- Expand interactivity of the desk UI: allow users to click on individual desk items to open topic-specific question sets or mini-quizzes, surface review questions tied to items they own, and generate new questions dynamically based on the item's topic to support spaced repetition and targeted practice.

If you run into errors when deploying the project locally, please contact: wxd4mw@virginia.edu

## Setup Instructions

1. **Install Node.js**
   - Download and install Node.js (LTS) from [nodejs.org](https://nodejs.org/).

2. **Install dependencies**
   - Open a terminal and run:

     ```powershell
     cd backend
     npm install
     cd ../frontend
     npm install
     ```

3. **Install MongoDB** (if running backend locally)
   - Download and install MongoDB from [mongodb.com](https://www.mongodb.com/try/download/community).
   - Ensure MongoDB is running (default URI is `mongodb://localhost:27017/testDB`).

4. **Run the backend server**
   - In the `backend` folder:

     ```powershell
     node server.js
     ```

5. **Run the frontend app**
   - In the `frontend` folder:

     ```powershell
     npm run dev
     ```

6. **Access the app**
   - Open your browser and go to `http://localhost:5173` (default Vite port).

---

If you have any issues, check that Node.js and MongoDB are installed and running, and that you ran `npm install` in both folders.

## Important: Local database status

- Current status: the local MongoDB connection used by this project is not functioning correctly in the development environment, so creating or updating data (users, attendance, items, etc.) may not persist between runs or page refreshes.
- Workarounds:
   - Ensure MongoDB is installed and the service/daemon is running locally (check your OS-specific service manager).
   - Verify the `MONGO_URI` in `backend/.env` points to a reachable MongoDB instance (default: `mongodb://localhost:27017/testDB`).
   - For UI development without a working DB, use the mock/demo data included in the frontend components (they fall back to in-memory objects).

