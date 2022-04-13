import React from 'react';
import classNames from 'classnames';
import './Card.scss';

const Card = ({ classname, onClick, children }) => {
  return (
    <div className={classNames('card', classname)} onClick={onClick}>
      {children}
    </div>
  );
};

export default Card;
