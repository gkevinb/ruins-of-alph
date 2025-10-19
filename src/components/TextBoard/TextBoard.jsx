'use client'

import styles from './TextBoard.module.css';

const TextBoard = ({ message = '' }) => {
  return (
    <div className={styles.board}>
      <div className={styles.inner}>
        {message ? <span className={styles.message}>{message}</span> : null}
      </div>
    </div>
  );
};

export default TextBoard;
