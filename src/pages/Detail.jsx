import React, { useEffect , useState } from 'react'
import { useParams } from 'react-router-dom';
import CarteSeson from '../components/CarteSeson';
import CarteActor from '../components/CarteActor';
import { useNavigate } from 'react-router-dom';

const Detail = () => {

  const [tvshow, setTvshow] = useState("");

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    async function getTvshow() {
      const reps = await fetch(`https://tvshowdbapi.herokuapp.com/tvshow?tvshowId=${params.tvshowId}`);
      if (reps.ok) {
        const tvshow = await reps.json();
        setTvshow(tvshow);
      }
    }
    getTvshow();
  }, []);

return (
  <div className="box mt-4" role="main">
    {/* info tvshow  */}
    <section className="columns">
      <div className="column is-one-third">
        <img 
          className="image is-square ml-4" 
          src={tvshow.imgUrl} 
          alt={`Affiche de ${tvshow.title}`} 
        />
      </div>
      <div className="column ml-4">
        <h1 className="title">{tvshow.title}</h1>
        <p><strong>Year :</strong> {tvshow.year}</p>
        <p><strong>Episodes :</strong> {tvshow.episodeCount}</p>
        <p className="mt-4">{tvshow.tvParentalGuideline}</p>
        <p><strong>Genres :</strong> {tvshow.genres?.map((genre) => genre.name).join(", ")}</p>
        <p><strong>Studio :</strong> {tvshow.studio?.name}</p>
        <p className="mt-4">{tvshow.plot}</p>
        
        <div className="mt-4">
          <audio 
            src={tvshow.audioUrl} 
            controls 
            autoPlay 
            aria-label={`Thème sonore de ${tvshow.title}`}
            style={{ width: '100%' }}
          >
            Votre navigateur ne supporte pas l'élément audio.
          </audio> 
        </div>
      </div>
    </section>

    <hr />

    {/* scroll acteurs*/}
   
    <div 
      className="is-flex" 
      style={{ 
        overflowX: 'auto', 
        whiteSpace: 'nowrap', 
        paddingBottom: '10px',
        gap: '10px'
      }}
      role="list"
      aria-label="Liste des acteurs"
    >
      {tvshow.roles?.map((role, index) => (
        <div 
          key={index}
          className="column is-one-fifth-desktop is-one-third-tablet is-three-quarters-mobile" 
          role="listitem"
          style={{ flex: '0 0 auto' }} 
        >
          <CarteActor 
            name={role.name}
            character={role?.character}
            imgUrl={role?.imgUrl}
          />
        </div>
      ))}
    </div>

    <hr />

    {/* carte Saisons */}
    
    <div className="container p-4">
      <div className="columns is-multiline" role="list" aria-label="Liste des saisons">
        {tvshow.seasons?.map((season) => (
          <div 
            className="column is-one-quarter" 
            key={season.seasonId} 
            role="listitem"
          >
            <CarteSeson
              imgUrl={season.imgUrl}
              number={season?.number}
              episodeCount={season?.episodeCount}
              onClick={() => navigate(`/episodes/${season.seasonId}`)}
            />
          </div>
        ))}
      </div>
    </div>
  </div>
);
}

export default Detail
