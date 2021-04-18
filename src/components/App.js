import React, { Component } from 'react';

import Navbar from './layout/Navbar.js';
import Users from './users/Users.js';

import './App.css';
// import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    const res = await fetch('../../.netlify/functions/github', {
      method: 'GET',
    });

    console.log(res.data);

    this.setState({
      users: res.data,
      loading: false,
    });
  }

  render() {
    const { users, loading } = this.state;
    return (
      <div className="App">
        <Navbar />
        <div className="container">
          <h1>Hello from App()</h1>
          <Users users={users} loading={loading} />
        </div>
      </div>
    );
  }
}

export default App;
