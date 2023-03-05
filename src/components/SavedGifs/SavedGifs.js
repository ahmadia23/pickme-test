import "./SavedGifs.css";
import { useState } from "react";

const SavedGifs = ({ gifUrl, theme, id }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [newTheme, setNewTheme] = useState("");
  const [themeChosen, setThemeChosen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const cursorHandler = () => {
    if (isLoading) {
      document.body.style.cursor = "progress";
    } else {
      document.body.style.cursor = "auto";
    }
  };

  const InputHandler = (e) => {
    setThemeChosen(false);
    setNewTheme(e.target.value);
  };

  const addThemeHandler = () => {
    setFormVisible(true);
  };

  const fetchExistingGif = async (firebaseId) => {
    // Envoyer une requête PUT pour mettre à jour l'objet dans la base de données
    const response = await fetch(
      `https://pickme-68b1a-default-rtdb.firebaseio.com/gifs/${id}/${firebaseId}.json`,
      {
        method: "PUT",
        body: JSON.stringify({
          gifUrl: gifUrl,
          theme: newTheme,
          id: id,
        }),
      }
    );
    return response;
  };

  const fetchFirebaseId = async () => {
    const getResponse = await fetch(
      `https://pickme-68b1a-default-rtdb.firebaseio.com/gifs/${id}.json`
    );
    // retrouver son id "firebase" généré automatiquement
    const resData = await getResponse.json();
    const firebaseId = Object.keys(resData)[0];
    return firebaseId;
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // Récupérer l'objet à mettre à jour dans la base de données
    console.log(newTheme);
    setIsLoading(true);
    try {
      //retrouver le gif grâce à son premier noeud égale à l'id
      const firebaseId = await fetchFirebaseId();
      console.log(firebaseId);

      //faire une requête put directement sur les attributs de l'éléments
      const putResponse = await fetchExistingGif(firebaseId);
      if (!putResponse.ok) {
        throw new Error("Something went wrong");
      } else {
        setIsLoading(false);
        setThemeChosen(true);
        setFormVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="saved-gifs" onLoad={cursorHandler}>
      {themeChosen ? <span>{newTheme}</span> : <span>{theme}</span>}
      <img src={gifUrl} className="giphy" alt="gif"></img>
      <br />
      {formVisible ? (
        ""
      ) : (
        <button className="btn-theme" onClick={addThemeHandler}>
          Mettre un nouveau thème
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
