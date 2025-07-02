// Import React and two hooks: useState and useEffect (though useEffect isn't used in this file yet)
import React, { useState, useEffect } from 'react';

// Import the Auth component (which handles login and registration)
import Auth from './components/Auth';

// Define the main App component
export default function App() {
  // Declare a state variable `token` and a setter `setToken`
  // It checks localStorage to see if a token is already stored (i.e., user is already logged in)
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  // This function is called when the user logs in successfully
  // It stores the token in both localStorage (persistent) and React state (in-memory)
  const handleLogin = (newToken) => {
    localStorage.setItem("token", newToken); // Save token in browser storage
    setToken(newToken); // Update state
  };

  // This function is called when the user logs out
  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove token from browser storage
    setToken(""); // Clear token from state
  };

  
  return (
    <div>
      {/* Conditional rendering: if token exists, user is logged in */}
      {token ? (
        <div>
          {/* Show logout button when logged in */}
          <button onClick={handleLogout}>Logout</button>

          {/* Placeholder: This is where you'll later render the ChatRoom or user dashboard */}
        </div>
      ) : (
        // If not logged in, render the Auth component (login/register UI)
        // Pass `handleLogin` so the Auth component can update the token on success
        <Auth onLogin={handleLogin} />
      )}
    </div>
  );
}
