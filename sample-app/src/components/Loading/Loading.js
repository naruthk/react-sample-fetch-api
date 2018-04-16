import React, { Component } from 'react';
import './Loading.css';

class Loading extends Component {

  render() {
    return (
      <div className="Loading_Wrapper">
        <h2>Please wait...</h2>
        <p>Downloading and preparing data for viewing</p>
      </div>
    )
  }

}

export default Loading;