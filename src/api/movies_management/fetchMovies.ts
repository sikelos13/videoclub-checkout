
import axios from 'axios';
import { handleErrorMessage } from '../utils/handleErrorMessage';
import { Movie } from '../types/Movie';

export interface FetchMoviesApiResponse {
    success: boolean;
    errorMessage: string;
    status: number
    data: {
        results: Movie[]
    };
}
/**
 *  Get players list
 *
 * Endpoints:
 * - GET /players
 *
 *
 * @returns Promise<FetchMoviesApiResponse>
 */

export const fetchMoviesApi = (query: string): Promise<FetchMoviesApiResponse> => (
    axios.get([
            `${process.env.REACT_APP_API_ENDPOINT}3/search/movie`,
            `?api_key=${process.env.REACT_APP_API_KEY}`,
            query && query !== ""
                ? `&language=en-US&query=${query}`
                : ''
        ].join(","))
        .then((response: any) => {
            if (response.status >= 200 && response.status < 300) {
                return {
                    ...response,
                    success: true
                }
            } else if (response.status === 400) {
                return {
                    ...response,
                    success: false,
                    errorMessage: handleErrorMessage(response)
                }
            } else {
                return {
                    ...response,
                    success: false,
                    errorMessage: handleErrorMessage(response)
                }
            }
        }).catch((error: any) => {
            return {
                ...error,
                success: false,
                errorMessage: handleErrorMessage(error)
            }
        })
);

