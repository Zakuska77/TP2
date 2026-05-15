import React from 'react'
import { useAuth } from '../utils/Authcontexte';
import { useState, useEffect } from 'react';
import { redirect, useNavigate } from 'react-router-dom';
import CarteHistorique from '../components/CarteHistorique';
import Pagination from '../components/Pagination';
const Historique = () => {


    const [historique, setHistorique] = useState([]);
    const { token } = useAuth();
 const navigate = useNavigate();



 
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); 
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = historique.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); 
  };

    useEffect(() => {
      async function getHistorique() {
        if (!token) {
          navigate("/login");
        }
        else{
        const reps = await fetch(
          `https://tvshowdbapi.herokuapp.com/user/history`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          },
        );
  
        if (reps.ok) {
          const historique = await reps.json();
          setHistorique(historique);
        }}
      }
      getHistorique();
    })

    useEffect(() => {
   setCurrentPage(1);
  }, [historique.length]);

if (!historique) {
    return <div className="container p-4">Loading episodes...</div>;
  }

if (historique.length === 0) {
  return (
   <div className="container is-flex is-justify-content-center is-align-items-center" style={{ minHeight: '200px' }}>
  <p className="has-text-weight-bold is-size-2 has-text-centered">
    Aucun episode regarder pour le moment 
  </p>
</div>
  );
}
  return (

  <div>
    <section className="container p-4" aria-label="Historique de visionnage">
      <div className="columns is-multiline" role="list"> 
        {/* // maps pour prendre chaque episode dans historique */}
        {currentItems.map((e) => (
          <div 
            className="column is-4" 
            key={e.episodeId} 
            role="listitem" 
          > 
            <CarteHistorique
              imgUrl={e?.imgUrl}
              tvshowTitle={e?.tvshowTitle}
              seasonNumber={e?.seasonNumber}
              episodeTitle={e?.episodeTitle}
              onClick={() => navigate(`/play/${e.episodeId}`)}
              Detail={() => navigate(`/details/${e.tvshowId}`)}
              versEpisode={() => navigate(`/episodes/${e.seasonId}`)}
            />
          </div>
        ))}
      </div>
    </section>

    <Pagination 
      totalItems={historique.length}
      itemsPerPage={itemsPerPage}
      currentPage={currentPage}
      onPageChange={handlePageChange}
      onNbParPage={setItemsPerPage}
    />
  </div>
);
}

export default Historique
