'use client'

import { useMemo, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import PixelArtCanvas from '../components/PixelArtCanvas';
import BackgroundPixels from '../components/BackgroundPixels';
import BlackTile from '../components/BlackTile';
import TileDroppable from '../components/TileDroppable';
import TileDraggable from '../components/TileDraggable';
import TextBoard from '../components/TextBoard';
import styles from './page.module.css';

const getCellId = (rowIndex, colIndex) => `cell-${rowIndex}-${colIndex}`;

export default function Home() {
  const pixelTileA1 = [
    '111111111111',
    '111111111111',
    '111112221111',
    '111222122222',
    '111211111222',
    '111212211222',
    '112212111112',
    '112111111111',
    '112111111111',
    '112212211111',
    '111222221211',
    '111222222222'
  ];

  const pixelTileB1 = [
    '111222222222',
    '111222222222',
    '111222122122',
    '111222111111',
    '111221111111',
    '111221111111',
    '111222111112',
    '111222111222',
    '111222222222',
    '111222222222',
    '111222222222',
    '111222222222'
  ];

  const pixelTileC1 = [
    '111222222222',
    '111222222222',
    '111222222222',
    '111222122222',
    '111221112222',
    '111221112222',
    '111211111222',
    '112211111222',
    '112111111122',
    '112111111122',
    '112221122222',
    '111221122222'
  ];

  const pixelTileD1 = [
    '111221112222',
    '111221112222',
    '111222111222',
    '111222111122',
    '111222211111',
    '111222221111',
    '111222222111',
    '111222222222',
    '111222222222',
    '111111111111',
    '111111111111',
    '111111111111'
  ];

  const pixelTileA2 = [
    '111111111111',
    '111111111111',
    '111111111122',
    '222222222221',
    '222222221111',
    '221111111111',
    '221111111112',
    '211122221122',
    '112221211122',
    '112221211122',
    '111222211122',
    '111111111211'
  ];

  const pixelTileB2 = [
    '221112211211',
    '122222111211',
    '111111111211',
    '111111111211',
    '111221122211',
    '222222221111',
    '222222211111',
    '222222211111',
    '222222111112',
    '222221111112',
    '222221111111',
    '222211111111'
  ];

  const pixelTileC2 = [
    '222211111111',
    '222211111111',
    '222211111211',
    '222221122211',
    '222221221111',
    '222222211111',
    '222222111111',
    '222222111112',
    '222222111112',
    '222222211111',
    '222222222111',
    '222222222211'
  ];

  const pixelTileD2 = [
    '222222211111',
    '222221111111',
    '222211111111',
    '222211222222',
    '122222222222',
    '111122222222',
    '111111111111',
    '111111111111',
    '221111111111',
    '122222211111',
    '111111222222',
    '111111111111'
  ];

  const pixelTileA3 = [
    '111111111111',
    '111111111111',
    '221111111111',
    '122222222222',
    '121122222211',
    '221112221112',
    '222112111222',
    '222222112211',
    '221121122111',
    '221221121111',
    '222211221111',
    '222211221111'
  ];

  const pixelTileA4 = [
    '111111111111',
    '111111111111',
    '222222221111',
    '211111122111',
    '112222222111',
    '222111222111',
    '111122222211',
    '111221111211',
    '111211112211',
    '112211122111',
    '112111122111',
    '112111222111'
  ];

  const pixelTileB3 = [
    '222211211111',
    '222211211111',
    '222211211111',
    '222211211111',
    '122211222211',
    '122211211222',
    '122112211111',
    '221122111111',
    '211221111122',
    '112211111221',
    '122111112211',
    '121111122111'
  ];

  const pixelTileB4 = [
    '112111222111',
    '112111222111',
    '112211222111',
    '111211222111',
    '111211222111',
    '221211222111',
    '122211222111',
    '221112222111',
    '111112222111',
    '111112222111',
    '111222222111',
    '122222222111'
  ];

  const pixelTileC3 = [
    '122111122112',
    '112221222222',
    '111122211122',
    '111111111111',
    '111111111111',
    '111112111111',
    '111122111111',
    '211121111111',
    '222221111111',
    '222111111111',
    '122222222211',
    '122222222222'
  ];

  const pixelTileC4 = [
    '222222222111',
    '222222222111',
    '222222222111',
    '222222222111',
    '111222222111',
    '111112222111',
    '111111222111',
    '111111122111',
    '111111122111',
    '111111112111',
    '111111112111',
    '111111112111'
  ];

  const pixelTileD3 = [
    '111222222222',
    '111122222222',
    '221122222222',
    '222222222222',
    '222222222111',
    '222211111111',
    '111111111111',
    '111111111111',
    '111111111111',
    '111111112222',
    '222222222111',
    '111111111111'
  ];

  const pixelTileD4 = [
    '211111112111',
    '211111112111',
    '211111112111',
    '111111112111',
    '111111122111',
    '111111122111',
    '111111222111',
    '111122222111',
    '122222222111',
    '221111111111',
    '111111111111',
    '111111111111'
  ];

  const pixelTileMap = {
    A1: pixelTileA1,
    A2: pixelTileA2,
    A3: pixelTileA3,
    A4: pixelTileA4,
    B1: pixelTileB1,
    B2: pixelTileB2,
    B3: pixelTileB3,
    B4: pixelTileB4,
    C1: pixelTileC1,
    C2: pixelTileC2,
    C3: pixelTileC3,
    C4: pixelTileC4,
    D1: pixelTileD1,
    D2: pixelTileD2,
    D3: pixelTileD3,
    D4: pixelTileD4
  };

  const gridLayout = useMemo(
    () => [
      ['BG', 'BG', 'BG', 'BG', 'BG', 'BG'],
      ['BG', 'A1', 'A2', 'A3', 'A4', 'BG'],
      ['BG', 'B1', 'B2', 'B3', 'B4', 'BG'],
      ['BG', 'C1', 'C2', 'C3', 'C4', 'BG'],
      ['BG', 'D1', 'D2', 'D3', 'D4', 'BG'],
      ['BG', 'BG', 'BG', 'BG', 'BG', 'BG']
    ],
    []
  );

  const { solvedPlacements, outerCellIds } = useMemo(() => {
    const solved = {};
    const outer = [];

    gridLayout.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellId = getCellId(rowIndex, colIndex);
        const isBoardCell =
          rowIndex === gridLayout.length - 1 && colIndex > 0 && colIndex < row.length - 1;

        const isOuterCell =
          !isBoardCell &&
          (rowIndex === 0 ||
            rowIndex === gridLayout.length - 1 ||
            colIndex === 0 ||
            colIndex === row.length - 1);

        if (isOuterCell) {
          outer.push(cellId);
        }

        if (cell !== 'BG') {
          solved[cell] = cellId;
        }
      });
    });

    return { solvedPlacements: solved, outerCellIds: outer };
  }, [gridLayout]);

  const shuffleArray = (items) => {
    const array = [...items];

    for (let i = array.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }

    return array;
  };

  const [placements, setPlacements] = useState(() => {
    const tileIds = Object.keys(pixelTileMap);

    if (outerCellIds.length >= tileIds.length) {
      const shuffledCells = shuffleArray(outerCellIds);
      const map = {};

      tileIds.forEach((tileId, index) => {
        map[tileId] = shuffledCells[index];
      });

      return map;
    }

    return { ...solvedPlacements };
  });

  const cellOccupants = useMemo(() => {
    const entries = {};

    Object.entries(placements).forEach(([tileId, cellId]) => {
      entries[cellId] = tileId;
    });

    return entries;
  }, [placements]);

  const isSolved = useMemo(() => {
    return Object.entries(solvedPlacements).every(
      ([tileId, targetCellId]) => placements[tileId] === targetCellId
    );
  }, [placements, solvedPlacements]);

  const handleDragEnd = (event) => {
    const { active, over } = event;

    if (!over) {
      return;
    }

    const activeId = active.id;
    const overId = over.id;

    if (overId === placements[activeId]) {
      return;
    }

    setPlacements((prev) => {
      const sourceCell = prev[activeId];

      if (!sourceCell) {
        return prev;
      }

      const next = { ...prev };
      const targetEntry = Object.entries(prev).find(([, cellId]) => cellId === overId);

      next[activeId] = overId;

      if (targetEntry) {
        const [targetTile] = targetEntry;

        if (targetTile !== activeId) {
          next[targetTile] = sourceCell;
        }
      }

      return next;
    });
  };

  return (
    <div>
      <h1>Pixel Art</h1>
      <DndContext onDragEnd={handleDragEnd}>
        <div className={styles.gridContainer}>
          {gridLayout.map((row, rowIndex) =>
            row.map((_, colIndex) => {
              if (rowIndex === gridLayout.length - 1) {
                if (colIndex === 1) {
                  return (
                    <div
                      className={`${styles.gridItem} ${styles.boardItem}`}
                      key="text-board"
                    >
                      <TextBoard message={isSolved ? 'congrats on finishing puzzle' : ''} />
                    </div>
                  );
                }

                if (colIndex > 1 && colIndex < 5) {
                  return null;
                }
              }

              const cellId = getCellId(rowIndex, colIndex);
              const isCentralCell =
                rowIndex > 0 &&
                rowIndex < gridLayout.length - 1 &&
                colIndex > 0 &&
                colIndex < row.length - 1;
              const occupantId = cellOccupants[cellId];
              const tilePixels = occupantId ? pixelTileMap[occupantId] : null;

              return (
                <div className={styles.gridItem} key={cellId}>
                  <TileDroppable id={cellId}>
                    <BackgroundPixels componentId={`bg-${cellId}`} />
                    {isCentralCell ? (
                      <BlackTile componentId={`black-${cellId}`} />
                    ) : null}
                    {tilePixels ? (
                      <TileDraggable id={occupantId}>
                        <PixelArtCanvas
                          componentId={`tile-${occupantId}`}
                          tilePixels={tilePixels}
                          useMask={true}
                        />
                      </TileDraggable>
                    ) : null}
                  </TileDroppable>
                </div>
              );
            })
          )}
        </div>
      </DndContext>
    </div>
  );
}
