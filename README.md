# Ownd App

## Overview

Ownd is a habit-tracking application that allows users to set and track habits, assign rewards and consequences, and facilitate private journaling and communication. Analytics are included to track habits over a long period, and badges and achievements canbe earned and displayed. The application currently supports two user roles: Dominant (Habit Setter) and Submissive (Habit Tracker).

## Features

- **User Roles and Authentication:**
  - JWT-based authentication.
  - User roles: Dominant (D) and Submissive (S).

- **Frontend:**
  - **Auth:** Login and Register components.
  - **Chat:** Private messaging with image sharing.
  - **Habit:** HabitForm and HabitList components.
  - **Journal:** JournalEntryForm and JournalList components.
  - **Analytics:** Displays habit tracking statistics.
  - **Gamification:** Displays badges and achievements.

- **Backend:**
  - Node.js with Express.
  - PostgreSQL with Sequelize ORM.
  - Models for users, habits, completions, rewards, consequences, journal entries, chats, badges, and user badges.
  - Controllers and routes for managing authentication, habits, journaling, chatting, gamification, and analytics.

- **Additional Features:**
  - Logging with Winston.
  - Monitoring with Prometheus.
  - Error tracking with Sentry.
  - Testing with Jest and Supertest.

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL
- Docker (optional)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/USERNAME/Ownd-app.git
   cd Ownd-app
