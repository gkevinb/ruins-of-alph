'use client'

import React, { useEffect } from 'react';
import styles from './BlackTile.module.css';

const BlackTile = ({ componentId, pixelSize = 5, targetSize = 24 }) => {
  useEffect(() => {
    if (!componentId) {
      return;
    }

    const container = document.getElementById(componentId);

    if (!container) {
      return;
    }

    const canvas = document.createElement('canvas');
    canvas.width = targetSize * pixelSize;
    canvas.height = targetSize * pixelSize;

    const ctx = canvas.getContext('2d');

    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    container.replaceChildren(canvas);
  }, [componentId, pixelSize, targetSize]);

  const classes = ['canvas-cell', styles.container].join(' ');

  return <div id={componentId} className={classes}></div>;
};

export default BlackTile;
