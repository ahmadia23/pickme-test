import "./SavedGifs.css";
import { useState } from "react";

const SavedGifs = ({ gifUrl, theme, id }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [newTheme, setNewTheme] = useState("");

  const InputHandler = (e) => {
    setNewTheme(e.target.value);
  };

  const addThemeHandler = () => {
    setFormVisible(true);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    console.log(newTheme);
    try {
      const response = await fetch(
        `https://pickme-68b1a-default-rtdb.firebaseio.com/gifs/${id}.json`,
        {
          headers: { "Content-Type": "application/json" },
          method: "PUT",
          body: JSON.stringify({
            theme: newTheme,
          }),
        }
      );
      if (!response.ok) {
        throw new Error("Something went wrong");
      } else {
        alert("success!");
        setFormVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="saved-gifs">
      <span>{theme}</span>
      <img src={gifUrl} className="giphy" alt="gif"></img>
      <br />
      {formVisible ? (
        ""
      ) : (
        <button className="btn-theme" onClick={addThemeHandler}>
          Ajouter un thème
        </button>
      )}
      {formVisible ? (
        <form className="theme-form" onSubmit={formSubmitHandler}>
          <input
            type="text"
            className="input-group"
            onChange={InputHandler}
          ></input>
          <button className="btn-confirm">Confirmer</button>
        </form>
      ) : (
        ""
      )}
    </div>
  );
};

export default SavedGifs;
