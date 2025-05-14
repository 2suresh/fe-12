import React from 'react';
import { Link } from 'react-router-dom';

const Menu = () => (
  <div>
    <h1>Broadcast Menu</h1>
    <ul>
      <li><Link to="/list">View Live Streams</Link></li>
      <li><Link to="/start">Start New Broadcast</Link></li>
    </ul>
  </div>
);

export default Menu;
