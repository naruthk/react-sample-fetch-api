import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  user: PropTypes.object.isRequired,
};

class UserProfile extends Component {

  render() {
    const {id, name, age, number, photo, bio} = this.props.user;
    return (
      <div key={id}>
        <p>Name: {name.charAt(0).toUpperCase() + name.slice(1)}, Age: {age}, Number: {number}</p>
        <p>{bio}</p>
        <img src={photo} alt={name} />
      </div>
    );
  }
}

UserProfile.propTypes = propTypes;

export default UserProfile;