import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {

  signup() {
    let email = document.getElementById('email');
    let password = document.getElementById('password');

    axios.post('/users', {email: email.value, password: password.value}).then(() => {
      alert('success!');
    })
  }

  render() {
    return (
      <div>
        <h1>New Account</h1>
        <div>
          <input type="text" id="email" placeholder="email..." />
        </div>
        <div>
        <input type="password" id="password" placeholder="password..." />
        </div>
        <div>
          <button onClick={() => this.signup()}>Submit</button>
        </div>
      </div>
    );
  }

}

export default App;
