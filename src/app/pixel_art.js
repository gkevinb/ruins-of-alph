'use client'

import React, { useEffect } from "react";

const PixelArtCanvas = ({ useMask, tilePixels, componentId }) => {
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

  // Input: Compressed 12x12 pixel art
  // const pixelArtCompressed = [
  //   "221222122212",
  //   "221222122212",
  //   "111211121112",
  //   "221222122212",
  //   "221222122212",
  //   "111211121112",
  //   "221222122212",
  //   "221222122212",
  //   "111211121112",
  //   "221222122212",
  //   "221222122212",
  //   "111211121112"
  // ];

  // Function to expand a compressed pixel art
  const expandPixelArt = (compressedArt, scale) => {
    const expandedArt = [];

    compressedArt.forEach((row, rowIndex) => {
      // Expand each row horizontally
      const expandedRow = row
        .split("")
        .map((char, colIndex) => {
          return char.repeat(scale);
        }) // Repeat each character horizontally
        .join("");

      // Repeat the expanded row vertically
      for (let i = 0; i < scale; i++) {
        expandedArt.push(expandedRow);
      }
    });

    return expandedArt;
  };

  // Function to apply mask to expanded pixel art
  const applyMask = (expandedArt, mask) => {
    return expandedArt.map((row, rowIndex) => {
      return row
        .split("")
        .map((char, colIndex) => {
          const maskValue = mask[rowIndex][colIndex];
          if (maskValue === "1") {
            return "3"; // Replace only if mask is 1
          } else {
            return char; // Keep original value if mask is 0
          }
        })
        .join("");
    });
  };

  useEffect(() => {
    console.log("Starting pixel art expansion...");
    const scale = 2;
    const pixelArtExpanded = expandPixelArt(tilePixels, scale);
    console.log("Pixel art expanded successfully.");

    // Output the expanded pixel art
    console.log("Expanded Pixel Art:");
    pixelArtExpanded.forEach((row, rowIndex) => console.log(`Row ${rowIndex + 1}: ${row}`));

    const finalPixelArt = useMask ? applyMask(pixelArtExpanded, mask) : pixelArtExpanded;

    // const maskedPixelArt = applyMask(pixelArtExpanded, mask);
    console.log("Masked Pixel Art:");
    finalPixelArt.forEach((row, rowIndex) => console.log(`Row ${rowIndex + 1}: ${row}`));

    // Canvas setup
    const canvas = document.createElement("canvas");
    // canvas.classList.add("grid-item");
    const container = document.getElementById(componentId);
    if (container) {
      // container.innerHTML = ""; // Clear any existing content
      container.appendChild(canvas);
    }

    const ctx = canvas.getContext("2d");
    const pixelSize = 10; // Size of each pixel
    canvas.width = finalPixelArt[0].length * pixelSize;
    canvas.height = finalPixelArt.length * pixelSize;

    // const container = document.getElementById("grid-container");
    // if (container) {
    //   container.appendChild(canvas);
    // }
    // document.body.appendChild(canvas);

    console.log("Canvas initialized with dimensions:", canvas.width, "x", canvas.height);

    // Draw the expanded pixel art
    finalPixelArt.forEach((row, rowIndex) => {
      row.split("").forEach((pixel, colIndex) => {
        // console.log(`Drawing pixel at row ${rowIndex + 1}, col ${colIndex + 1}: ${pixel}`);
        if(pixel === "1"){
          ctx.fillStyle = "#c19f57";
        }
        if(pixel === "2"){
          ctx.fillStyle = "#8f6858";
        }
        if(pixel === "3"){
          ctx.fillStyle = "#000000";
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
  }, [useMask, tilePixels, componentId]);

  return <div id={componentId}></div>;
};

export default PixelArtCanvas;
