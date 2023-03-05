import "./ResultsSection.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { fetchPostSaving } from "../../util/fetchHelpers";
import { ErrorResponse } from "../../util/fetchHelpers";

const ResultsSection = ({ gifs, results, onReload, inputName }) => {
  const postSavingGifs = async (e) => {
    const gifCard = e.target.closest(".gif-card");
    const image = gifCard.firstChild;
    const gifUrl = image.src;
    const gifId = image.id;
    try {
      const response = await fetchPostSaving(gifId, gifUrl);
      if (!response.ok) {
        ErrorResponse(response);
      } else {
        alert("success!");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const gifsResults = gifs.map((gif) => {
    return (
      <div key={gif.id} className="gif-card">
        <img src={gif.images.downsized.url} alt={gif.title} id={gif.id}></img>
        <button className="save-button" onClick={postSavingGifs}>
          <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
    );
  });

  return (
    <main className="search-results">
      <div className="results-infos">
        <h3 className="input-name">{onReload && `"${inputName}"`}</h3>
        <span>{results > 0 && onReload && `- ${results} results`}</span>
      </div>
      {results === 0 ? (
        <h1 className="results-title">No Gifs was found</h1>
      ) : (
        <h1 className="results-title">Choose your favorite GIF</h1>
      )}
      <div className="gifs-results">{gifsResults}</div>
    </main>
  );
};

export default ResultsSection;
