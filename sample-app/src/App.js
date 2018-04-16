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
    this.displayUserProfile = this.displayUserProfile.bind(this);
  }

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

  displayUserProfile(key) {
    const users = this.state.users;
    const { id, name, age, number, photo, bio } = users[key];
    return (
      <div>
        <p>Name: {name}, Age: {age}, Number: {number}</p>
        <img src={photo} />
      </div>
    )
  }

  render() {

    if (!this.state.loading) {
      let youngestUsersArray = Object.keys(this.state.users)
        .sort( (a, b) => {
          const userAge1 = this.state.users[a].age;
          const userAge2 = this.state.users[b].age;
          return userAge1 - userAge2;
        })
        .filter( key => {
          const number = this.state.users[key].number;
          return (number != "") && (/^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$/.test(number));
        })
        .slice(0, 5);

      let youngestUsersMap = {};
      youngestUsersArray.forEach( id => {
        youngestUsersMap[id] = this.state.users[id];
      });

      return (
        <div className="App">
          <header>
            <h1>AppSheet Web App</h1>
          </header>
          <div>
            <h2>5 Youngest Users Sorted by Name</h2>
            <div>
              {Object.keys(youngestUsersMap)
                .sort( (a, b) => {
                  const name1 = this.state.users[a].name;
                  const name2 = this.state.users[b].name;
                  return name1 > name2;
                })
                .map(this.displayUserProfile)}
            </div>
          </div>
        </div>
      );
    }

    return <div>The application is loading...{this.state.users.length}</div>
  }

}

export default App;