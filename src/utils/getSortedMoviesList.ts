import { Movie } from "../api/types/Movie";
import { SortType } from "../containers/MoviesManagement";

export const getSortedMoviesList = (moviesList: Movie[], sortBy: SortType) => {
    let sortedMoviesList = [] as Movie[];

    if(sortBy === "highest_vote_average") {
        sortedMoviesList = [...moviesList].sort((movieA: Movie, movieB: Movie) => movieB['vote_average'] - movieA['vote_average']);
    } else if (sortBy === "lowest_vote_average") {
        sortedMoviesList = [...moviesList].sort((movieA: Movie, movieB: Movie) => movieA['vote_average'] - movieB['vote_average']);
    }

    return sortedMoviesList;
}