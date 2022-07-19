import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import BugPage from "./features/BugPage/BugPage";
import ProjectPage from "./features/ProjectPage/ProjectPage";
import Header from "./features/Header";
import ProjectsPage from "./features/ProjectsPage/ProjectPage";

function App() {
  return (
    <Router>
      <Header />

      <Routes>
        <Route path="/project/:id" element={<ProjectPage />} />

        <Route path="/bug/:id" element={<BugPage />} />

        <Route path="/" element={<ProjectsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
