
import axios from 'axios';
import { handleErrorMessage } from '../utils/handleErrorMessage';
import { Movie } from '../types/Movie';

export interface FetchMoviesApiResponse {
    success: boolean;
    errorMessage: string;
    status: number
    data: {
        results: Movie[]
        page: number
        total_results: number;
        total_pages: number;
    };
}
export interface FetchMoviesApiParams {
    query: string;
    page: number;
}

/**
 *  Get movies list
 *
 * Endpoints:
 * - GET /3/search/movie/?query={query}
 *  @param {string} query
 *
 * @returns Promise<FetchMoviesApiResponse>
 */

export const fetchMoviesApi = (params: FetchMoviesApiParams): Promise<FetchMoviesApiResponse> => (
    axios.get([
            `${process.env.REACT_APP_API_ENDPOINT}3/search/movie`,
            `?api_key=${process.env.REACT_APP_API_KEY}`,
                params.query && params.query !== ""
                    ? `&language=en-US&query=${params.query}`
                    : '',
                params
                && params.page
                    ? `&page=${params.page}`
                    : "",
        ].join(""))
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

