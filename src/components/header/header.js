import React from 'react';
import profile from "../../images/icons/user.svg";
import home from "../../images/icons/home.svg";


export default function header(props) {
      return (
            <div className="header">
                  <div className="navigation"><img src={profile} onClick={()=> props.pushHistory('/profile')} id="icon-profile" width="30vh" alt="profile"/></div>
                  <div className="logo"><h1>Pic</h1></div>
                  <div className="navigation"><img src={home} onClick={()=> props.pushHistory('/')} id="icon-home" width="30vh" alt="home"/></div>
            </div>
      )
}
