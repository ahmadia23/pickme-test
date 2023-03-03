import "./ResultsSection.css";

const ResultsSection = (props) => {
  return (
    <main className="search-results">
      <div className="results-infos">
        <h3 className="input-name">
          {props.results > 0 && props.onReload ? `"${props.inputName}"` : ""}
        </h3>
        <span>{props.results > 0 && props.onReload ? "- 10 results" : ""}</span>
      </div>
      <h1 className="results-title">Choose your favorite GIF</h1>
      <div className="gifs-results">{props.data}</div>
    </main>
  );
};

export default ResultsSection;
