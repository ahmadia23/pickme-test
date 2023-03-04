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
  const [showResults, setShowResults] = useState(false);
  const [showMyGifs, setShowMyGifs] = useState(false);
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
    const gifUrl = image.src;
    const gifId = image.id;
    try {
      const response = await fetch(
        `https://pickme-68b1a-default-rtdb.firebaseio.com/gifs/${gifId}.json`,
        {
          headers: { "Content-Type": "application/json" },
          method: "POST",
          body: JSON.stringify({
            gifUrl: gifUrl,
            theme: "",
            id: gifId,
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
        `https://pickme-68b1a-default-rtdb.firebaseio.com/gifs.json`
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        const resData = await response.json();
        const updatedMyGifs = [];
        for (let node in resData) {
          updatedMyGifs.push(resData[node]);
        }
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
        <img src={gif.images.downsized.url} alt={gif.title} id={gif.id}></img>
        <button className="save-button" onClick={postSavingGifs}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    );
  });

  const mySavedGifs = myGifs.map((gifData) => {
    const gifArray = Object.values(gifData);
    const gif = gifArray[0];
    return <SavedGifs {...gif} key={gif.id} id={gif.id} />;
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
