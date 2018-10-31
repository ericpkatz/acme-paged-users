import React, { Component } from 'react';
import { connect } from 'react-redux';
import Users from './Users';
import { loadUsers } from './store';
import { Link } from 'react-router-dom';

class PagedUsers extends Component{
  componentDidMount(){
    this.props.loadUsers(this.props.index);
  }
  componentDidUpdate(prevProps){
    if(prevProps.index !== this.props.index){
      this.props.loadUsers(this.props.index);
    }
  }
  render(){
    const { users, pager } = this.props;
    return (
      <div>
        <ul>
        {
          pager.map( page => {
            if(page.selected){
              return (
                <li key={ page.text }>{ page.text }</li>
              );
            }
            return (
              <li key={ page.text }>
                <Link to={ `/users/page/${ page.value }`}>
                  { page.text }
                </Link>
              </li>
            );
          })

        }
        </ul>
        <Users users={ users } />
      </div>
    );
  }
}

const mapStateToProps = ({ users, userCount }, { match })=> {
  const index = match.params.index*1;
  const totalPages = Math.ceil(userCount/2);
  const pager = [];
  for(let i = 0; i < totalPages; i++){
    pager.push({
      text: i + 1,
      value: i,
      selected: i === index
    });
  }
  return {
    pager,
    users,
    index
  };
};

const mapDispatchToProps = (dispatch)=> {
  return {
    loadUsers: (index)=> dispatch(loadUsers(index))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(PagedUsers);
