'use client'

import { useEffect, useRef } from 'react';
import styles from './TextBoard.module.css';

const PIXEL_SIZE = 6;
const TEXT_REVEAL_TARGET_FRAMES = 120;

const shuffleArray = (array) => {
  const shuffled = array.slice();

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }

  return shuffled;
};

const createGridCoords = (cols, rows) => {
  const coords = [];

  for (let y = 0; y < rows; y += 1) {
    for (let x = 0; x < cols; x += 1) {
      coords.push({ x, y });
    }
  }

  return coords;
};

const TextBoard = ({ message = '' }) => {
  const innerRef = useRef(null);
  const maskCanvasRef = useRef(null);
  const revealRafRef = useRef(null);
  const setupRafRef = useRef(null);

  useEffect(() => {
    const cancelReveal = () => {
      if (revealRafRef.current) {
        cancelAnimationFrame(revealRafRef.current);
        revealRafRef.current = null;
      }
    };

    cancelReveal();

    if (setupRafRef.current) {
      cancelAnimationFrame(setupRafRef.current);
      setupRafRef.current = null;
    }

    const inner = innerRef.current;

    if (!inner || !message) {
      if (maskCanvasRef.current) {
        maskCanvasRef.current.remove();
        maskCanvasRef.current = null;
      }

      return undefined;
    }

    const startReveal = () => {
      const currentInner = innerRef.current;

      if (!currentInner) {
        return;
      }

      const width = currentInner.offsetWidth;
      const height = currentInner.offsetHeight;

      if (width === 0 || height === 0) {
        return;
      }

      let maskCanvas = maskCanvasRef.current;

      if (!maskCanvas) {
        maskCanvas = document.createElement('canvas');
        maskCanvas.className = styles.maskCanvas;
        maskCanvasRef.current = maskCanvas;
      }

      const cols = Math.ceil(width / PIXEL_SIZE);
      const rows = Math.ceil(height / PIXEL_SIZE);

      maskCanvas.width = cols * PIXEL_SIZE;
      maskCanvas.height = rows * PIXEL_SIZE;

      const ctx = maskCanvas.getContext('2d');

      if (!ctx) {
        return;
      }

      ctx.fillStyle = '#000000';
      ctx.fillRect(0, 0, maskCanvas.width, maskCanvas.height);

      currentInner.appendChild(maskCanvas);

      const coords = shuffleArray(createGridCoords(cols, rows));

      if (coords.length === 0) {
        maskCanvas.remove();
        maskCanvasRef.current = null;
        return;
      }

      const pixelsPerFrame = Math.max(
        1,
        Math.floor(coords.length / TEXT_REVEAL_TARGET_FRAMES)
      );

      const revealStep = () => {
        const batchSize = Math.min(pixelsPerFrame, coords.length);

        for (let i = 0; i < batchSize; i += 1) {
          const coord = coords.pop();

          if (!coord) {
            break;
          }

          ctx.clearRect(coord.x * PIXEL_SIZE, coord.y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE);
        }

        if (coords.length > 0) {
          revealRafRef.current = requestAnimationFrame(revealStep);
          return;
        }

        revealRafRef.current = null;
        maskCanvas.remove();
        maskCanvasRef.current = null;
      };

      revealRafRef.current = requestAnimationFrame(revealStep);
    };

    setupRafRef.current = requestAnimationFrame(startReveal);

    return () => {
      cancelReveal();

      if (setupRafRef.current) {
        cancelAnimationFrame(setupRafRef.current);
        setupRafRef.current = null;
      }

      if (maskCanvasRef.current) {
        maskCanvasRef.current.remove();
        maskCanvasRef.current = null;
      }
    };
  }, [message]);

  return (
    <div className={styles.board}>
      <div ref={innerRef} className={styles.inner}>
        {message ? <span className={styles.message}>{message}</span> : null}
      </div>
    </div>
  );
};

export default TextBoard;
