import React from 'react';

import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';
import {Link} from 'react-router-dom';
import '../css/InfoBar.css';
import {Join} from './Join'

const InfoBar = ({ room,name }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <img className="onlineIcon" src={onlineIcon} alt="online icon" />
      <h3>{room}</h3>
    </div>
    <div className="rightInnerContainer">
      {/* <a href="/"><img src={closeIcon} alt="close icon" /></a> */}
      <Link onClick={event=>(!name)? event.preventDefault():null} to={{
  pathname: '/join',
  state: {
   email:name
  }
}}>
      <img src={closeIcon} alt="close icon" />
                </Link>
    </div>
  </div>
);

export default InfoBar;