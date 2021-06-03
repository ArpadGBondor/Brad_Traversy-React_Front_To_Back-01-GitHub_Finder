import React, { Fragment } from 'react';

const About = () => {
  return (
    <Fragment>
      <h1>About This App</h1>
      <p>App to search GitHub users</p>
      <p>Version: 1.0.0</p>
      <p>
        Designed by:{' '}
        <a href="https://www.udemy.com/course/modern-react-front-to-back/" rel="nofollow">
          Brad Traversy
        </a>
      </p>
      <p>
        Coded by:{' '}
        <a href="https://arpadgbondor.github.io/CV/" rel="nofollow">
          Árpád Gábor Bondor
        </a>{' '}
        in 2021.
      </p>
    </Fragment>
  );
};

export default About;
