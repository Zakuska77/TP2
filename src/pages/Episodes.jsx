import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import CarteEpisodes from '../components/CarteEpisodes';
import { useNavigate } from 'react-router-dom';
import Pagination from '../components/Pagination';
const Episodes = () => {
 
  const [episodesData, setEpisodesData] = useState({episodes: []})
  const params = useParams();
  const navigate = useNavigate();


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); 
       const indexOfLastItem = currentPage * itemsPerPage;
       const indexOfFirstItem = indexOfLastItem - itemsPerPage;
       const currentItems = episodesData.episodes.slice(indexOfFirstItem, indexOfLastItem);



  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); 
  };

  useEffect(() => {
    async function getEpisodes() {
      try {
        const reps = await fetch(`https://tvshowdbapi.herokuapp.com/episodes?seasonId=${params.seasonId}`);
        if (reps.ok) {
          const data = await reps.json();
          setEpisodesData(data);
        }
      } catch (error) {
        console.error("Failed to fetch episodes:", error);
      }
    }
    getEpisodes();
  }, [params.seasonId]); 

  if (!episodesData) {
    return <div className="container p-4"role ="laoding helper ">Loading episodes...</div>;
  }

 useEffect(() => {
  setCurrentPage(1);
}, [episodesData.episodes.length]);

 return (
  <div className="container p-4">
    <header className="has-text-centered mt-4 mb-6">
      <h1 className="title">{episodesData.tvshowTitle}</h1>
      <p className="subtitle">Season {episodesData.seasonNumber}</p>
    </header>

    <div className="container p-4">
      <div className="columns is-multiline" role="list">
        
        {currentItems.map((e) => (
          <div 
            className="column is-3" 
            key={e.episodeId} 
            role="listitem" 
          > 
            <CarteEpisodes
              imgUrl={e?.imgUrl}
              title={e?.title}
              number={e?.number}
              onClick={() => navigate(`/play/${e.episodeId}`)}
            />
          </div>
        ))}
      </div>
    </div>

    <Pagination 
      totalItems={episodesData.episodes.length}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onNbParPage={setItemsPerPage}
    />
  </div>
);
};

export default Episodes;