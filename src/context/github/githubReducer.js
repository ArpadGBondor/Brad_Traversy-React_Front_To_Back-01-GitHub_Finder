import {
  SEARCH_USERS,
  SET_LOADING_USERS,
  SET_LOADING_USER,
  SET_LOADING_REPOS,
  CLEAR_USERS,
  GET_USER,
  GET_REPOS,
} from '../types';

const githubReducer = (state, action) => {
  switch (action.type) {
    case SEARCH_USERS:
      return {
        ...state,
        users: action.payload,
        loadingUsers: false,
      };
    case CLEAR_USERS:
      return {
        ...state,
        users: [],
        loadingUsers: false,
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload,
        loadingUser: false,
      };
    case GET_REPOS:
      return {
        ...state,
        repos: action.payload,
        loadingRepos: false,
      };
    case SET_LOADING_USERS:
      return {
        ...state,
        loadingUsers: true,
      };
    case SET_LOADING_USER:
      return {
        ...state,
        loadingUser: true,
      };
    case SET_LOADING_REPOS:
      return {
        ...state,
        loadingRepos: true,
      };
    default:
      return state;
  }
};

export default githubReducer;
