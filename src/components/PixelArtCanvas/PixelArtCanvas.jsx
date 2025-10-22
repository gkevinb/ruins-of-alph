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
const REVEAL_RAF_KEY = '__maskRevealRafId';
const PIXEL_REVEAL_TARGET_FRAMES = 120;

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

const createMaskPixelCoords = (maskData) => {
  const coords = [];

  maskData.forEach((row, rowIndex) => {
    row.split('').forEach((value, colIndex) => {
      if (value === '1') {
        coords.push({ x: colIndex, y: rowIndex });
      }
    });
  });

  return coords;
};

const MASK_PIXEL_COORDS = createMaskPixelCoords(MASK_DATA);

const shuffleArray = (array) => {
  const shuffled = array.slice();

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
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

const cancelPixelReveal = (canvas) => {
  if (!canvas) {
    return;
  }

  if (canvas[REVEAL_RAF_KEY]) {
    cancelAnimationFrame(canvas[REVEAL_RAF_KEY]);
    canvas[REVEAL_RAF_KEY] = undefined;
  }
};

const startPixelReveal = (canvas, pixelSize, onComplete) => {
  if (!canvas) {
    return;
  }

  const ctx = canvas.getContext('2d');

  if (!ctx) {
    return;
  }

  const pixels = shuffleArray(MASK_PIXEL_COORDS);

  if (pixels.length === 0) {
    onComplete?.();
    return;
  }

  const pixelsPerFrame = Math.max(1, Math.floor(pixels.length / PIXEL_REVEAL_TARGET_FRAMES));

  const revealStep = () => {
    const batchSize = Math.min(pixelsPerFrame, pixels.length);

    for (let i = 0; i < batchSize; i += 1) {
      const { x, y } = pixels.pop();
      ctx.clearRect(x * pixelSize, y * pixelSize, pixelSize, pixelSize);
    }

    if (pixels.length > 0) {
      canvas[REVEAL_RAF_KEY] = requestAnimationFrame(revealStep);
      return;
    }

    canvas[REVEAL_RAF_KEY] = undefined;
    onComplete?.();
  };

  canvas[REVEAL_RAF_KEY] = requestAnimationFrame(revealStep);
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
        cancelPixelReveal(maskCanvasRef.current);
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
    } else if (!container.contains(baseCanvas)) {
      container.appendChild(baseCanvas);
    }

    drawPixelArt(baseCanvas, expandedArt, pixelSize);

    let maskCanvas = maskCanvasRef.current;

    if (!maskCanvas) {
      maskCanvas = document.createElement('canvas');
      maskCanvas.className = styles.maskCanvas;
      maskCanvasRef.current = maskCanvas;
    }

    if (!maskCanvas.parentNode || maskCanvas.parentNode !== container) {
      container.appendChild(maskCanvas);
    }

    if (useMask) {
      cancelPixelReveal(maskCanvas);
      drawPixelArt(maskCanvas, maskedArt, pixelSize);
    } else {
      cancelPixelReveal(maskCanvas);
      drawPixelArt(maskCanvas, maskedArt, pixelSize);

      startPixelReveal(maskCanvas, pixelSize, () => {
        maskCanvas.remove();

        if (maskCanvasRef.current === maskCanvas) {
          maskCanvasRef.current = null;
        }
      });
    }
  }, [tilePixels, pixelSize, useMask]);

  const classes = ['canvas-cell', styles.container].join(' ');

  return <div id={componentId} ref={containerRef} className={classes}></div>;
};

export default PixelArtCanvas;
