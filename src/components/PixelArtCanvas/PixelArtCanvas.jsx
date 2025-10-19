'use client'

import React, { useEffect, useRef } from 'react';
import styles from './PixelArtCanvas.module.css';

const MASK_DATA = [
  '111111111111111111111111',
  '111000011110000000000111',
  '110000000000000000000011',
  '100000000000000000000001',
  '100000000000000000000001',
  '100000000000000000000001',
  '100000000000000000000001',
  '100000000000000000000001',
  '110000000000000000000001',
  '110000000000000000000001',
  '110000000000000000000001',
  '110000000000000000000001',
  '110000000000000000000001',
  '100000000000000000000001',
  '100000000000000000000011',
  '100000000000000000000011',
  '100000000000000000000011',
  '100000000000000000000011',
  '100000000000000000000001',
  '100000000000000000000001',
  '100000000000000000000001',
  '110000000000000000000001',
  '111000000000011111000011',
  '111111111111111111111111'
];

const SCALE = 2;
const TRANSITION_HANDLER_KEY = '__maskTransitionHandler';
const REVEAL_RAF_KEY = '__maskRevealRafId';

const expandPixelArt = (compressedArt, scale) => {
  const expandedArt = [];

  compressedArt.forEach((row) => {
    const expandedRow = row
      .split('')
      .map((char) => char.repeat(scale))
      .join('');

    for (let i = 0; i < scale; i += 1) {
      expandedArt.push(expandedRow);
    }
  });

  return expandedArt;
};

const applyMask = (expandedArt, maskData) => {
  return expandedArt.map((row, rowIndex) => {
    return row
      .split('')
      .map((char, colIndex) => {
        const maskValue = maskData[rowIndex][colIndex];
        if (maskValue === '1') {
          return '3';
        }
        return char;
      })
      .join('');
  });
};

const COLOR_MAP = {
  '0': '#f9f9f9',
  '1': '#c19f57',
  '2': '#8f6858',
  '3': '#000000'
};

const drawPixelArt = (canvas, art, pixelSize) => {
  if (!canvas || !art || art.length === 0) {
    return;
  }

  const width = art[0].length * pixelSize;
  const height = art.length * pixelSize;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext('2d');

  art.forEach((row, rowIndex) => {
    row.split('').forEach((pixel, colIndex) => {
      const color = COLOR_MAP[pixel];

      if (!color) {
        return;
      }

      ctx.fillStyle = color;
      ctx.fillRect(colIndex * pixelSize, rowIndex * pixelSize, pixelSize, pixelSize);
    });
  });
};

const PixelArtCanvas = ({ useMask, tilePixels, componentId, pixelSize = 5 }) => {
  const containerRef = useRef(null);
  const baseCanvasRef = useRef(null);
  const maskCanvasRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) {
      return;
    }

    if (!tilePixels) {
      if (maskCanvasRef.current) {
        maskCanvasRef.current.remove();
        maskCanvasRef.current = null;
      }

      if (baseCanvasRef.current) {
        baseCanvasRef.current.remove();
        baseCanvasRef.current = null;
      }

      return;
    }

    const expandedArt = expandPixelArt(tilePixels, SCALE);
    const maskedArt = applyMask(expandedArt, MASK_DATA);

    let baseCanvas = baseCanvasRef.current;

    if (!baseCanvas) {
      baseCanvas = document.createElement('canvas');
      baseCanvas.className = styles.baseCanvas;
      baseCanvasRef.current = baseCanvas;
      container.appendChild(baseCanvas);
    }

    drawPixelArt(baseCanvas, expandedArt, pixelSize);

    let maskCanvas = maskCanvasRef.current;

    if (useMask) {
      if (!maskCanvas) {
        maskCanvas = document.createElement('canvas');
        maskCanvas.className = styles.maskCanvas;
        maskCanvasRef.current = maskCanvas;
        container.appendChild(maskCanvas);
      }

      if (maskCanvas[TRANSITION_HANDLER_KEY]) {
        maskCanvas.removeEventListener('transitionend', maskCanvas[TRANSITION_HANDLER_KEY]);
        maskCanvas[TRANSITION_HANDLER_KEY] = undefined;
      }

      if (maskCanvas[REVEAL_RAF_KEY]) {
        cancelAnimationFrame(maskCanvas[REVEAL_RAF_KEY]);
        maskCanvas[REVEAL_RAF_KEY] = undefined;
      }

      maskCanvas.classList.remove(styles.maskHidden);
      drawPixelArt(maskCanvas, maskedArt, pixelSize);
    } else {
      if (!maskCanvas) {
        maskCanvas = document.createElement('canvas');
        maskCanvas.className = styles.maskCanvas;
        maskCanvasRef.current = maskCanvas;
        container.appendChild(maskCanvas);
      } else {
        container.appendChild(maskCanvas);
      }

      if (maskCanvas[TRANSITION_HANDLER_KEY]) {
        maskCanvas.removeEventListener('transitionend', maskCanvas[TRANSITION_HANDLER_KEY]);
      }

      if (maskCanvas[REVEAL_RAF_KEY]) {
        cancelAnimationFrame(maskCanvas[REVEAL_RAF_KEY]);
        maskCanvas[REVEAL_RAF_KEY] = undefined;
      }

      drawPixelArt(maskCanvas, maskedArt, pixelSize);
      maskCanvas.classList.remove(styles.maskHidden);

      const handleTransitionEnd = (event) => {
        if (event.propertyName !== 'opacity') {
          return;
        }

        if (!maskCanvas.classList.contains(styles.maskHidden)) {
          return;
        }

        maskCanvas.removeEventListener('transitionend', handleTransitionEnd);
        maskCanvas.remove();

        if (maskCanvasRef.current === maskCanvas) {
          maskCanvasRef.current = null;
        }

        maskCanvas[TRANSITION_HANDLER_KEY] = undefined;
      };

      maskCanvas[TRANSITION_HANDLER_KEY] = handleTransitionEnd;
      maskCanvas.addEventListener('transitionend', handleTransitionEnd);

      const rafId = requestAnimationFrame(() => {
        maskCanvas.classList.add(styles.maskHidden);
        maskCanvas[REVEAL_RAF_KEY] = undefined;
      });

      maskCanvas[REVEAL_RAF_KEY] = rafId;
    }
  }, [tilePixels, pixelSize, useMask]);

  const classes = ['canvas-cell', styles.container].join(' ');

  return <div id={componentId} ref={containerRef} className={classes}></div>;
};

export default PixelArtCanvas;
