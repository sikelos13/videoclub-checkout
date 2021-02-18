import { Movie } from "../api/types/Movie";

export const getFilteredMoviesList = (selectedMoviesList: Movie[], selectedMovie: Movie) => {
    return selectedMoviesList.filter((movie: Movie) => {
        return movie.id !== selectedMovie.id
    });
}