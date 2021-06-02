import React, { Component, Fragment } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './layout/Navbar.js';
import Alert from './layout/Alert.js';
import Users from './users/Users.js';
import User from './users/User.js';
import Search from './users/Search.js';
import About from './pages/About.js';

import './App.css';
import axios from 'axios';

class App extends Component {
  state = {
    users: [],
    user: {},
    repos: [],
    loading: false,
    alert: null,
  };

  // Set Default values after loading
  // async componentDidMount() {
  //   this.setState({ users: [], loading: true });

  //   try {
  //     const res = await axios('/api/github');

  //     this.setState({
  //       users: typeof res.data === 'object' && Array.isArray(res.data) ? res.data : [],
  //       loading: false,
  //     });
  //   } catch (err) {
  //     console.log('Error');
  //     console.log(err);
  //   }
  // }

  // Search GitHub users
  searchUsers = async (query) => {
    this.setState({ users: [], loading: true, alert: null });

    try {
      const res = await axios(`/api/github?query=${query}`);
      this.setState({
        users: typeof res.data.items === 'object' && Array.isArray(res.data.items) ? res.data.items : [],
        loading: false,
        alert: null,
      });
    } catch (err) {
      this.setState({ alert: { message: 'Server error', type: 'danger' } });
      console.log('Error');
      console.log(err);
    }
  };

  // Get single GitHub user
  getUser = async (username) => {
    this.setState({ loading: true, alert: null });

    try {
      const res = await axios(`/api/githubuser?query=${username}`);
      this.setState({
        user: res.data,
        loading: false,
        alert: null,
      });
    } catch (err) {
      this.setState({ alert: { message: 'Server error', type: 'danger' } });
      console.log('Error');
      console.log(err);
    }
  };

  // Get user's repos
  getUserRepos = async (username) => {
    this.setState({ loading: true });

    try {
      const res = await axios(`/api/githubrepos?user=${username}`);
      this.setState({
        repos: res.data,
        loading: false,
      });
    } catch (err) {
      this.setState({ alert: { message: 'Server error', type: 'danger' } });
      console.log('Error');
      console.log(err);
    }
  };

  // Clear users from state
  clearUsers = () => this.setState({ users: [], loading: false, alert: null });

  // Set Alert
  setAlert = (message, type) => {
    this.setState({ alert: { message, type } });
  };

  render() {
    const { users, user, repos, loading, alert } = this.state;
    return (
      <Router>
        <div className="App">
          <Navbar />
          <div className="container">
            <Alert alert={alert} />
            <Switch>
              <Route
                exact
                path="/"
                render={(props) => (
                  <Fragment>
                    <Search
                      searchUsers={this.searchUsers}
                      clearUsers={this.clearUsers}
                      showClear={users.length > 0}
                      setAlert={this.setAlert}
                    />
                    <Users users={users} loading={loading} />
                  </Fragment>
                )}
              />
              <Route exact path="/about" component={About} />
              <Route
                exact
                path="/user/:login"
                render={(props) => (
                  <User
                    {...props}
                    getUser={this.getUser}
                    getUserRepos={this.getUserRepos}
                    user={user}
                    repos={repos}
                    loading={loading}
                  />
                )}
              />
            </Switch>
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
