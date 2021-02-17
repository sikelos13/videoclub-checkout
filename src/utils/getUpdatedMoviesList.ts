import { Movie } from "../api/types/Movie";

export const getUpdatedMoviesList = (list: Movie[], selectedMovie: Movie) => {
    return list.map((movie: Movie) => {
        if (selectedMovie.id === movie.id) {
            return {
                ...movie,
                isSelected: !movie.isSelected
            }
        }
        return movie;
    });
}