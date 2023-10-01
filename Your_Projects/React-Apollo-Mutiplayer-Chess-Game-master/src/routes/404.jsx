import React from 'react';
import { Link } from "react-router-dom";

const NotFoundRoute = () => {
  return (
    <div className="container">
      <h1>Error 404</h1>
      <p>The page you were looking for does not exist.</p>
      <Link to="/" className="btn btn--secondary btn--xl">Get back to homepage</Link>
    </div>
  );
}

export default NotFoundRoute;
