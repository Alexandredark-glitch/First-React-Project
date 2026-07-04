import "../css/MovieCard.css";
import { useMovieStore } from "../store/store";

function MovieCard({ movie }) {
    
    const addToFavorites = useMovieStore(state => state.addToFavorites);
    const removeFromFavorites = useMovieStore(state => state.removeFromFavorites);
    
    const foundOrNot = useMovieStore(state =>
        state.favorites.find(fav => fav.id === movie.id)
    );

    const favorite = foundOrNot ? true : false;
   
    
    function handleClick() {
        if (favorite) {
            removeFromFavorites(movie.id);
        }
        else {
            addToFavorites(movie);
            // Notice we removed the manual classList.toggle here.
            // React handles the 'active' class via the template below!
        }
    }
    
    return (
        <div className="movie-card">
            <div className="movie-poster">
                <img src={`https://image.tmdb.org/t/p/original${movie.poster_path}`} alt={movie.title} /> 
                <div className="movie-overlay">
                    <button 
                        className={`favorite-btn ${favorite ? 'active' : ''}`} 
                        onClick={handleClick}
                    >
                        ♡
                    </button>
                </div>
            </div>
            <div className="movie-info">
                <h3 className="movie-title">{movie.title}</h3>
                <p className="movie-year">{movie.release_date.split("-")[0]}</p>
            </div>
        </div>    
    );
}

export default MovieCard;