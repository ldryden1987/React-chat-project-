// Import React and the useState hook for managing component state
import React, { useState } from 'react';

// this is a functional component that receives onLogin (a function) as a prop
export default function Auth({ onLogin }) {
  // useState hook to track whether we are showing the login or register form
  const [isLogin, setIsLogin] = useState(true);

  // Form state object to hold all input values
  const [form, setForm] = useState({
    firstName: "",  // Used only in registration
    lastName: "",   // Used only in registration
    email: "",      // Used in both
    password: ""    // Used in both
  });

  // Toggles the form between login and register modes
  const toggleForm = () => setIsLogin(!isLogin);

  // Updates the form state when user types in any input field
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // Handles form submission (both login and register)
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default page reload

    // Determine which endpoint to hit based on mode
    const endpoint = isLogin ? "login" : "register";

    // Decide which data to send based on mode
    const body = isLogin
      ? { email: form.email, password: form.password } // Login needs only email and password
      : form; // Register needs full form

    try {
      // Make POST request to backend API
      const res = await fetch(`http://localhost:3000/users/${endpoint}`, {
        method: "POST", // HTTP method
        headers: { "Content-Type": "application/json" }, // Set headers
        body: JSON.stringify(body) // Convert JS object to JSON string
      });

      // Parse the JSON response
      const data = await res.json();

      // If successful and token is received
      if (res.ok && data.token) {
        // Call onLogin function passed from App.jsx to store token
        onLogin(data.token);
      } else {
        // Show error message
        alert(data.message || "Auth failed");
      }
    } catch (err) {
      // Log any network or code errors
      console.error("Auth error:", err);
    }
  };

  return (
    <div>
      <h2>{isLogin ? "Login" : "Register"}</h2>

      {/* Form element */}
      <form onSubmit={handleSubmit}>
        {/* Only show first and last name if in register mode */}
        {!isLogin && (
          <>
            <input
              name="firstName"
              placeholder="First Name"
              onChange={handleChange}
            />
            <input
              name="lastName"
              placeholder="Last Name"
              onChange={handleChange}
            />
          </>
        )}

        {/* Email input (used in both modes) */}
        <input
          name="email"
          type="email"
          placeholder="Email"
          onChange={handleChange}
        />

        {/* Password input (used in both modes) */}
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleChange}
        />

        {/* Submit button shows Login or Register depending on mode */}
        <button type="submit">
          {isLogin ? "Login" : "Register"}
        </button>
      </form>

      {/* Toggle button to switch between login and register */}
      <button onClick={toggleForm}>
        {isLogin ? "Need to Register?" : "Already have an account?"}
      </button>
    </div>
  );
}
