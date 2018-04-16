import React, { Component } from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  user: PropTypes.object.isRequired,
};

class UserProfile extends Component {

  render() {
    const {name, age, number, photo, bio} = this.props.user;
    return (
      <div>
        <p>Name: {name}, Age: {age}, Number: {number}</p>
        <p>{bio}</p>
        <img src={photo} alt={name} />
      </div>
    );
  }
}

UserProfile.propTypes = propTypes;

export default UserProfile;