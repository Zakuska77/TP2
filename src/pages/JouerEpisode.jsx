import React, { use } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../utils/Authcontexte";
import { useNavigate } from "react-router-dom";
const JouerEpisode = () => {
  const [video, setVideo] = useState(null);
  const parms = useParams();
  const { token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    async function getVideo() {
      const reps = await fetch(
        `https://tvshowdbapi.herokuapp.com/viewepisode?episodeId=${parms.episodeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (reps.ok) {
        const video = await reps.json();
        setVideo(video);
      }
    }
    getVideo();
  }, []);

  if (!token) {
    return(
      <div className="container p-4 mt-6 has-text-danger is-justify-content-center" role="alert non-authenticated">
  <h1 className="is-size-1  "> Vous dever etre connecter pour regarder cette video</h1>
  <div class="is-flex is-justify-content-center" role="button">
     <button class="button is-info " onClick={() => navigate("/login")}>Se Connecter </button>
     </div>
    </div>)
  }

 else if (!video) {
    return <div>Loading...</div>;
  }


  console.log(video);

  return (
  <section className="hero is-fullheight">
    <div className="hero-body">
      <div className="container">
        <div className="columns is-centered is-vcentered">
          <div className="column is-8"> {/* gérer la taille */}
            <div className="box p-0"> 
                
              {/* /partie de la video  */}
              <video 
                controls
                className="is-block" 
                style={{ width: '100%' }}
                aria-label={`Vidéo de l'épisode ${video.episodeId}`}>
                <source src={video.videoUrl} type="video/mp4" />
                Votre navigateur ne supporte pas la lecture de vidéos.
              </video>

               {/* // partie de la video */}
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
)
};

export default JouerEpisode;
