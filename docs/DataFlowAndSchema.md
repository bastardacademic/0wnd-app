# Data Flow and Entity-Relationship Diagram (ERD)

## Data Flow Diagram
```mermaid
graph TD;
    User --> Frontend;
    Frontend --> APIGateway;
    APIGateway --> Database;
    APIGateway --> AuthService;
    APIGateway --> DataService;
    APIGateway --> PushNotification;
    PushNotification --> Firebase;

erDiagram
    USER {
        string userId
        string email
        string role
        string password
    }
    HABIT {
        string userId
        string title
        string frequency
        string status
    }
    JOURNAL {
        string userId
        string content
        string category
        string createdAt
    }
    MESSAGE {
        string senderId
        string content
        string media
        boolean isBurnOnView
    }
    USER ||--o{ HABIT : has
    USER ||--o{ JOURNAL : writes
    USER ||--o{ MESSAGE : sends
