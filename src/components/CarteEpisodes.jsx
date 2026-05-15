import React from 'react'

const CarteEpisodes = ({imgUrl ,title , number,onClick}) => {
  return (
        <div class="card " onClick={onClick} role ="regroupe info de episode  la carte ">
  <div class="card-image" role ="image de la carte">
    <figure class="image is-4by3">
      <img
        src={imgUrl}
        alt="Placeholder image"
      />
    </figure>
  </div>
  <div class="card-content" role ="contenue texte de l'episode de la carte">
    <p> {title}</p>
    <p> {number}</p>
  </div>
</div>
  )
}

export default CarteEpisodes
