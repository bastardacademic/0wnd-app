# Ownd Developer Guide

## Project Structure
```
Ownd-App/
+-- backend/         # Express.js backend
    +-- models/      # MongoDB schemas
    +-- routes/      # API routes (habits, journal, chat)
    +-- middleware/  # Authentication and encryption middleware
    +-- server.js    # Main server file
+-- frontend/        # React frontend
    +-- src/
        +-- components/  # React components (Habit tracking, journaling, chat)
        +-- services/    # API services for backend interaction
    +-- App.js      # Main entry point
+-- docs/           # Documentation files
+-- Testing/        # Unit and integration tests
+-- README.md       # Project overview
```

## API Endpoints
- **/api/habits** (POST/GET/PUT/DELETE): CRUD operations for habits.
- **/api/journal** (POST/GET): Create and retrieve journal entries.
- **/api/chat** (POST/GET): Encrypted messages between users.

## Database
We use MongoDB for its flexibility and document-based schema, making it easy to manage users, habits, and journal entries.

## Testing
- **Jest**: For unit testing.
- **Supertest**: For integration tests.
