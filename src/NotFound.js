import React from 'react';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="NotFound">
      <h1>Nothing Found</h1>
      <Link to="/" className="">Go to Homepage</Link>
    </div>
  );
}

export default NotFound;
