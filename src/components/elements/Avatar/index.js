import React from 'react';
import Proptypes from 'prop-types';
import './Avatar.scss';

const Avatar = ({ name, color }) => {
  const renderText = (name) => {
    const nameArr = name?.split(' ');
    let text = '';

    nameArr?.length > 0 &&
      nameArr.forEach((name) => {
        text += name?.charAt(0);
      });

    return text;
  };

  return (
    <div className="avatar" style={{ '--bg-color': color }} title={name}>
      {renderText(name)}
    </div>
  );
};

Avatar.defaultProps = {
  name: '',
  color: '',
};

Avatar.propTypes = {
  name: Proptypes.string,
  color: Proptypes.string,
};

export default Avatar;
