import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { logout, getNotes } from "./store";

class Home extends Component {
  async componentDidMount() {
    await this.props.getNotes();
  };

  render() {
    const { auth, logout, notes } = this.props;
    return (
      <div>
        Welcome {auth.username}
        <button onClick={logout}>Logout</button>
        <div>
          You have added {notes.length} notes.
          <br />
          <Link to="/notes">Access and Add Notes</Link>
        </div>
      </div>
    );
  };
};

const mapState = (state) => state;
const mapDispatch = (dispatch) => {
  return {
    logout: () => dispatch(logout()),
    getNotes: () => dispatch(getNotes()),
  };
};

export default connect(mapState, mapDispatch)(Home);
