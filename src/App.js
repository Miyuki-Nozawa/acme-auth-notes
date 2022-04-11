import React, { Component } from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { attemptLogin } from './store';
import { Route, Switch, Redirect } from 'react-router-dom';
import Home from './Home';
import Notes from './Notes';
import SignIn from './SignIn';


class App extends Component{
  async componentDidMount() {
    await this.props.attemptLogin();
  }

  render(){
    const { auth } = this.props;

    if(!auth.id){
      return (
        <Switch>
          <Route path='/signin' component={ SignIn } />
          <Redirect to='/signin' />
        </Switch>
      );
    }
    else {
      return (
        <Switch>
          <Route path='/home' component={ Home } />
          <Route path='/notes' component={ Notes } />
          <Redirect to='/home' />
        </Switch>
      );
    }
  }
}

const mapState = state => state;
const mapDispatch = (dispatch)=> {
  return {
    attemptLogin: () => dispatch(attemptLogin())
  }
}

export default connect(mapState, mapDispatch)(App);
