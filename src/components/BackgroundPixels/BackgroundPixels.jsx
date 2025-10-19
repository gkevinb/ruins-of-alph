'use client'

import React, { useEffect, useRef } from 'react';
import styles from './BackgroundPixels.module.css';

const pixelArtCompressed = [
  "11101011",
  "12010112",
  "10101111",
  "11011111",
  "21111212",
  "11112121",
  "11111212",
  "12111111",
];

const tilePixelArt = (compressedArt, targetSize) => {
  const originalSize = compressedArt.length;
  const tiledArt = [];

  for (let i = 0; i < targetSize; i++) {
    const row = compressedArt[i % originalSize].repeat(targetSize / originalSize);
    tiledArt.push(row);
  }

  return tiledArt;
};

const BackgroundPixels = ({ componentId, pixelSize = 5, targetSize = 24 }) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const tiledPixelArt = tilePixelArt(pixelArtCompressed, targetSize);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = tiledPixelArt[0].length * pixelSize;
    canvas.height = tiledPixelArt.length * pixelSize;

    container.replaceChildren(canvas);

    tiledPixelArt.forEach((row, rowIndex) => {
      row.split("").forEach((pixel, colIndex) => {
        if (pixel === "0") {
          ctx.fillStyle = '#f9f9f9';
        }
        if (pixel === "1") {
          ctx.fillStyle = '#c19f57';
        }
        if (pixel === "2") {
          ctx.fillStyle = '#8f6858';
        }

        ctx.fillRect(
          colIndex * pixelSize,
          rowIndex * pixelSize,
          pixelSize,
          pixelSize
        );
      });
    });
  }, [pixelSize, targetSize]);

  const classes = ['canvas-cell', styles.container].join(' ');

  return <div id={componentId} ref={containerRef} className={classes}></div>;
};

export default BackgroundPixels;
