import React from "react";

const CarteHistorique = ({ imgUrl,tvshowTitle,episodeTitle,seasonNumber,Detail,onClick,versEpisode,}) => {
  return (
    <div className="card" role="article">
      <div className="card-image">
        <figure className="image is-4by3">
          <img
            src={imgUrl}
            alt={`Relancer l'épisode : ${episodeTitle}`}
            onClick={onClick}
            style={{ cursor: "pointer" }}
            role="button"
            tabIndex="0"
          />
        </figure>
      </div>
      <div className="card-content">
        <p
          className="title is-4 mb-4"
          style={{ cursor: "pointer" }}
          onClick={Detail}
          role="link"
          tabIndex="0"
        >
          {tvshowTitle}
        </p>

        <div className="buttons">
          <button
            className="button is-link is-light is-fullwidth"
            onClick={versEpisode}
            aria-label={`Voir tous les épisodes de la saison ${seasonNumber}`}
          >
            Saison : {seasonNumber}
          </button>

          <button
            className="button is-info is-fullwidth"
            onClick={onClick}
            aria-label={`Relancer l'épisode nommé ${episodeTitle}`}
          >
            {episodeTitle}
          </button>
        </div>
      </div>
    </div>
  );
};

export default CarteHistorique;
