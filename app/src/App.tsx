import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/layout/Header";
import Report from "./pages/Report";
import About from "./pages/About";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/report" element={<Report />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
