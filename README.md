# **Ownd - Habit Tracking and Journaling App**

### **Overview**
**Ownd** is a secure habit-tracking and journaling app that incorporates **gamified features**, **multi-language support**, and **customizable UI elements**. With **end-to-end encrypted chat**, and features for both **premium** and **standard** users, this app helps individuals improve their habits, reflect on their progress, and communicate securely. 

### **Core Features**
- **Habit Tracking & Gamification**:
  - Create and track daily habits.
  - Use habit chains to visualize progress.
  - Gamification elements, including rewards, badges, and points for habit completion.
  - Advanced habit insights for premium users.
  
- **Journaling**:
  - Organize journal entries into categories: Public, Private, Shared, and Erotica.
  - Use text-to-speech (TTS) to have journal entries read aloud.
  
- **Chat**:
  - Secure end-to-end encrypted chat between users.
  - Single-view media messages and automatic deletion.
  - Screenshot prevention for sensitive media, with watermarking and time-limited display.
  
- **Customizable UI**:
  - Customize button sizes, font sizes, and color schemes to fit your preferences.
  - Accessibility options like text resizing, high-contrast modes, and colorblind support.
  
- **Multi-Language Support**:
  - Interface available in multiple languages (English, Spanish) with more language options planned.

- **Premium Features**:
  - Advanced habit insights and progress visualizations.
  - Multi-factor authentication (MFA) for enhanced security.
  - Custom habit chains and exclusive rewards.
  - Gamified self-reflection journal with expanded prompts.

---

## **Installation and Setup**

### **Prerequisites**
- **Node.js** and **npm**: You need to have Node.js and npm installed. [Download Node.js](https://nodejs.org/)
- **MongoDB**: The app uses MongoDB for data storage. You can use MongoDB locally or a cloud solution like MongoDB Atlas.
- **Git**: Required to clone the repository.

### **1. Backend Setup**

1. Clone the repository:
   \\\ash
   git clone https://github.com/bastardacademic/ownd.git
   cd YourRepo/backend
   \\\

2. Install backend dependencies:
   \\\ash
   npm install
   \\\

3. Set up your **environment variables** in a .env file. Example:
   \\\plaintext
   MONGODB_URI=your_mongodb_uri
   JWT_SECRET=your_secret_key
   EMAIL_USER=your_email
   EMAIL_PASSWORD=your_email_password
   \\\

4. Run the backend server:
   \\\ash
   npm start
   \\\

The backend will start on http://localhost:5000 (or your specified port).

---

### **2. Frontend Setup**

1. Navigate to the frontend directory:
   \\\ash
   cd ../frontend
   \\\

2. Install frontend dependencies:
   \\\ash
   npm install
   \\\

3. Start the frontend app:
   \\\ash
   npm start
   \\\

The frontend will start on http://localhost:3000.

---

## **Project Structure**

\\\plaintext
Ownd-App/
+-- backend/              # Node.js/Express backend
¦   +-- models/           # MongoDB schemas for user, journal, chat, habits
¦   +-- routes/           # API routes for habits, journals, chats
¦   +-- middleware/       # Middleware for authentication (JWT)
¦   +-- server.js         # Main server file
+-- frontend/             # React frontend
¦   +-- src/
¦   ¦   +-- components/   # React components (Habit tracker, journal, chat, etc.)
¦   ¦   +-- services/     # API service for interacting with backend
¦   ¦   +-- App.js        # Main React app file
¦   +-- public/
¦       +-- index.html    # Entry point for frontend
+-- docs/                 # Documentation files (readme, terms, privacy, etc.)
+-- README.md             # Project overview and instructions
\\\

---

## **Key Functionalities**

### **1. Habit Tracking**
- Users can create daily, weekly, or custom habits.
- **Habit Chains**: Visualize linked habits for tracking progress in sequences.
- **Premium insights**: Get detailed habit analytics and progress data.

### **2. Journaling**
- Users can create journal entries in different categories:
  - **Public**: Visible to everyone.
  - **Private**: Visible only to the user.
  - **Shared**: Visible only to a Dominant or Submissive linked with the user.
  - **Erotica**: A dedicated category for personal or shared erotic writing.
- **Text-to-Speech**: Users can have their journal entries read aloud using the app's built-in TTS feature.

### **3. Chat Functionality**
- **Secure**: End-to-end encrypted messaging.
- **Media Sharing**: Send images or videos with one-view functionality.
- **Screenshot Prevention**: Screenshots of sensitive media are disabled, and media is watermarked with a time-limited display.

### **4. Customizable UI**
- Users can adjust the interface's appearance to fit their preferences, with:
  - Font size, button size, and color scheme customizations.
  - Accessibility features, including high-contrast modes and haptic feedback.
  
### **5. Gamification**
- **Rewards**: Earn points, badges, and rewards for completing tasks and maintaining streaks.
- **Premium Rewards**: Extra incentives for premium users, such as exclusive badges.

---

## **Premium Features**
For premium users, additional features include:
- **Advanced Habit Insights**: Detailed statistics and habit completion patterns.
- **Multi-Factor Authentication (MFA)**: Added security for premium users.
- **Custom Habit Chains**: Create and track linked habits.
- **Advanced Rewards**: Unlock exclusive badges, challenges, and self-reflection prompts.

---

## **Contributing**
Feel free to fork this repository and make improvements or add new features. Contributions are welcome! Please follow these steps:
1. Fork the repository.
2. Create a new feature branch (git checkout -b feature/YourFeature).
3. Commit your changes (git commit -m 'Add new feature').
4. Push to your branch (git push origin feature/YourFeature).
5. Open a pull request.

---

## **License**
This project is licensed under the **MIT License**. See the LICENSE.md file for details.

---

## **Contact**
If you have any questions, feedback, or need help, feel free to reach out to the developer via the GitHub Issues page.

---

