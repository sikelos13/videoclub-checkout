import { Movie } from "../api/types/Movie";

export const getInitialListState = (list: Movie[]) => {
    return list.map((movie: Movie) => {
        return {
            ...movie,
            isSelected: false
        }
       
    });
}