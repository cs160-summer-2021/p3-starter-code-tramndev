import React, { Component } from "react";

class SocialMediaButtons extends Component {
  render = () => {
    return (
      <div>
        <a href="#" className="float" id="menu-share">
          <i className="fa fa-share my-float"></i>
        </a>
        <ul>
          <li id="exit">
            <a href="#">
              <i className="fa fa-sign-out my-float"></i>
            </a>
          </li>
          <li id="facebook">
            <a href="https://www.facebook.com/">
              <i className="fa fa-facebook my-float"></i>
            </a>
          </li>
          <li id="google">
            <a href="https://www.google.com/">
              <i className="fa fa-google-plus my-float"></i>
            </a>
          </li>
          <li id="twitter">
            <a href="https://twitter.com/?lang=en">
              <i className="fa fa-twitter my-float"></i>
            </a>
          </li>
        </ul>
      </div>
    );
  };
}

export default SocialMediaButtons;
