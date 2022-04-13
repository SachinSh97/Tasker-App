import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import './Avatar.scss';

const Avatar = ({ name, color, active, onClick }) => {
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
    <div
      className={classNames('avatar', { active })}
      style={{ '--bg-color': color }}
      title={name}
      onClick={onClick}
    >
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
