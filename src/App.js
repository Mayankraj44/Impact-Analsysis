import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useParams,
} from "react-router-dom";
import { Home } from "./assignment/Home";
import { Rejected } from "./assignment/Rejected";
import { ShortListed } from "./assignment/ShortListed";
import { Child } from "./assignment/Child";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />

          <Route path="/:id" element={<Child />} />

          <Route exact path="/rejected" element={<Rejected />} />

          <Route exact path="/shortlisted" element={<ShortListed />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
