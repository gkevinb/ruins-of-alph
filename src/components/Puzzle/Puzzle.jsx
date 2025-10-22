'use client'

import { useCallback, useEffect, useMemo, useState } from 'react';
import { DndContext } from '@dnd-kit/core';
import BackgroundPixels from '../BackgroundPixels';
import BlackTile from '../BlackTile';
import PixelArtCanvas from '../PixelArtCanvas';
import TextBoard from '../TextBoard';
import TileDroppable from '../TileDroppable';
import TileDraggable from '../TileDraggable';
import styles from './Puzzle.module.css';

const makeCellId = (puzzleId, rowIndex, colIndex) => `${puzzleId}-cell-${rowIndex}-${colIndex}`;

const shuffleArray = (items) => {
  const array = [...items];

  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  return array;
};

const DEFAULT_PIXEL_SIZE = 5;
const DEFAULT_TARGET_SIZE = 24;
const MOBILE_BREAKPOINT = 575;
const SUPPLY_SLOT_COUNT = 4;

const Puzzle = ({ puzzle }) => {
  const {
    id: puzzleId = 'puzzle',
    name,
    tilePixels,
    gridLayout,
    textBoard,
    renderConfig = {}
  } = puzzle;

  const pixelSize = renderConfig.pixelSize ?? DEFAULT_PIXEL_SIZE;
  const targetSize = renderConfig.targetSize ?? DEFAULT_TARGET_SIZE;

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return undefined;
    }

    const mediaQuery = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`);

    const handleChange = (event) => {
      setIsMobile(event.matches);
    };

    setIsMobile(mediaQuery.matches);

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  const rowCount = gridLayout.length;
  const columnCount = rowCount > 0 ? gridLayout[0].length : 0;

  const { solvedPlacements, outerCellIds } = useMemo(() => {
    const solved = {};
    const outer = [];

    gridLayout.forEach((row, rowIndex) => {
      row.forEach((cell, colIndex) => {
        const cellId = makeCellId(puzzleId, rowIndex, colIndex);
        const isTextBoardCell =
          !!textBoard &&
          rowIndex === textBoard.rowIndex &&
          colIndex >= textBoard.startCol &&
          colIndex <= textBoard.endCol;

        const isPerimeter =
          rowIndex === 0 ||
          rowIndex === gridLayout.length - 1 ||
          colIndex === 0 ||
          colIndex === row.length - 1;

        if (isPerimeter && !isTextBoardCell) {
          outer.push(cellId);
        }

        if (cell !== 'BG' && tilePixels[cell]) {
          solved[cell] = cellId;
        }
      });
    });

    return { solvedPlacements: solved, outerCellIds: outer };
  }, [gridLayout, textBoard, puzzleId, tilePixels]);

  const buildInitialPlacements = useCallback(() => {
    const tileIdsForPlacement = Object.keys(tilePixels);

    if (outerCellIds.length >= tileIdsForPlacement.length) {
      const shuffledCells = shuffleArray(outerCellIds);
      const map = {};

      tileIdsForPlacement.forEach((tileId, index) => {
        map[tileId] = shuffledCells[index];
      });

      return map;
    }

    return { ...solvedPlacements };
  }, [tilePixels, outerCellIds, solvedPlacements]);

  const tileIds = useMemo(() => Object.keys(tilePixels), [tilePixels]);

  const [placements, setPlacements] = useState({});
  const [supplyQueue, setSupplyQueue] = useState([]);

  useEffect(() => {
    if (isMobile) {
      setPlacements({});
      setSupplyQueue(() => shuffleArray(tileIds));
      return;
    }

    const initialPlacements = buildInitialPlacements();
    setPlacements(initialPlacements);
    setSupplyQueue([]);
  }, [isMobile, buildInitialPlacements, tileIds]);

  const supplyCellIds = useMemo(() => {
    if (!isMobile || gridLayout.length === 0) {
      return [];
    }

    const topRow = gridLayout[0];
    const ids = [];

    topRow.forEach((_, colIndex) => {
      if (colIndex === 0 || colIndex === topRow.length - 1) {
        return;
      }

      if (ids.length < SUPPLY_SLOT_COUNT) {
        ids.push(makeCellId(puzzleId, 0, colIndex));
      }
    });

    return ids;
  }, [isMobile, gridLayout, puzzleId]);

  const cellOccupants = useMemo(() => {
    const entries = {};

    Object.entries(placements).forEach(([tileId, cellId]) => {
      entries[cellId] = tileId;
    });

    if (isMobile) {
      supplyCellIds.forEach((cellId, index) => {
        const tileId = supplyQueue[index];

        if (tileId) {
          entries[cellId] = tileId;
        }
      });
    }

    return entries;
  }, [placements, isMobile, supplyCellIds, supplyQueue]);

  const isSolved = useMemo(() => {
    return Object.entries(solvedPlacements).every(
      ([tileId, targetCellId]) => placements[tileId] === targetCellId
    );
  }, [placements, solvedPlacements]);


  {/* Debug purposes solve logic */}
  const handleSolve = useCallback(() => {
    setPlacements(() => ({ ...solvedPlacements }));

    if (isMobile) {
      setSupplyQueue([]);
    }
  }, [solvedPlacements, isMobile]);
  {/* Debug purposes solve logic */}


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

    if (isMobile) {
      const activeData = active.data?.current ?? {};
      const sourceType = activeData.sourceType ?? (placements[activeId] ? 'board' : 'supply');
      const supplyTargetIndex = supplyCellIds.indexOf(overId);
      const isOverSupply = supplyTargetIndex !== -1;

      const targetEntry = Object.entries(placements).find(([, cellId]) => cellId === overId);
      const targetTile = targetEntry ? targetEntry[0] : undefined;
      const sourceCell = placements[activeId];
      const activeFromSupply = sourceType === 'supply' || !sourceCell;

      if (isOverSupply) {
        setPlacements((prev) => {
          if (!prev[activeId]) {
            return prev;
          }

          const next = { ...prev };
          delete next[activeId];
          return next;
        });

        setSupplyQueue((prevQueue) => {
          const withoutActive = prevQueue.filter((id) => id !== activeId);

          if (supplyTargetIndex < 0) {
            return withoutActive;
          }

          return [
            ...withoutActive.slice(0, supplyTargetIndex),
            activeId,
            ...withoutActive.slice(supplyTargetIndex)
          ];
        });

        return;
      }

      setPlacements((prev) => {
        const next = { ...prev };
        const currentSourceCell = prev[activeId];

        next[activeId] = overId;

        if (targetTile && targetTile !== activeId) {
          if (currentSourceCell) {
            next[targetTile] = currentSourceCell;
          } else {
            delete next[targetTile];
          }
        }

        return next;
      });

      setSupplyQueue((prevQueue) => {
        let queue = prevQueue.filter((id) => id !== activeId);

        if (targetTile && targetTile !== activeId && activeFromSupply) {
          queue = queue.filter((id) => id !== targetTile);
          queue = [...queue, targetTile];
        }

        return queue;
      });

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

  const textBoardSpan = textBoard ? textBoard.endCol - textBoard.startCol + 1 : 0;
  const boardMessage = isSolved
    ? textBoard?.solvedMessage ?? ''
    : textBoard?.defaultMessage ?? '';

  const columnSpan = Math.max(isMobile ? columnCount - 2 : columnCount, 1);
  const rowSpan = Math.max(rowCount, 1);
  const tileRenderSize = targetSize * pixelSize;

  const rootStyle = {
    width: `${columnSpan * tileRenderSize}px`,
    height: `${rowSpan * tileRenderSize}px`,
    gridTemplateColumns: `repeat(${columnSpan}, 1fr)`,
    gridTemplateRows: `repeat(${rowSpan}, 1fr)`
  };

  return (
    <div>
      <DndContext onDragEnd={handleDragEnd}>
        <div className={styles.root} style={rootStyle}>
          {gridLayout.map((row, rowIndex) =>
            row.map((_, colIndex) => {
              if (isMobile && (colIndex === 0 || colIndex === row.length - 1)) {
                return null;
              }

              const cellId = makeCellId(puzzleId, rowIndex, colIndex);

              const isTextBoardStart =
                !!textBoard &&
                rowIndex === textBoard.rowIndex &&
                colIndex === textBoard.startCol;
              const isWithinTextBoard =
                !!textBoard &&
                rowIndex === textBoard.rowIndex &&
                colIndex > textBoard.startCol &&
                colIndex <= textBoard.endCol;

              const isSupplyCell =
                isMobile && rowIndex === 0 && supplyCellIds.includes(cellId);
              const supplySlotIndex = isSupplyCell
                ? supplyCellIds.indexOf(cellId)
                : -1;

              if (isWithinTextBoard) {
                return null;
              }

              const isCentralCell =
                rowIndex > 0 &&
                rowIndex < gridLayout.length - 1 &&
                colIndex > 0 &&
                colIndex < row.length - 1;
              const occupantId = cellOccupants[cellId];
              const tilePixelsMatrix = occupantId ? tilePixels[occupantId] : null;
              const backgroundId = `${puzzleId}-bg-${cellId}`;
              const blackTileId = `${puzzleId}-black-${cellId}`;

              if (isTextBoardStart) {
                return (
                  <div
                    className={`${styles.cell} ${styles.textBoardCell}`}
                    key={cellId}
                    style={textBoardSpan ? { gridColumn: `span ${textBoardSpan}` } : undefined}
                  >
                    <TextBoard message={boardMessage} />
                  </div>
                );
              }

              return (
                <div
                  className={`${styles.cell} ${isSupplyCell ? styles.supplyCell : ''}`.trim()}
                  key={cellId}
                >
                  <TileDroppable id={cellId}>
                    <BackgroundPixels
                      componentId={backgroundId}
                      pixelSize={pixelSize}
                      targetSize={targetSize}
                    />
                    {isCentralCell ? (
                      <BlackTile
                        componentId={blackTileId}
                        pixelSize={pixelSize}
                        targetSize={targetSize}
                      />
                    ) : null}
                    {tilePixelsMatrix ? (
                      <TileDraggable
                        id={occupantId}
                        data={
                          isMobile
                            ? isSupplyCell
                              ? {
                                  sourceType: 'supply',
                                  slotIndex: supplySlotIndex,
                                  cellId
                                }
                              : {
                                  sourceType: 'board',
                                  cellId
                                }
                            : undefined
                        }
                      >
                        <PixelArtCanvas
                          componentId={`${puzzleId}-tile-${occupantId}`}
                          tilePixels={tilePixelsMatrix}
                          useMask={!isSolved}
                          pixelSize={pixelSize}
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
      <div
        style={{
          width: `${tileRenderSize}px`,
          height: `${tileRenderSize}px`,
          border: '4px solid red'
        }}
      ></div>
      {/* Debug purposes solve button */}
      <button
        type="button"
        onClick={handleSolve}
        disabled={isSolved}
        style={{
          marginTop: '16px',
          padding: '8px 12px',
          borderRadius: '8px',
          border: '2px solid #000',
          backgroundColor: '#000',
          color: '#000',
          textTransform: 'uppercase',
          letterSpacing: '0.08em',
          cursor: isSolved ? 'not-allowed' : 'pointer'
        }}
      >
        Solve
      </button>
      {/* Debug purposes solve button */}
    </div>
  );
};

export default Puzzle;
