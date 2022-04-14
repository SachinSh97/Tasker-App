import React from 'react';
import Proptypes from 'prop-types';
import classNames from 'classnames';
import './Card.scss';

const Card = ({ classname, onClick, children }) => {
  return (
    <div className={classNames('card', classname)} onClick={onClick}>
      {children}
    </div>
  );
};

Card.defaultProps = {
  classname: '',
  children: '',
  onClick: () => {},
};

Card.propTypes = {
  classname: Proptypes.string,
  children: Proptypes.node,
  onClick: Proptypes.func,
};

export default Card;
