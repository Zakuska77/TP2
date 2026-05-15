import React from 'react'

const CarteTvshow = ({imgUrl ,title , studio, genres,onClick}) => {
  return (
  <div 
    className="card" 
    onClick={onClick} 
    role="button" 
    tabIndex="0"
    onKeyDown={(e) => e.key === 'Enter' && onClick()}
    aria-label={`Voir les détails de ${title}`}
  >
    <div className="card-image">
      <figure className="image is-4by3">
        <img
          src={imgUrl}
          alt={`Affiche de la série ${title}`}
        />
      </figure>
    </div>
    <div className="card-content">
      <p className="has-text-weight-bold"> Titre : {title}</p>
      <p> Studio : {studio}</p>
      <p> Genres : {genres}</p>
    </div>
  </div>
)
}

export default CarteTvshow
