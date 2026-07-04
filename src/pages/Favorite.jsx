import "../css/Favorites.css";
import MovieCard from "../components/Card";
import { useMovieStore } from "../store/store"; 

function Favorite() {
    const favorites = useMovieStore((state) => state.favorites);
    
    if (favorites.length > 0) {
        return (
            <div className="movies-grid">
                {favorites.map((movie) => (
                    <MovieCard movie={movie} key={movie.id} />
                ))}
            </div>
        );
    } else {
        return (
            <div className="favorites-empty">
                <h2>No Favorite Movies yet</h2>
                <p>Click the heart button on a movie to add it to your favorites.</p>
            </div>
        );
    }
}

export default Favorite;