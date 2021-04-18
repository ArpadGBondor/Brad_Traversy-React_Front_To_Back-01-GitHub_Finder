import React, { Component } from 'react';
import './App.css';

import Navbar from './layout/Navbar.js';
import Users from './users/Users.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <h1>Hello from App()</h1>
          <Users />
        </div>
      </div>
    );
  }
}

export default App;
