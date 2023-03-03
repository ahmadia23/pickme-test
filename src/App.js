import Header from "./layouts/Header";
import SearchTool from "./components/SearchTool";
import ResultsSection from "./components/ResultsSection";
import { useEffect, useState } from "react";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import SavedGifs from "./components/SavedGifs";
import GifsList from "./components/GifsList";

function App() {
  const [userInput, setUserInput] = useState("");
  const [gifs, setGifs] = useState([]);
  const [gifsData, setGifsData] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showMyGifs, setShowMyGifs] = useState(false);
  const [gifUrl, setGifUrl] = useState("");
  const [myGifs, setMyGifs] = useState([]);

  const userInputHandler = (e) => {
    setUserInput(e);
    setShowResults(false);
  };

  const returnToSearch = () => {
    setShowMyGifs(false);
  };

  const postSavingGifs = async (e) => {
    const gifCard = e.target.closest(".gif-card");
    const image = gifCard.firstChild;
    const imageUrl = image.src;
    const imageId = image.id;
    setGifUrl(imageUrl);
    try {
      const response = await fetch(
        "https://pickme-68b1a-default-rtdb.firebaseio.com/gifs.json",
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            gifUrl: imageUrl,
            theme: "",
            id: imageId,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        alert("success!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMygifsHandler = async () => {
    setShowMyGifs(true);
    try {
      const response = await fetch(
        "https://pickme-68b1a-default-rtdb.firebaseio.com/gifs.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        const resData = await response.json();
        const updatedDataGifs = [...resData];
        const updatedMyGifs = [...myGifs];
        for (let node in resData) {
          if (!myGifs.includes(node)) {
            updatedMyGifs.push(resData[node]);
          }
        }
        setGifsData(updatedDataGifs);
        setMyGifs(updatedMyGifs);
        setShowResults(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${"tyB9wrVm8Wgfb9s2kmeM6L96LrKDWa4b"}&q=${userInput}&limit=10&offset=0&rating=g&lang=fr`
      );
      const resData = await response.json();
      setGifs(resData.data);
      setShowResults(true);
    } catch (error) {
      console.log(error);
    }
  };

  const results = gifs.map((gif) => {
    return (
      <div key={gif.id} className="gif-card">
        <img src={gif.images.downsized.url} alt={gif.title} id={gif}></img>
        <button className="save-button" onClick={postSavingGifs}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    );
  });

  const mySavedGifs = Object.keys(gifsData).map((gif) => {
    console.log(myGifs);
    console.log(Object.keys(myGifs));
    const gifObject = myGifs[gif];
    return <SavedGifs {...gifObject} key={gifObject.id} id={gif} />;
  });

  return (
    <div className="container">
      <Header
        onClick={toggleMygifsHandler}
        showButton={!showMyGifs}
        onReturn={returnToSearch}
      />
      {showMyGifs ? (
        ""
      ) : (
        <SearchTool
          onChange={userInputHandler}
          onSubmit={formSubmitHandler}
          value={userInput}
        />
      )}
      {showResults ? (
        <ResultsSection
          data={results}
          inputName={userInput}
          results={gifs.length}
          onReload={showResults}
        />
      ) : (
        ""
      )}
      {showMyGifs ? <GifsList> {mySavedGifs} </GifsList> : ""}
    </div>
  );
}

export default App;
