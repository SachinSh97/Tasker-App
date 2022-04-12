import React from 'react';
import './Header.scss';

const Header = ({ user }) => {
  return (
    <div className="taskboard-header">
      <div className="title">Tasks board </div>
      {user && <div></div>}
    </div>
  );
};

export default Header;
