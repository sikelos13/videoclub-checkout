import { Movie } from "../api/types/Movie";

export const getInitialListState = (list: Movie[]) => {

    if(list.length === 0) {
        return []
    }

    return list.map((movie: Movie) => {
        return {
            ...movie,
            isSelected: false
        }
    });
}