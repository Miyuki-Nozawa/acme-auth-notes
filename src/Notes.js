import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

import { addNote, deleteNote } from "./store";

class Notes extends Component {
  state = {
    addNoteText: "",
  };

  handleDelete = async (id) => {
    await this.props.deleteNote(id);
  };

  handleChange = (event) => {
    this.setState({ addNoteText: event.target.value });
  };

  handleSubmit = async (event) => {
    event.preventDefault();
    await this.props.addNote({ txt: this.state.addNoteText });
    this.setState({ addNoteText: "" });
  };

  render() {
    const { notes } = this.props;

    return (
      <div>
        <Link to="/home">Home</Link>
        <div>
          <form onSubmit={this.handleSubmit}>
            <input
              placeholder="Add Note"
              onChange={this.handleChange}
              value={this.state.addNoteText}
            />
            <button disabled={this.state.addNoteText.length === 0} onClick={this.handleSubmit}>Add</button>
          </form>
          {notes.map((note) => (
            <div key={note.id}>
              {note.txt}
              <button onClick={() => this.handleDelete(note.id)}>Delete</button>
            </div>
          ))}
        </div>
      </div>
    );
  };
};

const mapStateToProps = (state) => ({ notes: state.notes });
const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => dispatch(addNote(note)),
  deleteNote: (id) => dispatch(deleteNote(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Notes);
