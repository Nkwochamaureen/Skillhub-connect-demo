import React, { useState, useEffect } from 'react';
import backgroundImage from './images/background.jpeg'; 
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('state') === 'success') {
      setLoading(true);
      fetch('http://localhost:3001/api/user')
        .then(response => response.json())
        .then(data => {
          setUser(data);
          setLoading(false);
        })
        .catch(error => {
          console.log('Error fetching user:', error);
          setLoading(false);
        });
    }
  }, []);

  const handleLogin = () => {
    setLoading(true);
    window.location.href = '/auth/linkedin';
  };

  return (
    <div
      className="App"
      style={{
        textAlign: 'center',
        marginTop: '50px',
        backgroundImage: `url(${backgroundImage})`, 
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
      }}
    >
      <h2>ADLM SkillHub Login</h2>
      {user ? (
        <div id="dashboard">
          <h3>Welcome, {user.name || 'Guest'}!</h3>
          <p>Email: {user.email || 'No email'}</p>
        </div>
      ) : (
        <button
          className="linkedin-btn"
          onClick={handleLogin}
          disabled={loading}
        >
          {loading ? (
            'Loading...'
          ) : (
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="20"
                height="20"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.025-3.063-1.868-3.063-1.868 0-2.154 1.459-2.154 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.841-1.563 3.039 0 3.6 2.001 3.6 4.601v5.595z"/>
              </svg>
              Login with LinkedIn
            </>
          )}
        </button>
      )}
    </div>
  );
}

export default App;