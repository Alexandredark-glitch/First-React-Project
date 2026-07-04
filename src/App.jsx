import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import MovieCard from "./components/Card"
import Home from "./pages/Home"
import Favorite from "./pages/Favorite";
import "./css/App.css"




function App() {
  return (
    <>
     <Navbar />    

    <section className="main-content">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Favorite" element={<Favorite />} />
      </Routes>
    </section>
    </>
  
  )
}

export default App