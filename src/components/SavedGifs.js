import "./SavedGifs.css";
import { useState } from "react";

const SavedGifs = ({ gifUrl, theme, id }) => {
  const [formVisible, setFormVisible] = useState(false);
  const [newTheme, setNewTheme] = useState("");
  const [themeChosen, setThemeChosen] = useState(false);

  const InputHandler = (e) => {
    setThemeChosen(false);
    setNewTheme(e.target.value);
  };

  const addThemeHandler = () => {
    setFormVisible(true);
  };

  const formSubmitHandler = async (e) => {
    e.preventDefault();
    // Récupérer l'objet à mettre à jour dans la base de données
    console.log(newTheme);
    try {
      const getResponse = await fetch(
        `https://pickme-68b1a-default-rtdb.firebaseio.com/gifs/${id}.json`
      );
      const resData = await getResponse.json();
      // extraire le corps de la réponse sous forme d'objet JSON
      // Récupérer l'ID de l'objet à partir de la réponse
      const firebaseId = Object.keys(resData)[0]; // le premier objet dans la liste
      console.log(firebaseId);
      const putResponse =
        await // Envoyer une requête PUT pour mettre à jour l'objet dans la base de données
        fetch(
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
      if (!putResponse.ok) {
        throw new Error("Something went wrong");
      } else {
        setThemeChosen(true);
        setFormVisible(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="saved-gifs">
      {themeChosen ? <span>{newTheme}</span> : <span>{theme}</span>}
      <img src={gifUrl} className="giphy" alt="gif"></img>
      <br />
      {formVisible ? (
        ""
      ) : themeChosen ? (
        <button className="btn-theme" onClick={addThemeHandler}>
          Modifier le thème
        </button>
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
