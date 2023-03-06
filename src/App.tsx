import Header from "./layouts/Header";
import SearchTool from "./components/SearchTool/SearchTool";
import ResultsSection from "./components/ResultsSection/ResultsSection";
import { useState } from "react";
import GifsList from "./components/GifList/GifsList";
import { fetchMyGifs } from "./utils/fetchHelpers";
import { Gif, myGif } from './types/gifs';




function App() {
  const [userInput, setUserInput] = useState("");
  const [gifs, setGifs] = useState<Gif[]>();
  const [showResults, setShowResults] = useState(false);
  const [showMyGifs, setShowMyGifs] = useState(false);
  const [myGifs, setMyGifs] = useState<{gif: myGif}[]>([]);

  const inputNameHandler = (name: string) => {
    setUserInput(name);
  };

  const returnToSearch = () => {
    setShowMyGifs(false);
  };

  const toggleMygifsHandler = async () => {
    setShowMyGifs(true);
    try {
      const updatedMyGifs = await fetchMyGifs();
      setMyGifs(updatedMyGifs);
      setShowResults(false);
    } catch (error) {
      console.log(error);
    }
  };

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
          setGifs={setGifs}
          setShowResults={setShowResults}
          sendInput={inputNameHandler}

        />
      )}
      {showResults && (
        <ResultsSection
          gifs={gifs}
          inputName={userInput}
          results={gifs.length}
          onReload={showResults}
        />
      )}
      {showMyGifs ? <GifsList myGifs={myGifs}></GifsList> : ""}
    </div>
  );
}

export default App;
