import React from 'react'

const CarteSeson = ({imgUrl ,number ,episodeCount,onClick})=> {
  return (
  <div 
    className="card" 
    onClick={onClick} 
    role="button" 
    tabIndex="0" 
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    aria-label={`Voir les épisodes de la saison ${number}`}
  >
    <div className="card-image">
      <figure className="image is-4by3">
        <img
          src={imgUrl}
          alt={`Couverture de la saison ${number}`}
        />
      </figure>
    </div>
    <div className="card-content">
      <p className="title is-5">Saison {number}</p>
      <p className="subtitle is-6">{episodeCount} épisodes</p>
    </div>
  </div>
);
}

export default CarteSeson
