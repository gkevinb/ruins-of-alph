# AGENTS

## Overview
- Next.js 14 client-side screen renders a 6×6 Ruins of Alph canvas grid with draggable glyph tiles.
- Central 16 tiles start in the middle ring while every cell hosts a droppable, textured background canvas.
- `@dnd-kit/core` powers drag/drop so glyph tiles can be rearranged anywhere on the board with automatic position swapping.

## Environment Agent
- File: `src/app/layout.js`
- Loads Geist fonts, applies the global stylesheet, and exposes the `<body>` shell for grid content.

## Grid Conductor
- File: `src/app/page.js`
- Marks the module as client-side, seeds tile placement state for all 36 cells, and renders a `DndContext` around the grid.
- Computes the occupant map (`placements`) so each droppable knows which glyph to show and performs swap logic when a tile drops onto an occupied cell.
- Renders a background canvas in every slot and conditionally overlays a draggable glyph using tile-specific IDs for canvas mounting.

## Pixel Art Agent
- File: `src/app/pixel_art.js`
- Expands compact 12×12 strings to 24×24 by duplicating rows/columns and optionally masks value `1` to `3` for the black void effect.
- Replaces the contents of the target container with a canvas scaled by `pixelSize` (default 5px) and paints using the 1→#c19f57, 2→#8f6858, 3→#000000 palette.
- Returns a `.canvas-foreground` wrapper so draggable logic can layer it above the background drop target.

## Background Fabric Agent
- File: `src/app/background_pixels.js`
- Tiles an 8×8 texture out to 24×24 and draws it into the provided `componentId`, sharing the palette plus value `0` for #f9f9f9.
- Exposes a `.canvas-background` container that fills its cell beneath draggable glyph canvases.

## Interaction Agents
- File: `src/app/TileDroppable.js`
  - Wraps `useDroppable` to register each grid cell as a drop zone, toggling an outline while a tile hovers.
- File: `src/app/TileDraggable.js`
  - Wraps `useDraggable` to translate glyph canvases via CSS transforms and toggles grab/grabbing cursors.
- Drag/drop utilities coexist with the legacy `Block/Draggable/Droppable` prototypes for future experimentation.

## Styling Agent
- File: `src/app/globals.css`
- Configures the `.grid-container` as 6 columns × 6 rows (720px square) and centres contents.
- Adds layered classes so `.canvas-background` pins to the cell floor, `.canvas-foreground` floats above, and `.tile-*` classes manage outlines, cursors, and stacking during interaction.

## Extension Hooks
- Extend the tile map in `page.js` or adjust `pixelSize` to scale output without modifying source matrices.
- Introduce additional drop behaviours (e.g., snapping rules, validation) by extending the `handleDragEnd` logic.
- Replace perimeter backgrounds with other agent types by reusing the droppable wiring and component IDs.
