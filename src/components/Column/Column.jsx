import styles from "./Column.module.css";

const Column = ({ children }) => {
  return <div className={styles.column}>{children}</div>;
};

export default Column;
