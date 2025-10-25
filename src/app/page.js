'use client';

import { useCallback, useRef } from "react";
import Background from "../components/Background";
import Puzzle from "../components/Puzzle";
import { aerodactyl } from "../puzzles";
import styles from "./page.module.css";

export default function Home() {
  const topPixelSize = 4;
  const topTargetSize = 8;
  const topHeight = topPixelSize * topTargetSize;
  const solveHandlerRef = useRef(null);

  const handleSolveReady = useCallback((solveFn) => {
    solveHandlerRef.current = solveFn;
  }, []);

  const handleSecretSolve = useCallback(() => {
    solveHandlerRef.current?.();
  }, []);

  const handleSecretKeyDown = useCallback((event) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      solveHandlerRef.current?.();
    }
  }, []);

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
        <Puzzle puzzle={aerodactyl} onSolveReady={handleSolveReady} />
        <Background
          className={styles.bottomBackground}
          role="button"
          tabIndex={0}
          aria-label="Reveal the ruins"
          title="Reveal the ruins"
          onClick={handleSecretSolve}
          onKeyDown={handleSecretKeyDown}
          componentId="bottom-background"
        />
      </div>
      <Background
        className={styles.sideBackground}
        componentId="right-side-background"
      />
    </div>
  );
}
