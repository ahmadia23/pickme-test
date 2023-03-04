import "./Header.css";

const Header = (props) => {
  return (
    <header className="header-app">
      <h1 className="title">Bienvenu sur Gifi World</h1>
      <span className="subtitle">
        Trouvez et enregistrez vos gifs préférés en un instant avec notre
        bibliothèque de gifs !
      </span>
      <br />
      {props.showButton ? (
        <button className="savings-button" onClick={props.onClick}>
          Mes Gifs Favoris
        </button>
      ) : (
        <button className="btn-back" onClick={props.onReturn}>
          Revenir à la recherche
        </button>
      )}
    </header>
  );
};

export default Header;
