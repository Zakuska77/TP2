import { svrUrl } from "../utils/constants.js";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CarteTvshow from "../components/CarteTvshow.jsx";
import Pagination from "../components/Pagination.jsx";
function App() {

  const [data, setData] = useState([]);

  const [title, setTitle] = useState("");
  const [studio, setStudio] = useState([]);
  const [selectedStudio, setSelectedStudio] = useState("");
  
  const [filteredShows, setFilteredShows] = useState([]);

  const navigate = useNavigate();


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(4); 
  
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredShows.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo(0, 0); 
  };
  //  Fonction qui recupere les tvshow
  // if (token) {
  //   console.log(token);
  // }
  useEffect(() => {
    async function getTvshows() {
      const reps = await fetch("https://tvshowdbapi.herokuapp.com/tvshows");
      if (reps.ok) {
        const tvshow = await reps.json();
        setData(tvshow);
        ///
        setFilteredShows(tvshow);
        ///
      }
    }
    getTvshows();
  }, []);

  // Fonction qui recupere les studios
  useEffect(() => {
    async function getStudio() {
      const reps = await fetch("https://tvshowdbapi.herokuapp.com/studios");
      if (reps.ok) {
        const studio = await reps.json();
        setStudio(studio);
      }
    }
    getStudio();
  }, []);

  // Fonction qui filtre tvshow par titre et par studio
  useEffect(() => {

    const results = data.filter((item) => {
      const matchesTitle = item.title
        .toLowerCase()
        .includes(title.toLowerCase());

      const matchesStudio = selectedStudio
        ? item.studio.studioId.toString() === selectedStudio.toString()
        : true;

      return matchesTitle && matchesStudio;
    });

    setFilteredShows(results);
  }, [title, selectedStudio, data]);

 useEffect(() => {
  setCurrentPage(1);
}, [filteredShows.length]);
  console.log(currentItems)
  console.log(title);
  console.log(studio);

  return (
    <>
      <div className="is-flex is-align-items-center is-justify-content-center mt-6" role="search">
        {/* input title pour le filtre */}
        <label className="label mr-2 mb-0">Title:</label>
        <div className="control mr-4">
          <input
            className="input"
            type="text"
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        {/* input studio pour le filtre */}
        <label className="label mr-2 mb-0">Studio:</label>
        <div className="control">
          <div className="select">
            <select onChange={(e) => setSelectedStudio(e.target.value)}>
              <option value="">Select Studio</option>
              {studio.map((s) => (
                <option key={s.studioId} value={s.studioId}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      <div className="container mt-6">
        <div className="columns is-multiline" role="list">
          {/* /map pour faire afficher carte de tvshow */}
          {currentItems.map((tvshow) => (
            <div className="column is-one-quarter" key={tvshow.tvshowId} role="listitem">
              <CarteTvshow
                tvshowId={tvshow.tvshowId}
                imgUrl={tvshow.imgUrl}
                title={tvshow.title}
                genres={tvshow.genres.map((genre) => genre.name).join(", ")}
                studio={tvshow.studio.name}
                onClick={() => navigate(`/details/${tvshow.tvshowId}`)}
              />
            </div>
          ))}
        </div>
        <Pagination 
          totalItems={filteredShows.length}
          itemsPerPage={itemsPerPage}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onNbParPage={setItemsPerPage}
        />
      </div>
    </>
  );
};
export default App;
