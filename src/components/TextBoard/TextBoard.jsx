'use client'

import { useEffect, useRef, useState } from 'react';
import styles from './TextBoard.module.css';

const TextBoard = ({ message = '' }) => {
  const [isVisible, setIsVisible] = useState(false);
  const rafRef = useRef(null);

  useEffect(() => {
    if (rafRef.current) {
      cancelAnimationFrame(rafRef.current);
      rafRef.current = null;
    }

    if (!message) {
      setIsVisible(false);
      return undefined;
    }

    setIsVisible(false);

    rafRef.current = requestAnimationFrame(() => {
      setIsVisible(true);
      rafRef.current = null;
    });

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
      }
    };
  }, [message]);

  return (
    <div className={styles.board}>
      <div className={styles.inner}>
        {message ? (
          <span
            className={`${styles.message} ${isVisible ? styles.messageVisible : ''}`}
          >
            {message}
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default TextBoard;
