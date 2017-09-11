import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

let counter = 0;

class App extends Component {
  state = {users: []}

  componentDidMount() {
    axios.get('/users').then((res) => {
      let results = res.data;

      for(let item in results) {
        counter += 1
        results[item].id = counter;
      }

      this.setState({users: results});
    })
  }

  addFriend(friend) {
    axios.post('/users', {username: friend}).then(() => {
      counter += 1
      let newUser = {username: friend, id: counter};
      let userList = this.state.users;
      userList.push(newUser);
      this.setState({users: userList});
    })
  }

  editFriend(id) {
    let newName = window.prompt('Edit Name');
    axios.put('/users', {username: newName, id: id}).then((res) => {
      let userList = this.state.users;
      for(let item in userList) {
        if(userList[item]._id === res.data._id) {
          userList[item].username = res.data.username;
        } else {
          continue;
        }
      }

      this.setState({users: userList});

    })
  }

  deleteFriend(id) {
    axios.delete('/users/' + id).then(() => {
      let userList = this.state.users;

      for(let i = 0; i < userList.length; i++) {
        if(userList[i]._id === id) {
          userList.splice(i, 1);
        } else {
          continue;
        }
      }

      this.setState({users: userList});
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
                () => this.editFriend(user._id)
              }>Edit</button>
              <button onClick={
                () => this.deleteFriend(user._id)
              }>Delete</button>
            </li>
          )}
        </ul>
      </div>
    );
  }
}

export default App;
