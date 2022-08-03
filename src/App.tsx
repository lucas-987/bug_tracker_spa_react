import { 
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import BugPage from "./components/BugPage/BugPage";
import ProjectPage from "./components/ProjectPage/ProjectPage";
import Header from "./components/Header";
import ProjectsPage from "./components/ProjectsPage/ProjectsPage";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/project/:id" element={<ProjectPage />} />

                <Route path="/bug/:id" element={<BugPage />} />

                <Route path="/" element={<ProjectsPage />} />
            </Routes>
        </Router>
    );
}

export default App;
