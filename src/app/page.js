import Column from "../components/Column";
import Puzzle from "../components/Puzzle";
import { aerodactyl } from "../puzzles";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <Column />
      <Puzzle puzzle={aerodactyl} />
      <Column />
    </div>
  );
}
