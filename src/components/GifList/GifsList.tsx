import "./GifsList.css";
import SavedGifs from "../SavedGifs/SavedGifs";
<<<<<<< HEAD
import { Fragment, useEffect, useState } from "react";
=======
import { useEffect, useState } from "react";
>>>>>>> 38d6cf69b1d98a120a849715473d81d2d25a6171
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

<<<<<<< HEAD
  return(
  <Fragment>
    <h2 className="mygifs-title"> My favorite gifs</h2>
      <div className="gif__save-cards">
        {myGifsList}
      </div>;
  </Fragment>)
=======
  return <div className="gif__save-cards">{myGifsList}</div>;
>>>>>>> 38d6cf69b1d98a120a849715473d81d2d25a6171
};

export default GifsList;
