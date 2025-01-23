import Image from "next/image";
import PixelArtCanvas from "./pixel_art";
import BackgroundPixels from "./background_pixels";

export default function Home() {
  return (
    <div>
      <h1>Pixel Art</h1>
      <PixelArtCanvas />
      <BackgroundPixels />
    </div>
  );
}
