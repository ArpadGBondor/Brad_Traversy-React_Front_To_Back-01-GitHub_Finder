import React, { useEffect, useContext, Fragment } from 'react';
import Spinner from '../layout/Spinner.js';
import Repos from '../repos/Repos.js';
import { Link } from 'react-router-dom';
import GithubContext from '../../context/github/githubContext';

const User = ({ match }) => {
  const githubContext = useContext(GithubContext);

  const { getUser, getUserRepos, user, loadingUser, loadingRepos } = githubContext;

  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // We need the next comment to disable a warning message.
    // We use an empty dependency array intentionally, because we only want to run the function once.
    // eslint-disable-next-line
  }, []);

  const {
    name,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    company,
    followers,
    following,
    public_repos,
    public_gists,
    hireable,
  } = user;

  return (
    <Fragment>
      <Link to="/" className="btn btn-light">
        Back To Search
      </Link>
      {loadingUser || loadingRepos ? (
        <Spinner />
      ) : (
        <Fragment>
          Hireable:{' '}
          {hireable ? (
            <i className="fas fa-check text-success"></i>
          ) : (
            <i className="fas fa-times-circle text-danger"></i>
          )}
          <div className="card grid-2">
            <div className="all-center">
              <img className="round-img" style={{ width: '150px' }} src={avatar_url} alt={`${name} avatar`} />
              <h1>{name}</h1>
              <p>Location: {location}</p>
            </div>
            <div>
              {bio && (
                <Fragment>
                  <h3>Bio:</h3>
                  <p>{bio}</p>
                </Fragment>
              )}
              <a href={html_url} className="btn btn-dark my-1">
                Visit GitHub Profile
              </a>
              <ul>
                {login && (
                  <li>
                    <strong>Username: </strong> {login}
                  </li>
                )}
                {company && (
                  <li>
                    <strong>Company: </strong> {company}
                  </li>
                )}
                {blog && (
                  <li>
                    <strong>Website: </strong> <a href={blog}>{blog}</a>
                  </li>
                )}
              </ul>
            </div>
          </div>
          <div className="card text-center">
            <div className="badge badge-primary">Followers: {followers}</div>
            <div className="badge badge-success">Following: {following}</div>
            <div className="badge badge-warning">Public Repos: {public_repos}</div>
            <div className="badge badge-dark">Public Gists: {public_gists}</div>
          </div>
          <Repos />
        </Fragment>
      )}
    </Fragment>
  );
};

// {/* <i className="fas fa-times-circle text-danger"></i> */}
export default User;
