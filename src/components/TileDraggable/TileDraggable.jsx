'use client'

import React from 'react';
import { useDraggable } from '@dnd-kit/core';
import { CSS } from '@dnd-kit/utilities';
import styles from './TileDraggable.module.css';

const TileDraggable = ({ id, children, className = '', style }) => {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({ id });

  const transformStyle = transform ? { transform: CSS.Translate.toString(transform) } : {};
  const combinedStyle = { ...transformStyle, ...style };
  const classes = [
    styles.root,
    className,
    isDragging ? styles.isDragging : ''
  ]
    .filter(Boolean)
    .join(' ');

  const handleContextMenu = React.useCallback((event) => {
    event.preventDefault();
  }, []);

  return (
    <div
      ref={setNodeRef}
      className={classes}
      style={combinedStyle}
      onContextMenu={handleContextMenu}
      {...listeners}
      {...attributes}
    >
      {children}
    </div>
  );
};

export default TileDraggable;
