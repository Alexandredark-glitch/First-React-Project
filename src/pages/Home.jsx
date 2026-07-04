import MovieCard from "../components/Card";
import { useState, useEffect } from "react";
import "../css/Home.css";
import { getPopularMovies } from "../services/api.js";
import { searchedMovies } from "../services/api.js";
import { test, fecthMyDatabase } from "../services/supabase.js";



function Home() {
  const [currentInputText, ChangeCurrentInputText] = useState("");
  const [trendingMovies, setTrendingMovies] = useState([]);
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true)


  useEffect(() => {
      const loadPopularMovies = async () => {
        try {
          const popularMovies = await getPopularMovies();
          const trendingMovies = await fecthMyDatabase();
          setMovies(popularMovies);
          setTrendingMovies(trendingMovies);
        }
        catch (error) {
          setError("Failed to load movies...")
        }
        finally {
          setLoading(false)
        }
      }
      loadPopularMovies();
  }, []);
  
  const handleSearch = async (e) => {
    e.preventDefault();
    if (!currentInputText.trim()) return;
    try {
      setLoading(true);
      setError(null);
      const searchResults = await searchedMovies(currentInputText);
      setMovies(searchResults);
      
       await test(currentInputText.toLocaleLowerCase(), searchResults[0]);

      if (searchResults.length === 0) {
         setError(`No movies found with the title: "${currentInputText}"`);
         return;
        }   
      
      }
     catch (error) {
      setError("Failed to search movies...");
    }
    finally {
       setLoading(false);
    }
    
  };

   return (
    <>
      
      <div className="home">
        <form onSubmit={handleSearch} className="search-form">
          <input
            type="text"
            placeholder="Search for a movie..."
            className="search-input"
            value={currentInputText}
            onChange={(e) => ChangeCurrentInputText(e.target.value)}
          />
          <button type="submit" className="search-button">
            Search
          </button>
        </form>

          {trendingMovies.length > 0 && (
          <section className="trending">
            <h2>Trending Movies</h2>
            <ul>
              {trendingMovies.map((movie, index )=> (
                <li key={movie.id}>
                  <p>{index + 1} {movie.title}</p>
                  <img src={movie.url} alt={movie.title} />
                </li>
              ))}
            </ul>
          </section>
        )}

        {loading ? <div className="loading">Loading...</div> : 
          
           error ? <div className="error-message">{error}</div> :
             <>
            <h1 className="Popular-Movies">Popular Movies</h1>
             <div className="movies-grid">
              {
            movies
              .map((movie) => (
                <MovieCard movie={movie} key={movie.id} />
              ))}
               
               </div>
          </>
          }
       
          
      </div>
    </>
  );
}

export default Home;
