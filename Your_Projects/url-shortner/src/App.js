import React, { useState, useRef } from 'react';
import axios from 'axios';

import './App.css'; 

function App() {
  const inputRef = useRef();
  const [shorturl, setShortUrl] = useState('');
  const [isButtonClicked, setButtonClicked] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [error, setError] = useState(null); 

  const shortenHandler = async () => {
    const longurl = inputRef.current.value;
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + '9fb99d6cd2220f5c7e7cb08c3bac7c93',
    };
    const body = {
      "url": longurl,
      "custom": "hacktoberfest" + Math.floor(Math.random() * 100000),
    };

    try {
      setLoading(true); 
      setError(null); 

      const apiUrl = 'https://urlbae.com/api/url/add';

      const response = await axios.post(apiUrl, body, { headers });

      if (response.status === 200) {
        setShortUrl(response.data.shorturl);
        setButtonClicked(true);
      } else {
        console.error('Error:', response.status);
        setError('An error occurred while shortening the URL.');
      }
    } catch (error) {
      setButtonClicked(false);
      setError('An error occurred while communicating with the server.');
      console.error('Error:', error);
    } finally {
      setLoading(false); 
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h1>HacktoberFest-23 URL Shortener</h1>
      </header>
      <main className="App-main">
        <div className="shorten-container">
          <input
            placeholder="Paste your Long Url Here"
            ref={inputRef}
            className="url-input"
          />
          <button onClick={shortenHandler} className="shorten-button">
            Shorten
          </button>
          {isLoading && <p className="loading">Loading...</p>}
          {error && <p className="error">{error}</p>}
          {isButtonClicked && (
            <div className="result-container">
              <p className="short-url">Short URL:</p>
              <a href={shorturl} target="_blank" rel="noopener noreferrer" className="short-url-link">
                {shorturl}
              </a>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
