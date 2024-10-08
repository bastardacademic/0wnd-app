# Ownd App - Developer Documentation

## Key Features
1. **Habit Tracking**: Dominants set tasks, and Submissives track progress.
2. **Encrypted Journaling**: Secure journal entries with private and shared categories.
3. **Gamification**: Users are rewarded with badges for habit completion.
4. **Multi-Language Support**: Available in multiple languages via i18next.

### Backend

## Backend Architecture
- **Node.js/Express**: Serves as the API layer for all backend requests.
- **MongoDB**: NoSQL database for storing habits, journals, users, and chat data.
- **JWT Authentication**: JSON Web Token-based user authentication to secure the API.
- **RESTful API**: Follows REST principles, supporting CRUD operations for tasks, journal entries, and user profiles.
- **End-to-End Encryption**: Implemented for chat and journaling features, ensuring data privacy.

## Backend Structure

The backend is built using Node.js and Express for handling API requests and MongoDB for database storage. Below is the structure of the backend:

backend/
│
├── models/               
│   ├── User.js            
│   ├── Journal.js         
│   ├── Habit.js           
│
├── routes/                
│   ├── journalRoutes.js   
│   ├── habitRoutes.js     
│   ├── chatRoutes.js      
│
├── middleware/            
│   ├── authMiddleware.js  
│   ├── premiumCheck.js    
│
└── server.js              

### Key Backend Files
- `server.js`: Main entry point for the backend API.
- `models/`: MongoDB models for storing users, habits, journals, and chats.
- `routes/`: API routes for handling user requests.
- `middleware/`: Authentication and encryption middlewares.

### Key Backend Components
- **JWT Authentication**: JWT-based authentication is implemented in `authMiddleware.js`. Tokens are generated upon login and verified for secure routes.
- **Premium Feature Access**: Premium users are verified through the `premiumCheck.js` middleware. Non-premium users are restricted from accessing certain features (e.g., advanced habit insights).
- **End-to-End Encryption**: Chat and journal data are encrypted before storage using `crypto` to ensure data privacy.

### Frontend

### Frontend Architecture
- **React.js**: Dynamic frontend framework.
- **Redux**: Manages state across the app, such as user authentication, habits, and journal data.
- **i18next**: Language detection and translation support for multiple languages.

## Frontend Structure

The frontend is developed using React.js. Components are modular and follow the pattern of separation of concerns, ensuring each component handles a specific function.

frontend/
│
├── src/
│   ├── components/           
│   │   ├── HabitTracker.js   
│   │   ├── JournalEntryForm.js
│   │   ├── ChatWindow.js     
│   │   ├── FeedbackForm.js   
│   │
│   ├── services/             
│   │   ├── userService.js    
│   │   ├── habitService.js   
│   │
│   ├── App.js                
│   └── index.js              
│
├── public/                   
│   ├── index.html            
│   └── service-worker.js     

### Key Frontend Files
- `App.js`: Main React app file.
- `components/`: Houses reusable components for the habit tracker, journal editor, and chat features.
- `services/`: API interaction layer for making requests to the backend.
- `public/`: Contains static assets, such as images and the service worker file for offline support.


## Premium Feature Controls

Premium features are disabled by default for non-premium users. The premium status is verified both on the backend (via middleware) and on the frontend (via conditional rendering). Below are the key components:

### Backend
- **`premiumCheck.js`**: Middleware that checks whether a user has premium access. This middleware is applied to routes that offer premium features (like Habit Insights).
  
  Example usage:
  ```javascript
  const isPremiumUser = require('../middleware/premiumCheck');

  router.get('/premium/habit-insights', isPremiumUser, async (req, res) => {
      try {
          const insights = await Habit.find({ userId: req.user._id });
          res.json(insights);
      } catch (err) {
          res.status(400).json('Error: ' + err);
      }
  });
  ```
  
### Frontend
- **Premium Components**: Conditional rendering is used to hide/show premium features in the frontend. These components are wrapped in a check that evaluates the user’s premium status.

Example usage:
```javascript
import React, { useEffect, useState } from 'react';
import axios from 'axios';

function HabitInsights() {
    const [isPremium, setIsPremium] = useState(false);

    useEffect(() => {
        axios.get('/api/user/premium-status')
            .then(response => setIsPremium(response.data.isPremium))
            .catch(error => console.error('Error fetching premium status:', error));
    }, []);

    return isPremium ? (
        <div className="premium-insights">
            {/* Premium Habit Insights */}
        </div>
    ) : (
        <div>Upgrade to Premium for more insights!</div>
    );
}
```

## Technologies
- **Node.js/Express**: Backend API for handling user data, journaling, and habit tracking.
- **MongoDB**: NoSQL database for storing user data, including tasks, habits, and journals.
- **React.js**: Frontend interface, providing a dynamic user experience.
- **i18next**: Multi-language support with language detection.
- **D3.js**: Data visualization for habits, progress, and analytics insights.
- **React-Quill**: Rich text editor for the journaling feature.
- **Firebase**: Push notifications, allowing for real-time habit reminders and user engagement.

## Deployment
The app can be deployed on any Node.js-compatible hosting platform with MongoDB support, such as Heroku, Azure, or AWS. The frontend can be built using Webpack and served through any web hosting service.