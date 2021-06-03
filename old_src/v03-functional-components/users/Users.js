import React from 'react';
import PropTypes from 'prop-types';

import UserItem from './UserItem.js';
import Spinner from '../layout/Spinner.js';

function Users({ users, loading }) {
  if (loading) {
    return <Spinner />;
  } else {
    return (
      <div style={userStyle}>
        {users.map((user) => (
          <UserItem key={user.id} user={user} />
        ))}
      </div>
    );
  }
}

Users.propTypes = {
  users: PropTypes.array.isRequired, // ptar
  loading: PropTypes.bool.isRequired, // ptbr
};

const userStyle = {
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gridGap: '1rem',
};

export default Users;
