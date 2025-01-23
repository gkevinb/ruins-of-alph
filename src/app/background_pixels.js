'use client'

import React, { useEffect } from "react";

const BackgroundPixels = () => {

  // Input: Compressed 8x8 pixel art
  const pixelArtCompressed = [
    "11101011",
    "12010112",
    "10101111",
    "11011111",
    "21111212",
    "11112121",
    "11111212",
    "12111111",
  ];

  // Function to duplicate the pixel art horizontally and vertically
  const tilePixelArt = (compressedArt, targetSize) => {
  const originalSize = compressedArt.length; // Assuming square grid
  const tiledArt = [];

  for (let i = 0; i < targetSize; i++) {
    const row = compressedArt[i % originalSize] // Repeat rows vertically
      .repeat(targetSize / originalSize); // Repeat horizontally
    tiledArt.push(row);
  }

  return tiledArt;
  };


  useEffect(() => {
    const targetSize = 192; // Target size 24x24
    const tiledPixelArt = tilePixelArt(pixelArtCompressed, targetSize);

    console.log("Tiled Pixel Art:");
    tiledPixelArt.forEach((row, rowIndex) => console.log(`Row ${rowIndex + 1}: ${row}`));

    // Canvas setup
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    const pixelSize = 10; // Size of each pixel
    canvas.width = tiledPixelArt[0].length * pixelSize;
    canvas.height = tiledPixelArt.length * pixelSize;
    document.body.appendChild(canvas);

    console.log("Canvas initialized with dimensions:", canvas.width, "x", canvas.height);

    // Draw the expanded pixel art
    tiledPixelArt.forEach((row, rowIndex) => {
      row.split("").forEach((pixel, colIndex) => {
        console.log(`Drawing pixel at row ${rowIndex + 1}, col ${colIndex + 1}: ${pixel}`);
        if(pixel === "0"){
          ctx.fillStyle = "#f9f9f9";
        }
        if(pixel === "1"){
          ctx.fillStyle = "#c19f57";
        }
        if(pixel === "2"){
          ctx.fillStyle = "#8f6858";
        }
        // ctx.fillStyle = pixel === "1" ? "#ababac" : "#fff000"; // Black for 1, white for 0
        ctx.fillRect(
          colIndex * pixelSize,
          rowIndex * pixelSize,
          pixelSize,
          pixelSize
        );
      });
    });

    console.log("Pixel art drawn successfully.");
  }, []);

  return null;
};

export default BackgroundPixels;
