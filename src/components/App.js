import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Navbar from './layout/Navbar.js';
import Alert from './layout/Alert.js';
import User from './users/User.js';
import About from './pages/About.js';
import Home from './pages/Home.js';
import NotFound from './pages/NotFound.js';

import GithubState from '../context/github/GithubState';
import AlertState from '../context/alert/AlertState';

import './App.css';

const App = () => {
  return (
    <AlertState>
      <GithubState>
        <Router>
          <div className="App">
            <Navbar />
            <div className="container">
              <Alert />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/about" component={About} />
                <Route exact path="/user/:login" component={User} />
                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </Router>
      </GithubState>
    </AlertState>
  );
};

export default App;
