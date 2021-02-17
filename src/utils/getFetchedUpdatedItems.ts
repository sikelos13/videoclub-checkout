import { Movie } from "../api/types/Movie";

export const getFetchedUpdatedItems = (selectedMovies: Movie[], responseList: Movie[]) => {
    let selectedMoviesIds = [] as string[];

    if(responseList.length === 0) {
        return [];
    }

    if(selectedMovies.length === 0 ) {
        return responseList.map((movie: Movie) => {
            return {
                ...movie,
                isSelected: false
            }
        })
    }

    for (let i = 0; i < selectedMovies.length; i++) {
        const selectedMovie = selectedMovies[i];
        selectedMoviesIds.push(selectedMovie.id);
    }

    const updatedMoviesList = responseList.map((movie: Movie) => {
        if(selectedMoviesIds.includes(movie.id)) {
            return {
                ...movie,
                isSelected: true
            }
        } else {
            return {
                ...movie,
                isSelected: false
            }
        }
    });
    
    return updatedMoviesList;
}