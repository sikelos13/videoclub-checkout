import React, { Component } from "react";
import { fetchMoviesApi, FetchMoviesApiResponse } from "../api/movies_management/fetchMovies";
import MoviesList from "../components/movies_management/MoviesList";
import Box from "@material-ui/core/Box";
import toast from "react-hot-toast";
import SkeletonLoader from "../components/TableCellLoader";
import AppHeader from "../components/AppHeader";
import { debounce } from "../utils/debounce";
import { getFetchedUpdatedItems } from "../utils/getFetchedUpdatedItems";
import { Movie } from "../api/types/Movie";
import { Pagination } from "../api/types/Pagination";
import PaginationNavBar from "../components/PaginationNavBar";
import { getHasNextPage } from "../utils/getHasNextPage";
import CheckoutCart from "../components/CheckoutCart";
import { getUpdatedMoviesList } from "../utils/getUpdatedMoviesList";
import { createCheckoutApi, CreateCheckoutApiResponse, CreateCheckoutApiParams } from "../api/checkout/createCheckout";
import { getInitialListState } from "../utils/getInitialListState";
import { getSortedMoviesList } from "../utils/getSortedMoviesList";
import { getFilteredMoviesList } from "../utils/getFilteredMoviesList";

interface MoviesManagementState {
    loading: boolean;
    loadingCheckout: boolean;
    moviesList: Movie[];
    searchTerm: string;
    isSearching: boolean;
    pagination: Pagination;
    selectedMovies: Movie[];
    sortMoviesBy: SortType;
}

export type SortType = "highest_vote_average" | "lowest_vote_average" | "" | string;

class MoviesManagement extends Component<{}, MoviesManagementState> {
    constructor(props: any) {
        super(props);

        this.state = {
            moviesList: [],
            loading: false,
            loadingCheckout: false,
            searchTerm: "",
            isSearching: false,
            selectedMovies: [],
            sortMoviesBy: "",
            pagination: {
                page: 1,
                total_pages: 0,
                total_results: 0,
                hasNextPage: false,
            },
        };

        this.handleSearch = debounce(this.handleSearch, 500);
    }

    fetchMovies = (query: string, isNewSearch?: boolean) => {
        const { pagination, selectedMovies } = this.state;
        const { page } = pagination;

        this.setState({ loading: true });

        const params = {
            query,
            page: isNewSearch ? 1 : page,
        };

        fetchMoviesApi(params).then((response: FetchMoviesApiResponse) => {
            if (response.success) {
                const updatedMoviesList = getFetchedUpdatedItems(selectedMovies, response.data.results);

                this.setState({
                    moviesList: updatedMoviesList,
                    loading: false,
                    sortMoviesBy: "",
                    pagination: {
                        page: response.data.page,
                        total_results: response.data.total_results,
                        total_pages: response.data.total_pages,
                        hasNextPage: getHasNextPage(
                            response.data.page,
                            response.data.total_results
                        ),
                    },
                });
            } else {
                toast.error(response.errorMessage);
                this.setState({
                    moviesList: [],
                    loading: false,
                });
            }
        });
    };

    handleSearch = (event: any) => {
        const value = event.target.value;
        if (value !== "") {
            this.setState({ searchTerm: value }, () => this.fetchMovies(value, true));
        }
    };

    handlePaginate = (pageNumber: number) => {
        const { pagination, searchTerm } = this.state;

        this.setState(
            {
                pagination: {
                    ...pagination,
                    page: pageNumber,
                },
            },
            () => this.fetchMovies(searchTerm)
        );
    };

    handleCheckout = () => {
        const { selectedMovies, moviesList } = this.state;

        this.setState({ loadingCheckout: true });

        const selectedMoviesIds = selectedMovies.map((movie: Movie) => {
            return movie.id;
        });

        const form = {
            data: selectedMoviesIds
        } as CreateCheckoutApiParams

        createCheckoutApi(form).then((response: CreateCheckoutApiResponse) => {
            if (response.success) {
                toast.success(response.successMessage, {
                    duration: 3000,
                    style: {
                        padding: '16px'
                    }
                });

                const initialMoviesList = getInitialListState(moviesList);

                this.setState({
                    selectedMovies: [],
                    loadingCheckout: false,
                    moviesList: initialMoviesList
                });
            } else {
                toast.error(response.errorMessage, {
                    duration: 3000,
                    style: {
                        padding: '16px'
                    }
                });
                this.setState({ loadingCheckout: false });
            }
        })
    };

    handleAddMovie = (selectedMovie: Movie) => {
        const { selectedMovies, moviesList } = this.state;

        const updatedMoviesList = getUpdatedMoviesList(moviesList, selectedMovie);
        const updatedSelectedMovies = [...selectedMovies, selectedMovie];

        this.setState({
            selectedMovies: updatedSelectedMovies,
            moviesList: updatedMoviesList
        });
    };

    handleRemoveMovie = (selectedMovie: Movie) => {
        const { selectedMovies, moviesList } = this.state;

        const updatedMoviesList = getUpdatedMoviesList(moviesList, selectedMovie);
        const updatedSelectedMovies = getFilteredMoviesList(selectedMovies, selectedMovie)

        this.setState({
            selectedMovies: updatedSelectedMovies,
            moviesList: updatedMoviesList
        });
    }

    handleClearCart = () => {
        const { moviesList } = this.state;
        const initialMoviesList = getInitialListState(moviesList);

        this.setState({
            selectedMovies: [],
            moviesList: initialMoviesList
        });
    }

    handleSortChange = (event: any) => {
        const { moviesList, searchTerm } = this.state;
        const { value } = event.target;
        let sortedMoviesList = [] as Movie[];
        this.setState({ loading: true });

        if(value === "") {
            this.fetchMovies(searchTerm);
            return;
        }

        sortedMoviesList = getSortedMoviesList(moviesList, value);
        this.setState({ moviesList: sortedMoviesList, loading: false, sortMoviesBy: value });
       
    }

    render() {
        const {
            moviesList,
            loading,
            searchTerm,
            isSearching,
            pagination,
            selectedMovies,
            loadingCheckout,
            sortMoviesBy
        } = this.state;

        return (
            <Box p={2} mt={2}>
                <AppHeader
                    sortMoviesBy={sortMoviesBy}
                    handleSortChange={this.handleSortChange}
                    handleSearch={this.handleSearch}
                    pagination={pagination}
                    isSearching={isSearching}
                    handlePaginate={this.handlePaginate}
                    searchTerm={searchTerm}

                />
                <Box display="flex" flexDirection="row" className="MainContainer_Body">
                    <Box
                        mt={2}
                        pb={2}
                        display="flex"
                        flexDirection="row"
                        flexWrap="wrap"
                        justifyContent="space-evenly"
                        width="80%"
                    >
                        {!loading
                            ? <MoviesList
                                moviesList={moviesList}
                                handleAddMovie={this.handleAddMovie}
                                handleRemoveMovie={this.handleRemoveMovie}
                            />
                            : <SkeletonLoader />
                        }
                    </Box>

                    <Box>
                        <CheckoutCart
                            selectedMovies={selectedMovies}
                            handleCheckout={this.handleCheckout}
                            handleRemoveMovie={this.handleRemoveMovie}
                            loadingCheckout={loadingCheckout}
                            handleClearCart={this.handleClearCart}
                        />
                    </Box>
                </Box>
                <Box display="flex" justifyContent="flex-end">
                    <PaginationNavBar
                        isSearching={isSearching}
                        pagination={pagination}
                        paginate={this.handlePaginate}
                    />
                </Box>
            </Box>
        );
    }
}

export default MoviesManagement;
