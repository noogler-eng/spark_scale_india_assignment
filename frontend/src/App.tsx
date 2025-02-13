import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import AddProject from "./pages/AddProject";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/add-projects" element={<AddProject />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
