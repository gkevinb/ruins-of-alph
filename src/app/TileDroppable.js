'use client'

import React from 'react';
import { useDroppable } from '@dnd-kit/core';

const TileDroppable = ({ id, children, className = '' }) => {
  const { isOver, setNodeRef } = useDroppable({ id });
  const classes = ['tile-droppable', className, isOver ? 'is-over' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div ref={setNodeRef} className={classes}>
      {children}
    </div>
  );
};

export default TileDroppable;
