import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

let counter = 0;

class App extends Component {
  state = {users: []}

  componentDidMount() {
    axios.get('/users').then((res) => {
      this.setState({users: res.data});
    })
  }

  addFriend(friend) {
    counter += 1;
    axios.post('/users', {username: friend, id: counter}).then((res) => {
      this.setState({users: res.data});
    })
  }

  editFriend(id) {
    let newName = window.prompt('Edit Name');
    axios.put('/users', {username: newName, id: id}).then((res) => {
      this.setState({users: res.data});
    })
  }

  deleteFriend(id) {
    axios.delete('/users/' + id).then((res) => {
      this.setState({users: res.data});
    })
  }

  render() {
    return (
      <div>
        <h1>Friends List</h1>
        <input id='friendName' type='text' />
        <button onClick={
          () => this.addFriend(document.getElementById('friendName').value)
        }>Add Friend</button>
        <ul>
          {this.state.users.map(user =>
            <li key={user.id}>{user.username}
              <button onClick={
                () => this.editFriend(user.id)
              }>Edit</button>
              <button onClick={
                () => this.deleteFriend(user.id)
              }>Delete</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
