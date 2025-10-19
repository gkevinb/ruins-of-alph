'use client'

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import styles from './TileDroppable.module.css';

const TileDroppable = ({ id, children, className = '' }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const classes = [
    styles.root,
    className,
    isOver ? styles.isOver : ''
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={setNodeRef} className={classes}>
      {children}
    </div>
  );
};

export default TileDroppable;
