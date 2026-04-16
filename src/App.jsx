import { svrUrl } from "./constants.js";

function App() {
  return (
    <>
      <div className="container">
        <h1 className="title is-1 has-text-centered">TP2</h1>
        <p>
          L'api exploitée est: <a href={svrUrl}>TVSHOWDBAPI</a>
        </p>
      </div>
    </>
  );
}

export default App;
