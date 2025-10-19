# AGENTS

## Overview
- Next.js 14 client-side screen renders a 6×6 Ruins of Alph canvas grid with draggable glyph tiles.
- Central 16 tiles start in the middle ring while every cell hosts a droppable, textured background canvas.
- `@dnd-kit/core` powers drag/drop so glyph tiles can be rearranged anywhere on the board with automatic position swapping.

## Environment Agent
- File: `src/app/layout.js`
- Loads Geist fonts, applies the global stylesheet, and exposes the `<body>` shell for grid content.

## Grid Conductor
- Files: `src/app/page.js`, `src/app/page.module.css`
- Marks the module as client-side, seeds tile placement state for all 36 cells, and renders a `DndContext` around the grid.
- Computes the occupant map (`placements`) so each droppable knows which glyph to show and performs swap logic when a tile drops onto an occupied cell.
- Styles the 6×6 layout via the page CSS module, reserving the bottom-row centre (`TextBoard`) as a non-droppable display strip.

## Pixel Art Agent
- Files: `src/components/PixelArtCanvas/PixelArtCanvas.jsx`, `src/components/PixelArtCanvas/PixelArtCanvas.module.css`
- Expands compact 12×12 strings to 24×24 by duplicating rows/columns and optionally masks value `1` to `3` for the black void effect.
- Replaces the contents of the target container with a canvas scaled by `pixelSize` (default 5px) and paints using the 1→#c19f57, 2→#8f6858, 3→#000000 palette.
- Applies a component-level CSS module to ensure the foreground canvas layers correctly above droppable targets.

## Background Fabric Agent
- Files: `src/components/BackgroundPixels/BackgroundPixels.jsx`, `src/components/BackgroundPixels/BackgroundPixels.module.css`
- Tiles an 8×8 texture out to 24×24 and draws it into the provided `componentId`, sharing the palette plus value `0` for #f9f9f9.
- Uses a CSS module to anchor each background canvas under any draggable content.

## Interaction Agents
- Files: `src/components/TileDroppable/TileDroppable.jsx`, `src/components/TileDroppable/TileDroppable.module.css`
  - Wraps `useDroppable` to register each grid cell as a drop zone, toggling an outline while a tile hovers.
- Files: `src/components/TileDraggable/TileDraggable.jsx`, `src/components/TileDraggable/TileDraggable.module.css`
  - Wraps `useDraggable` to translate glyph canvases via CSS transforms and toggles grab/grabbing cursors.
- Drag/drop utilities coexist with the legacy `Block/Draggable/Droppable` prototypes in `src/components` for future experimentation.

## Text Board Agent
- Files: `src/components/TextBoard/TextBoard.jsx`, `src/components/TextBoard/TextBoard.module.css`
- Occupies the four middle cells of the bottom row with a solid black panel encased by a thick black border and inset white trim, providing space for future text overlays.

## Styling Agent
- File: `src/styles/globals.css`
- Holds shared base rules (Tailwind resets, fonts, body colours) and the reusable `.canvas-cell` helper applied by multiple components.
- All component-specific styling now lives alongside its component in a CSS module to keep concerns isolated.

## Extension Hooks
- Extend the tile map in `page.js` or adjust `pixelSize` to scale output without modifying source matrices.
- Introduce additional drop behaviours (e.g., snapping rules, validation) by extending the `handleDragEnd` logic.
- Replace perimeter backgrounds with other agent types by reusing the droppable wiring and component IDs.
