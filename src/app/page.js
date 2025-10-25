"use client";

import Link from 'next/link';
import styles from './page.module.css';
import BackgroundPixels from '../components/BackgroundPixels';

const puzzles = [
  { label: 'Puzzle 1', href: '/puzzles/puzzle-1', available: true },
  { label: 'Puzzle 2', href: '#', available: false },
  { label: 'Puzzle 3', href: '#', available: false }
];

export default function Home() {
  return (
    <div className={styles.homeWrapper}>
      <BackgroundPixels componentId="home-background" pixelSize={4} targetSize={24} />
      <main className={styles.home}>
        <h1 className={styles.title}>Ruins of Alph</h1>
        <p className={styles.subtitle}>Choose a puzzle to enter the ruins.</p>
        <div className={styles.puzzleList}>
          {puzzles.map((puzzle) =>
            puzzle.available ? (
              <Link key={puzzle.label} href={puzzle.href} className={styles.puzzleButton}>
                {puzzle.label}
              </Link>
            ) : (
              <button
                key={puzzle.label}
                type="button"
                className={`${styles.puzzleButton} ${styles.puzzleButtonDisabled}`}
                disabled
                title="Coming soon"
              >
                {puzzle.label}
              </button>
            )
          )}
        </div>
      </main>
    </div>
  );
}
