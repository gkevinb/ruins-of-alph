import Image from "next/image";
import PixelArtCanvas from "./pixel_art";
import BackgroundPixels from "./background_pixels";
import Block from "./Block";

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

  const pixelTileA2 = [
    "111111111111",
    "111111111111",
    "111111111122",
    "222222222221",
    "222222221111",
    "221111111111",
    "221111111112",
    "211122221122",
    "112221211122",
    "112221211122",
    "111222211122",
    "111111111211"
  ];

  const pixelTileB2 = [
    "221112211211",
    "122222111211",
    "111111111211",
    "111111111211",
    "111221122211",
    "222222221111",
    "222222211111",
    "222222211111",
    "222222111112",
    "222221111112",
    "222221111111",
    "222211111111"
  ];

  const pixelTileC2 = [
    "222211111111",
    "222211111111",
    "222211111211",
    "222221122211",
    "222221221111",
    "222222211111",
    "222222111111",
    "222222111112",
    "222222111112",
    "222222211111",
    "222222222111",
    "222222222211"
  ];

  const pixelTileD2 = [
    "222222211111",
    "222221111111",
    "222211111111",
    "222211222222",
    "122222222222",
    "111122222222",
    "111111111111",
    "111111111111",
    "221111111111",
    "122222211111",
    "111111222222",
    "111111111111"
  ];

  const pixelTileA3 = [
    "111111111111",
    "111111111111",
    "221111111111",
    "122222222222",
    "121122222211",
    "221112221112",
    "222112111222",
    "222222112211",
    "221121122111",
    "221221121111",
    "222211221111",
    "222211221111"
  ];

  const pixelTileA4 = [
    "111111111111",
    "111111111111",
    "222222221111",
    "211111122111",
    "112222222111",
    "222111222111",
    "111122222211",
    "111221111211",
    "111211112211",
    "112211122111",
    "112111122111",
    "112111222111"
  ];

  const pixelTileB3 = [
    "222211211111",
    "222211211111",
    "222211211111",
    "222211211111",
    "122211222211",
    "122211211222",
    "122112211111",
    "221122111111",
    "211221111122",
    "112211111221",
    "122111112211",
    "121111122111"
  ];

  const pixelTileB4 = [
    "112111222111",
    "112111222111",
    "112211222111",
    "111211222111",
    "111211222111",
    "221211222111",
    "122211222111",
    "221112222111",
    "111112222111",
    "111112222111",
    "111222222111",
    "122222222111"
  ];

  const pixelTileC3 = [
    "122111122112",
    "112221222222",
    "111122211122",
    "111111111111",
    "111111111111",
    "111112111111",
    "111122111111",
    "211121111111",
    "222221111111",
    "222111111111",
    "122222222211",
    "122222222222"
  ];

  const pixelTileC4 = [
    "222222222111",
    "222222222111",
    "222222222111",
    "222222222111",
    "111222222111",
    "111112222111",
    "111111222111",
    "111111122111",
    "111111122111",
    "111111112111",
    "111111112111",
    "111111112111"
  ];

  const pixelTileD3 = [
    "111222222222",
    "111122222222",
    "221122222222",
    "222222222222",
    "222222222111",
    "222211111111",
    "111111111111",
    "111111111111",
    "111111111111",
    "111111112222",
    "222222222111",
    "111111111111"
  ];

  const pixelTileD4 = [
    "211111112111",
    "211111112111",
    "211111112111",
    "111111112111",
    "111111122111",
    "111111122111",
    "111111222111",
    "111122222111",
    "122222222111",
    "221111111111",
    "111111111111",
    "111111111111"
  ];


  return (
    <div>
      <h1>Pixel Art</h1>
      <div className="grid-container">
        {/* <div className="grid-item"><PixelArtCanvas tilePixels={pixelTileA1} useMask={true} /></div>
        <div className="grid-item"><PixelArtCanvas tilePixels={pixelTileB1} useMask={true} /></div>
        <div className="grid-item"><PixelArtCanvas tilePixels={pixelTileC1} useMask={true} /></div>
        <div className="grid-item"><PixelArtCanvas tilePixels={pixelTileD1} useMask={true} /></div>
        <div className="grid-item"><PixelArtCanvas tilePixels={pixelTileA2} useMask={true} /></div>
        <div className="grid-item"><PixelArtCanvas tilePixels={pixelTileB2} useMask={true} /></div>
        <div className="grid-item"><PixelArtCanvas tilePixels={pixelTileC2} useMask={true} /></div>
        <div className="grid-item"><PixelArtCanvas tilePixels={pixelTileD2} useMask={true} /></div> */}

        <PixelArtCanvas componentId={"A1"} tilePixels={pixelTileA1} useMask={true} />
        <PixelArtCanvas componentId={"A2"} tilePixels={pixelTileA2} useMask={true} />
        <PixelArtCanvas componentId={"A3"} tilePixels={pixelTileA3} useMask={true} />
        <PixelArtCanvas componentId={"A4"} tilePixels={pixelTileA4} useMask={true} />
        <PixelArtCanvas componentId={"B1"} tilePixels={pixelTileB1} useMask={true} />
        <PixelArtCanvas componentId={"B2"} tilePixels={pixelTileB2} useMask={true} />
        <PixelArtCanvas componentId={"B3"} tilePixels={pixelTileB3} useMask={true} />
        <PixelArtCanvas componentId={"B4"} tilePixels={pixelTileB4} useMask={true} />
        <PixelArtCanvas componentId={"C1"} tilePixels={pixelTileC1} useMask={true} />
        <PixelArtCanvas componentId={"C2"} tilePixels={pixelTileC2} useMask={true} />
        <PixelArtCanvas componentId={"C3"} tilePixels={pixelTileC3} useMask={true} />
        <PixelArtCanvas componentId={"C4"} tilePixels={pixelTileC4} useMask={true} />
        <PixelArtCanvas componentId={"D1"} tilePixels={pixelTileD1} useMask={true} />
        <PixelArtCanvas componentId={"D2"} tilePixels={pixelTileD2} useMask={true} />
        <PixelArtCanvas componentId={"D3"} tilePixels={pixelTileD3} useMask={true} />
        <PixelArtCanvas componentId={"D4"} tilePixels={pixelTileD4} useMask={true} />

      </div>
      {/* <PixelArtCanvas useMask={false} /> */}
      <BackgroundPixels />

      <Block />
    </div>
  );
}
