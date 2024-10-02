# Ownd Developer Documentation

## Project Structure
\\\
Ownd-App/
+-- backend/
¦   +-- models/           # MongoDB schemas
¦   +-- routes/           # Express API routes
¦   +-- middleware/       # Authentication and encryption middleware
¦   +-- server.js         # Main Express server
+-- frontend/
¦   +-- src/
¦   ¦   +-- components/   # React components
¦   ¦   +-- services/     # API services
¦   +-- App.js            # Main React app entry point
+-- docs/                 # Documentation
+-- Testing/              # Unit and integration tests
+-- README.md             # Project overview
\\\

## Backend Setup
1. **Environment Variables**: Configure a \.env\ file with:
   - MONGO_URI, JWT_SECRET, ENCRYPTION_KEY, FIREBASE_KEY
2. **API Endpoints**:
   - /api/habits (POST/GET/PUT)
   - /api/journal (POST/GET)
   - /api/chat (POST/GET)

## Frontend Setup
1. **Dependencies**:
   - React, Redux, React-Quill, D3.js, Firebase.
2. **Components**:
   - HabitChain.js: Visualize habit progress using D3.js.
   - JournalEntry.js: Rich text editor for journals.

## Testing Framework
- **Backend**: Jest and Supertest for API routes.
- **Frontend**: Jest and React Testing Library.
