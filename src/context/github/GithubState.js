import React, { useReducer } from 'react';
import axios from 'axios';
import GithubContext from './githubContext';
import GithubReducer from './githubReducer';

import {
  SEARCH_USERS,
  SET_LOADING_USERS,
  SET_LOADING_USER,
  SET_LOADING_REPOS,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

const GithubState = (props) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loadingUsers: false,
    loadingUser: false,
    loadingRepos: false,
  };

  // I should pay attention and use brackets here next time. :)
  //    => [state, dispatch]
  const [state, dispatch] = useReducer(GithubReducer, initialState);

  // Search Users
  const searchUsers = async (query) => {
    setLoadingUsers();

    const res = await axios(`/api/github?query=${query}`);

    dispatch({
      type: SEARCH_USERS,
      payload: typeof res.data.items === 'object' && Array.isArray(res.data.items) ? res.data.items : [],
    });
  };

  // Get single GitHub user
  const getUser = async (username) => {
    setLoadingUser();

    const res = await axios(`/api/githubuser?query=${username}`);

    dispatch({
      type: GET_USER,
      payload: res.data,
    });
  };

  // Get user's repos
  const getUserRepos = async (username) => {
    setLoadingRepos();

    const res = await axios(`/api/githubrepos?user=${username}`);

    dispatch({
      type: GET_REPOS,
      payload: res.data,
    });
  };

  // Clear Users
  const clearUsers = () => dispatch({ type: CLEAR_USERS });

  // Set Loading Users
  const setLoadingUsers = () => dispatch({ type: SET_LOADING_USERS });

  // Set Loading User
  const setLoadingUser = () => dispatch({ type: SET_LOADING_USER });

  // Set Loading Repos
  const setLoadingRepos = () => dispatch({ type: SET_LOADING_REPOS });

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        user: state.user,
        repos: state.repos,
        loadingUsers: state.loadingUsers,
        loadingUser: state.loadingUser,
        loadingRepos: state.loadingRepos,
        searchUsers,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {props.children}
    </GithubContext.Provider>
  );
};

export default GithubState;
