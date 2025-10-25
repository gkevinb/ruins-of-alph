import Background from "../components/Background";
import Puzzle from "../components/Puzzle";
import { aerodactyl } from "../puzzles";
import styles from "./page.module.css";

export default function Home() {
  const topPixelSize = 4;
  const topTargetSize = 8;
  const topHeight = topPixelSize * topTargetSize;

  return (
    <div className={styles.page}>
      <Background
        className={styles.sideBackground}
        horizontalDirection="rtl"
        componentId="left-side-background"
      />
      <div className={styles.centerColumn}>
        <Background
          className={styles.topBackground}
          pixelSize={topPixelSize}
          targetSize={topTargetSize}
          style={{ height: `${topHeight}px` }}
          componentId="top-background"
        />
        <Puzzle puzzle={aerodactyl} />
      </div>
      <Background
        className={styles.sideBackground}
        componentId="right-side-background"
      />
    </div>
  );
}
