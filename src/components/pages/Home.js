import React, { Fragment } from 'react';

import Users from '../users/Users.js';
import Search from '../users/Search.js';

const Home = () => {
  return (
    <Fragment>
      <Search />
      <Users />
    </Fragment>
  );
};

export default Home;
