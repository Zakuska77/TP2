import React from 'react'

const CarteActor = ({imgUrl ,name ,character}) => {
  return (
    <div class="card " role ="regroupe info de la carte ">
  <div class="card-image">
    <figure class="image is-4by3" role ="image actor de la carte">
      <img
        src={imgUrl}
        alt="Placeholder image"
      />
    </figure>
  </div>
  <div class="card-content" role ="contenue texte des acteur de la carte">
    <p> {name}</p>
    <p> {character}</p>
  </div>
</div>
  )
}

export default CarteActor
