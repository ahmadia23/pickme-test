import "./Header.css";

const Header: React.FC<{showButton: boolean, onClick: () => void, onReturn: () => void }> = (props) => {
  return (
    <header className="header-app">
      <h1 className="title">Bienvenu sur Giphy World</h1>
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
