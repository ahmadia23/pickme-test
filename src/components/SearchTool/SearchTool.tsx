import React from "react";
import ReactSearchBox from "react-search-box";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "./SearchTool.css";

const FIREBASEKEY = process.env.REACT_APP_FIREBASE_KEY;

type Props = {
  setGifs: React.Dispatch<React.SetStateAction<[]>>;
  setShowResults: (state:boolean) => void;
  sendInput: (input: string) => void;
}


const SearchTool: React.FC<Props> = (props) => {
  const [userInput, setUserInput] = React.useState<string>("");

  const userInputHandler = (e: string) => {
    setUserInput(e);
    props.setShowResults(false);
  };

  const formSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://api.giphy.com/v1/gifs/search?api_key=${FIREBASEKEY}&q=${userInput}&limit=10&offset=0&rating=g&lang=fr`
      );
      const resData = await response.json();
      props.setGifs(resData.data);
      props.setShowResults(true);
      props.sendInput(userInput);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section>
      <form onSubmit={formSubmitHandler} className="search-tool">
        <div className="search-bar">
          <ReactSearchBox
            placeholder="Search all the GIFs"
            onChange={userInputHandler}
            data={[]}
            onSelect={()=>{}}
          />
        </div>
        <button className="search-button">
          <FontAwesomeIcon icon={faMagnifyingGlass}></FontAwesomeIcon>
        </button>
      </form>
    </section>
  );
};

export default SearchTool;
