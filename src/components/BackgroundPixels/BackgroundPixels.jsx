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

const BackgroundPixels = ({
  componentId,
  pixelSize = 5,
  targetSize = 24,
  horizontalDirection = 'ltr'
}) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    const palette = {
      '0': '#f9f9f9',
      '1': '#c19f57',
      '2': '#8f6858',
      '3': '#000000'
    };

    const tiledPixelArt = tilePixelArt(pixelArtCompressed, targetSize);
    const tilePixelWidth = tiledPixelArt[0].length;
    const tilePixelHeight = tiledPixelArt.length;
    const tileWidth = tilePixelWidth * pixelSize;
    const tileHeight = tilePixelHeight * pixelSize;

    const render = () => {
      const { clientWidth, clientHeight } = container;

      if (clientWidth === 0 || clientHeight === 0) {
        return;
      }

      const width = Math.max(tileWidth, Math.ceil(clientWidth / pixelSize) * pixelSize);
      const height = Math.max(tileHeight, Math.ceil(clientHeight / pixelSize) * pixelSize);

      let canvas = container.firstElementChild;

      if (!(canvas instanceof HTMLCanvasElement)) {
        canvas = document.createElement('canvas');
        container.replaceChildren(canvas);
      }

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      const ctx = canvas.getContext('2d');

      if (!ctx) {
        return;
      }

      ctx.clearRect(0, 0, width, height);

      const rows = Math.floor(height / pixelSize);
      const cols = Math.floor(width / pixelSize);

      let lastFill;

      for (let row = 0; row < rows; row += 1) {
        const patternRow = tiledPixelArt[row % tilePixelHeight];

        for (let col = 0; col < cols; col += 1) {
          const patternIndex = col % tilePixelWidth;
          const patternCol =
            horizontalDirection === 'rtl'
              ? tilePixelWidth - 1 - patternIndex
              : patternIndex;
          const pixel = patternRow[patternCol];
          const fill = palette[pixel];

          if (!fill) {
            continue;
          }

          if (fill !== lastFill) {
            ctx.fillStyle = fill;
            lastFill = fill;
          }

          const drawX =
            horizontalDirection === 'rtl'
              ? (cols - 1 - col) * pixelSize
              : col * pixelSize;

          ctx.fillRect(
            drawX,
            row * pixelSize,
            pixelSize,
            pixelSize
          );
        }
      }
    };

    render();

    let resizeObserver;

    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(render);
      resizeObserver.observe(container);
    } else if (typeof window !== 'undefined') {
      window.addEventListener('resize', render);
    }

    return () => {
      if (resizeObserver) {
        resizeObserver.disconnect();
      } else if (typeof window !== 'undefined') {
        window.removeEventListener('resize', render);
      }
    };
  }, [horizontalDirection, pixelSize, targetSize]);

  const classes = ['canvas-cell', styles.container].join(' ');

  return <div id={componentId} ref={containerRef} className={classes}></div>;
};

export default BackgroundPixels;
