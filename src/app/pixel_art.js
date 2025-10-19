'use client'

import React, { useEffect } from "react";
import styles from "./pixel_art.module.css";

const PixelArtCanvas = ({ useMask, tilePixels, componentId, pixelSize = 5 }) => {
  const mask = [
    "111111111111111111111111",
    "111000011110000000000111",
    "110000000000000000000011",
    "100000000000000000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "110000000000000000000001",
    "110000000000000000000001",
    "110000000000000000000001",
    "110000000000000000000001",
    "110000000000000000000001",
    "100000000000000000000001",
    "100000000000000000000011",
    "100000000000000000000011",
    "100000000000000000000011",
    "100000000000000000000011",
    "100000000000000000000001",
    "100000000000000000000001",
    "100000000000000000000001",
    "110000000000000000000001",
    "111000000000011111000011",
    "111111111111111111111111",
  ];

  const expandPixelArt = (compressedArt, scale) => {
    const expandedArt = [];

    compressedArt.forEach((row) => {
      const expandedRow = row
        .split("")
        .map((char) => {
          return char.repeat(scale);
        })
        .join("");

      for (let i = 0; i < scale; i++) {
        expandedArt.push(expandedRow);
      }
    });

    return expandedArt;
  };

  const applyMask = (expandedArt, mask) => {
    return expandedArt.map((row, rowIndex) => {
      return row
        .split("")
        .map((char, colIndex) => {
          const maskValue = mask[rowIndex][colIndex];
          if (maskValue === "1") {
            return "3";
          } else {
            return char;
          }
        })
        .join("");
    });
  };

  useEffect(() => {
    if (!componentId) {
      return;
    }

    const scale = 2;
    const pixelArtExpanded = expandPixelArt(tilePixels, scale);
    const finalPixelArt = useMask ? applyMask(pixelArtExpanded, mask) : pixelArtExpanded;

    const canvas = document.createElement("canvas");
    const container = document.getElementById(componentId);

    if (!container) {
      return;
    }

    const ctx = canvas.getContext("2d");
    canvas.width = finalPixelArt[0].length * pixelSize;
    canvas.height = finalPixelArt.length * pixelSize;

    container.replaceChildren(canvas);

    finalPixelArt.forEach((row, rowIndex) => {
      row.split("").forEach((pixel, colIndex) => {
        if (pixel === "1") {
          ctx.fillStyle = "#c19f57";
        }
        if (pixel === "2") {
          ctx.fillStyle = "#8f6858";
        }
        if (pixel === "3") {
          ctx.fillStyle = "#000000";
        }

        ctx.fillRect(
          colIndex * pixelSize,
          rowIndex * pixelSize,
          pixelSize,
          pixelSize
        );
      });
    });
  }, [useMask, tilePixels, componentId, pixelSize]);

  const classes = ['canvas-cell', styles.container].join(' ');

  return <div id={componentId} className={classes}></div>;
};

export default PixelArtCanvas;
