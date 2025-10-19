'use client'

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';

const TileDraggable = ({ id, children, className = '', style }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const transformStyle = transform ? { transform: CSS.Translate.toString(transform) } : {};
  const combinedStyle = { ...transformStyle, ...style };
  const classes = ['tile-draggable', className, isDragging ? 'is-dragging' : '']
    .filter(Boolean)
    .join(' ');

  return (
    <div
      ref={setNodeRef}
      className={classes}
      style={combinedStyle}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default TileDraggable;
