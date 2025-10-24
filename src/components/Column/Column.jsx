import BackgroundPixels from "../BackgroundPixels";
import styles from "./Column.module.css";

const Column = ({ children, horizontalDirection = 'ltr' }) => {
  return (
    <div className={styles.column}>
      <BackgroundPixels pixelSize={4} horizontalDirection={horizontalDirection} />
      <div className={styles.content}>{children}</div>
    </div>
  );
};

export default Column;
