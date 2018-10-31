import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

const Nav = ({ userCount, path })=> {
  const selected = (_path)=> {
    const style = {};
    if(_path === path){
      style.fontWeight = 'bold';
    }
    return style
  };

  return (
    <ul>
      <li style={selected('/')}><Link to='/'>Home</Link></li>
      <li style={ selected('/users')}><Link to='/users/page/0'>Users ({ userCount })</Link></li>
    </ul>
  );
};

const mapStateToProps = ({ userCount })=> {
  return {
    userCount
  };
};
export default connect(mapStateToProps)(Nav);
