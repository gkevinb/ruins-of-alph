import Image from "next/image";
import PixelArtCanvas from "./pixel_art";
import BackgroundPixels from "./background_pixels";

export default function Home() {
  const pixelTileA1 = [
    "111111111111",
    "111111111111",
    "111112221111",
    "111222122222",
    "111211111222",
    "111212211222",
    "112212111112",
    "112111111111",
    "112111111111",
    "112212211111",
    "111222221211",
    "111222222222"
  ];

  const pixelTileB1 = [
    "111222222222",
    "111222222222",
    "111222122122",
    "111222111111",
    "111221111111",
    "111221111111",
    "111222111112",
    "111222111222",
    "111222222222",
    "111222222222",
    "111222222222",
    "111222222222"
  ];

  const pixelTileC1 = [
    "111222222222",
    "111222222222",
    "111222222222",
    "111222122222",
    "111221112222",
    "111221112222",
    "111211111222",
    "112211111222",
    "112111111122",
    "112111111122",
    "112221122222",
    "111221122222"
  ];

  const pixelTileD1 = [
    "111221112222",
    "111221112222",
    "111222111222",
    "111222111122",
    "111222211111",
    "111222221111",
    "111222222111",
    "111222222222",
    "111222222222",
    "111111111111",
    "111111111111",
    "111111111111"
  ];

  return (
    <div>
      <h1>Pixel Art</h1>
      <PixelArtCanvas tilePixels={pixelTileA1} useMask={true} />
      <PixelArtCanvas tilePixels={pixelTileB1} useMask={true} />
      <PixelArtCanvas tilePixels={pixelTileC1} useMask={true} />
      <PixelArtCanvas tilePixels={pixelTileD1} useMask={true} />
      {/* <PixelArtCanvas useMask={false} /> */}
      <BackgroundPixels />
    </div>
  );
}
