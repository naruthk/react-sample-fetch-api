import React, { Component } from 'react';
import Loading from './components/Loading/Loading';
import UserProfile from './components/UserProfile/UserProfile';

import './App.css';
import Logo from './assets/logo_appsheet.png';

class App extends Component {

  constructor() {
    super();
    
    /* States:
      - users: A map of k and v, where the key holds the ID of each user
               and a value holds a map of that particular user's data
      - sortedUsers: Like users, but only after users have been sorted 
      - loading: A boolean value representing rendering status 
    */
    this.state = {
      users: {},
      sortedUsers: {},
      loading: true
    }
    this.url = "http://appsheettest1.azurewebsites.net/sample";
    this.fetchUsers = this.fetchUsers.bind(this);
    this.getEachUserData = this.getEachUserData.bind(this);
    this.displayUserProfile = this.displayUserProfile.bind(this);
    this.retrieveYoungestUsers = this.retrieveYoungestUsers.bind(this);
  }

  componentDidMount() {
    this.setState({ loading: true });
    this.fetchUsers();
  }

  /*
    Fetches every user in the database API, storing them in state.
    Connection done via an async/await with variant parameters
  */
  async fetchUsers() {
    try {
      const res = await fetch(`${this.url}/list`);
      const json = await res.json();

      // Having retrieved our data, let's establish a new connection to our
      // API to obtain data for each individual user
      this.getEachUserData(json);
      
      // A token represents a signal that there are still more results left
      // that have yet been retrieved. Keep retrieving result "token" is null.
      let token = ("token" in json) ? json.token : "";
      do { 
        try {
          const res = await fetch(`${this.url}/list?token=${token}`);
          const json = await res.json();
          this.getEachUserData(json);
          token = ("token" in json) ? json.token : "";
        }
        catch(e) {
          console.log(`${e} - Unable to obtain data from server`);
        }
      } while (token)

      // Having retrieved every user's information, loading is done and
      // proceed to retrieving youngest users
      this.setState({ loading: false })
      this.retrieveYoungestUsers();
    }
    catch(e) {
      console.log(`${e} - Unable to obtain data from server`);
    }
  }

  /*
    - Accepts a JSON object that contains the information for all of our users.
    Now use this object to further contact the API to obtain specific
    information for each individual user.
    - Once information is obtained, the state is updated. 
  */
  async getEachUserData(json) {
    const usersArray = json.result;
    usersArray.forEach(async id => {
      try {
        const res = await fetch(`${this.url}/detail/${id}`);
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
        console.log(`${e} - Unable to obtain data for id: ${id}`);
      }
    });
  }

  /*
    Retrieve the youngest users according to age and valid telephone numbers
  */
  retrieveYoungestUsers() {
    /* 
      An array of users that are queried by:
        - sorting age in ascending order
        - filtering for users with valid phone numbers
        - limiting array size to 5
    */
    let youngestUsersArray = Object.keys(this.state.users)
    .sort( (a, b) => {
      // Sort by age
      const userAge1 = this.state.users[a].age;
      const userAge2 = this.state.users[b].age;
      return userAge1 - userAge2;
    })
    .filter( key => {
      // Filter by valid telephone number
      // Format: 555-555-5555
      const number = this.state.users[key].number;
      return (number !== "") && (/^[0-9]{3}[-][0-9]{3}[-][0-9]{4}$/.test(number));
    })
    .slice(0, 5);

    youngestUsersArray.forEach( id => {
      const sortedUsers = {...this.state.sortedUsers};
      sortedUsers[id] = this.state.users[id];
      this.setState({ sortedUsers })
    });
  }

  /*
    Given a key, displays the current user profile
    Parameters:
      key - the identifer for a particular item
  */
  displayUserProfile(key) {
    return <UserProfile key={key} user={this.state.sortedUsers[key]} />
  }

  render() {
    if (this.state.loading) return <Loading />

    /* 
      Sort users by their names and then display each individual user
      profile by mapping each one.
    */
    const sortedUsers = Object.keys(this.state.sortedUsers)
      .sort( (a, b) => {
        const name1 = this.state.users[a].name;
        const name2 = this.state.users[b].name;
        return name1 > name2;
      })
      .map(this.displayUserProfile)

    return (
      <div className="App">
        <header>
          <img className="logo" src={Logo} alt="App Sheet" />
          <h1>5 Youngest Users Sorted by Name</h1>
        </header>
        <div className="Cards">
          {sortedUsers}
        </div>
        <footer>
          <p>Take-home project for Naruth Kongurai (Sam)</p>
        </footer>
      </div>
    );
  }
}

export default App;