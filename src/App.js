import {
  BrowserRouter as Router, Link, Route, Routes
} from "react-router-dom";
import "./App.css";
import { Child } from "./Components/Child";
import { Home } from "./Components/Home";
import { Rejected } from "./Components/Rejected";
import { ShortListed } from "./Components/ShortListed";

function App() {
  return (
    <div className="App">
      <Router>
        <div className="App-header">
          <Link to="/">
            <button className="home-button">HOME</button>
          </Link>
        </div>
        <Routes>
          <Route  path="/" element={<Home />} />

          <Route path="/:id" element={<Child />} />

          <Route  path="/rejected" element={<Rejected />} />

          <Route  path="/shortlisted" element={<ShortListed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
