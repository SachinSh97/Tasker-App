import React from 'react';
import './Card.scss';

const Card = ({ classname, children }) => {
  return <div className={`card ${classname}`}>{children}</div>;
};

export default Card;
