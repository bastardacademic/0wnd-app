import React from "react";

function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-neutral-950 text-white p-4">
      <h1 className="text-4xl font-extrabold mb-6">✨ 0wnd App is Alive! ✨</h1>

      <div className="bg-neutral-800 p-6 rounded-2xl shadow-lg w-full max-w-md space-y-4">
        <p className="text-center text-lg">
          Welcome to your brand-new Dom/Sub Growth App.
        </p>
        <button className="w-full bg-purple-700 hover:bg-purple-600 text-white font-semibold py-3 rounded-xl transition-all">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
