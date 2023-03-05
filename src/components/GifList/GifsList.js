import "./GifsList.css";
import SavedGifs from "../SavedGifs/SavedGifs";
import { useEffect, useState } from "react";

const GifsList = ({ myGifs }) => {
  const [myGifsList, setMyGifsList] = useState();

  useEffect(() => {
    const gifList = myGifs.map((gifData) => {
      const gifArray = Object.values(gifData);
      const gif = gifArray[0];
      return <SavedGifs {...gif} key={gif.id} id={gif.id} />;
    });
    setMyGifsList(gifList);
  }, [myGifs]);

  return <div className="gif__save-cards">{myGifsList}</div>;
};

export default GifsList;
