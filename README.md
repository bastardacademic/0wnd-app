# Ownd App

Ownd is a habit-tracking and journaling app designed for personal improvement and mindfulness, with roles for Dominant (Habit Setters) and Submissive (Habit Trackers).

## Features
- Habit tracking with customizable reminders
- Journaling with private, shared, and public categories
- Gamification with habit chains and badges
- End-to-end encrypted chat

## Data Flow Diagram
\\\mermaid
graph TD;
    User --> Frontend;
    Frontend --> APIGateway;
    APIGateway --> Database;
    APIGateway --> AuthService;
    APIGateway --> DataService;
    APIGateway --> PushNotification;
    PushNotification --> Firebase;
\\\

For more details, see the [Functionality Overview](docs/FunctionalityOverview.md) and [Data Flow and ERD](docs/DataFlowAndSchema.md).
