import React from 'react';
import { connect } from 'react-redux';
import { reset, destroyUser } from './store';
import { Link } from 'react-router-dom';

export default ({ users })=> {
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {
          users.map( user => {
            return (
              <li key={ user.id }>
                  { user.name }
              </li>
            );
          })
        }
      </ul>
    </div>
  );
}

