import "./GifsList.css";
import SavedGifs from "../SavedGifs/SavedGifs";
import { Fragment, useEffect, useState } from "react";
import { myGif } from '../../types/gifs';


type Props = {
  myGifs: {gif: myGif}[]
}


const GifsList: React.FC<Props>  = ({ myGifs }) => {
  const [myGifsList, setMyGifsList] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const gifList = myGifs.map((gifData) => {
      const gifArray = Object.values(gifData);
      const gif = gifArray[0];
      return <SavedGifs key={gif.id} id={gif.id} gifUrl={gif.gifUrl} theme={gif.theme} />;
    });
    setMyGifsList(gifList);
  }, [myGifs]);

  return(
  <Fragment>
    <h2 className="mygifs-title"> My favorite gifs</h2>
      <div className="gif__save-cards">
        {myGifsList}
      </div>;
  </Fragment>)

};

export default GifsList;
