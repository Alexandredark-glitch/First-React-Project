const apiKey = import.meta.env.VITE_TMDB_API_KEY;
const apiUrl = "https://api.themoviedb.org/3";

export const getPopularMovies = async () => { 
    const response = await fetch(`${apiUrl}/movie/popular?api_key=${apiKey}`);
    const data = await response.json();
    return data.results;
}

export const searchedMovies = async (query) => { 
    const response = await fetch(`${apiUrl}/search/movie?api_key=${apiKey}&query=${encodeURIComponent(query)}`);
    const data = await response.json();
    return data.results;
}
