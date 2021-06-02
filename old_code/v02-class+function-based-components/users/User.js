import React, { Component, Fragment } from 'react';
import Spinner from '../layout/Spinner.js';
import Repos from '../repos/Repos.js';
import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

export class User extends Component {
  componentDidMount() {
    this.props.getUser(this.props.match.params.login);
    this.props.getUserRepos(this.props.match.params.login);
  }

  static propTypes = {
    loading: PropTypes.bool.isRequired,
    user: PropTypes.object.isRequired,
    repos: PropTypes.array.isRequired,
    getUser: PropTypes.func.isRequired,
    getUserRepos: PropTypes.func.isRequired,
  };

  render() {
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
    } = this.props.user;

    const { loading, repos } = this.props;

    return (
      <Fragment>
        <Link to="/" className="btn btn-light">
          Back To Search
        </Link>
        {loading ? (
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
            <Repos repos={repos} />
          </Fragment>
        )}
      </Fragment>
    );
  }
}

// {/* <i className="fas fa-times-circle text-danger"></i> */}
export default User;
