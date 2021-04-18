import React, { Component } from 'react';

import Navbar from './layout/Navbar.js';
import Users from './users/Users.js';

import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    loading: false,
  };

  async componentDidMount() {
    this.setState({ loading: true });

    try {
      const res = await axios('/.netlify/functions/github');

      console.log('Response');
      console.log(res);
      this.setState({
        users: res.data,
        loading: false,
      });
    } catch (err) {
      console.log('Error');
      console.log(err);
    }
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
