import React from 'react';
import s from './notFoundBlock.module.scss'

const NotFoundBlock: React.FC = () => {
  return (
      <div className={s.root}>
        <h1>Нічого не знайдено :(</h1>
        <span>😌</span>
      </div>
  );
};

export default NotFoundBlock;