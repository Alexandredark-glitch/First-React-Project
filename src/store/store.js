import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useMovieStore = create(
  persist(
    (set) => ({
          favorites: [],
        

      addToFavorites: (movie) => set((state) => ({
      favorites: [...state.favorites, movie],
      }
    )),

      removeFromFavorites: (movieId) =>
        set((state) => ({
          favorites: state.favorites.filter((fav) => fav.id !== movieId),
        })),
    }),
    
    {
      name: "movie-favorites", // The key used in localStorage
    }
  )
);