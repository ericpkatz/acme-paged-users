import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reset, loadUserCount, destroyUser } from './store';
import { Route, HashRouter as Router } from 'react-router-dom';
import PagedUsers from './PagedUsers';
import Nav from './Nav';
import UserUpdate from './UserUpdate';

class App extends Component{
  componentDidMount(){
    this.props.init();
  }
  render(){
    const { users } = this.props;
    return (
      <div>
        <Router>
          <div>
            <Route component={ ({ location })=> <Nav path={ location.pathname }/> } />
            <Route exact path='/users/page/:index?' component={ PagedUsers } /> 
          </div>
        </Router>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch)=> {
  return {
    init: ()=> dispatch(loadUserCount()),
  };
};

const mapStateToProps = ({ users })=> {
  return {
    users 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
