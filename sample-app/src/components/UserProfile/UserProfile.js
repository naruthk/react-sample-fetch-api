import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './UserProfile.css';

const propTypes = {
  user: PropTypes.object.isRequired,
};

class UserProfile extends Component {

  render() {
    const {id, name, age, number, photo, bio} = this.props.user;
    return (
      <div key={id} className="profile">
        <img className="profile_photo" src={photo} alt={name} />
        <p className="name">
          {name.charAt(0).toUpperCase() + name.slice(1)}
          <span className="age">{age} yrs.</span>
        </p>
        <p className="biography">{bio}</p>
        <p className="additional_info"><b>Contact:</b> {number}</p>
      </div>
    );
  }
}

UserProfile.propTypes = propTypes;

export default UserProfile;