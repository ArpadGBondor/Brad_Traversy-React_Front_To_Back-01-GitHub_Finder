import React, { useContext } from 'react';
import RepoItem from './RepoItem.js';

import GithubContext from '../../context/github/githubContext';

const Repos = (props) => {
  const githubContext = useContext(GithubContext);
  const { repos } = githubContext;
  return repos.map((repo) => <RepoItem repo={repo} key={repo.id} />);
};

export default Repos;
