import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor() {
    super();
    this.state = {
      users: {},
      loading: undefined
    }
    this.fetchUsers = this.fetchUsers.bind(this);
    this.getEachUserData = this.getEachUserData.bind(this);
  }

  // After the initial rendering, we fetch data to obtain users' information
  componentDidMount() {
    this.setState({ loading: true });
    const url = "http://appsheettest1.azurewebsites.net/sample";
    this.fetchUsers(url);
  }

  async fetchUsers(url) {
    try {
      const res = await fetch(`${url}/list`);
      const json = await res.json();
      this.getEachUserData(url, json);
      
      // If there are more tokens, we continue fetching another list of users
      // until there is none remaining
      let token = ("token" in json) ? json.token : "";
      do { 
        try {
          const res = await fetch(`${url}/list?token=${token}`);
          const json = await res.json();
          this.getEachUserData(url, json);
          token = ("token" in json) ? json.token : "";
        }
        catch(e) {
          console.log("Unable to obtain data from server");
        }
      } while (token)

      this.setState({ loading: false })
    }
    catch(e) {
      console.log("Unable to obtain data from server");
    }
  }

  async getEachUserData(url, json) {
    const usersArray = json.result;
    usersArray.forEach(async id => {
      try {
        const res = await fetch(`${url}/detail/${id}`);
        const json = await res.json();
        const item = {
          "id": json.id,
          "name": json.name,
          "age": json.age,
          "number": json.number,
          "photo": json.photo,
          "bio": json.bio
        }
        const users = { ...this.state.users };
        users[id] = item
        this.setState({ users });
      }
      catch(e) {
        console.log(`Unable to obtain data for id: ${id}`);
      }
    });
  }

  render() {

    if (!this.state.loading) {
 
      {Object.keys(this.state.users).map( key => { 
        
        const id = this.state.users[key].id
        const name = this.state.users[key].name
        const age = this.state.users[key].age
        const number = this.state.users[key].number
        const photo = this.state.users[key].photo
        const bio = this.state.users[key].bio

        // console.log(`id=${key} => ${JSON.stringify(this.state.users[key])}`)
      })}

      return (
        <div className="App">
          <header>
            <h1>Hi</h1>
          </header>
          <div>
            <h2>5 Youngest Users</h2>
            <p>{JSON.stringify(this.state.users)}</p>
          </div>
        </div>
      );
    }

    return <div>Loading...{this.state.users.length}</div>
  }

}

export default App;