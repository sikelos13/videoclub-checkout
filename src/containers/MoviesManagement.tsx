import React, { Component } from "react";
import {
  fetchMoviesApi,
  FetchMoviesApiResponse,
} from "../api/movies_management/fetchMovies";
import MoviesList from "../components/movies_management/MoviesList";

import Box from "@material-ui/core/Box";
import toast from "react-hot-toast";
import SkeletonLoader from "../components/TableCellLoader";
import AppHeader from "../components/AppHeader";
import { debounce } from "../utils/debounce";
import { getUpdatedItemsListOnEdit } from "../utils/getUpdatedItemsListOnEdit";
import { getUpdatedItemsListOnDelete } from "../utils/getUpdatedItemsListOnDelete";
import { Movie } from "../api/types/Movie";
import { Pagination } from "../api/types/Pagination";
import PaginationNavBar from "../components/PaginationNavBar";
import { getHasNextPage } from "../utils/getHasNextPage";
import CheckoutCart from "../components/CheckoutCart";

interface MoviesManagementState {
  loading: boolean;
  moviesList: Movie[];
  searchTerm: string;
  isSearching: boolean;
  selectedMovie?: Movie;
  issModalOpen: boolean;
  notificationText: string;
  pagination: Pagination;
  selectedMovies: Movie[];
}

class MoviesManagement extends Component<{}, MoviesManagementState> {
  constructor(props: any) {
    super(props);

    this.state = {
      moviesList: [],
      loading: false,
      searchTerm: "",
      isSearching: false,
      issModalOpen: false,
      selectedMovies: [],
      notificationText: "Please search movies",
      pagination: {
        page: 1,
        total_pages: 0,
        total_results: 0,
        hasNextPage: false,
      },
    };

    this.handleSearch = debounce(this.handleSearch, 500);
  }

  fetchMovies = (query: string) => {
    const { pagination } = this.state;
    const { page } = pagination;

    this.setState({ loading: true });

    const params = {
      query,
      page,
    };
    fetchMoviesApi(params).then((response: FetchMoviesApiResponse) => {
      if (response.success) {
        // const currentPlayersList = getCurrentPlayersList(1, playersPerPage, response.data);

        this.setState({
          moviesList: response.data.results,
          loading: false,
          notificationText:
            response.data.results.length === 0 ? "No movies found" : "",
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
      this.setState({ searchTerm: value });
      this.fetchMovies(value);
    }
  };

  handleRemoveMovie = (id: string) => {
      const { selectedMovies } = this.state;

      const updatedSelectedMovies = selectedMovies.filter((movie: Movie) => {
          return id !== movie.id;
      })

      this.setState({ selectedMovies: updatedSelectedMovies })
  }

  handleUpdate = (form: any) => {
    // const { pagination, playersList, filteredPlayersList, isSearching } = this.state;
    // const { playersPerPage, currentPage } = pagination;
    // if (form.name !== "") {
    //     updatePlayerApi(form.id, form).then((response: UpdatePlayerApiResponse) => {
    //         if (response.success) {
    //             const updatedList = isSearching
    //                 ? getUpdatedItemsListOnEdit(form, filteredPlayersList)
    //                 : getUpdatedItemsListOnEdit(form, playersList);
    //             const currentPlayersList = getCurrentPlayersList(currentPage, playersPerPage, updatedList);
    //             this.setState({
    //                 filteredPlayersList: currentPlayersList,
    //                 playersList: getUpdatedItemsListOnEdit(form, playersList)
    //             });
    //             toast.success(response.successMessage, { duration: 4000 });
    //         } else {
    //             toast.error(response.errorMessage, { duration: 4000 });
    //         }
    //     });
    // } else {
    //     toast.error("Name can not be empty", { duration: 3000 });
    // }
  };

  handleRowDelete = (id: string) => {
    // const { playersList, pagination, filteredPlayersList, isSearching } = this.state;
    // const { playersPerPage, currentPage } = pagination;
    // deletePlayerApi(id).then((response: DeletePlayerApiResponse) => {
    //     if (response.success) {
    //         const updatedList = isSearching
    //             ? getUpdatedItemsListOnDelete(id, filteredPlayersList)
    //             : getUpdatedItemsListOnDelete(id, playersList);
    //         const currentPlayersList = getCurrentPlayersList(currentPage, playersPerPage, updatedList);
    //         this.setState({
    //             filteredPlayersList: currentPlayersList,
    //             playersList: getUpdatedItemsListOnDelete(id, playersList),
    //             pagination: {
    //                 ...pagination,
    //                 totalResults: updatedList.length
    //             }
    //         });
    //         this.handleCloseModal();
    //         toast.success(response.successMessage, {
    //             duration: 3000
    //         });
    //     } else {
    //         toast.error(response.errorMessage, {
    //             duration: 3000
    //         });
    //     }
    // });
  };

  handleAddPlayer = (event: any) => {
    // event.preventDefault();
    // const { playersList, newPlayerName, pagination } = this.state;
    // const { playersPerPage, currentPage } = pagination;
    // let updatedList = playersList;
    // const formData = {
    //     name: newPlayerName
    // }
    // if (newPlayerName !== "") {
    //     createPlayerApi(formData).then((response: CreatePlayerApiResponse) => {
    //         if (response.success) {
    //             updatedList.push(response.data);
    //             const currentPlayersList = getCurrentPlayersList(currentPage, playersPerPage, updatedList);
    //             this.setState({
    //                     filteredPlayersList: currentPlayersList,
    //                     playersList: updatedList,
    //                     newPlayerName: "" ,
    //                     pagination: {
    //                         ...pagination,
    //                         totalResults: updatedList.length
    //                     }
    //                 }, () => {
    //                 toast.success(response.successMessage, {
    //                     duration: 4000
    //                 });
    //             });
    //         } else {
    //             toast.error(response.errorMessage, {
    //                 duration: 4000
    //             });
    //         }
    //     });
    // } else {
    //     toast.error("Name can not be empty", {
    //         duration: 3000
    //     });
    // }
  };

  handleChangeInput = (event: any) => {
    // const { value } = event.target;
    // this.setState({ newPlayerName: value })
  };

  handlePaginate = (pageNumber: number) => {
    const { pagination, searchTerm } = this.state;

    // const updatedNextPage = getHasNextPage(pagination.page, pagination.total_results)
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

  // handleOpenModal = (player: Player) => {
  //     this.setState({
  //         selectedMovie: player,
  //         issModalOpen: true
  //     });
  // }

  handleCheckout = (form: any) => {};

  handleSelectMovie = (movie: Movie) => {
    const { selectedMovies } = this.state;

    const updatedSelectedMovies = [...selectedMovies, movie];
    this.setState({ selectedMovies: updatedSelectedMovies });
  };

  render() {
    const {
      moviesList,
      loading,
      searchTerm,
      notificationText,
      isSearching,
      selectedMovie,
      pagination,
      selectedMovies,
    } = this.state;

    return (
      <Box p={2} mt={2}>
        <AppHeader
          handleSearch={this.handleSearch}
          pagination={pagination}
          isSearching={isSearching}
          handlePaginate={this.handlePaginate}
          searchTerm={searchTerm}
        />
        <Box display="flex" flexDirection="row">
          <Box
            mt={2}
            pb={2}
            display="flex"
            flexDirection="row"
            flexWrap="wrap"
            justifyContent="space-evenly"
            width="80%"
          >
            {!loading ? (
              <MoviesList
                moviesList={moviesList}
                notificationText={notificationText}
                selectMovie={this.handleSelectMovie}
              />
            ) : (
              <SkeletonLoader />
            )}

            {/* {issModalOpen && selectedPlayer &&
                        <CheckoutConfirmationModal
                            handleCloseModal={this.handleCloseModal}
                            handleDeletePlayer={this.handleRowDelete}
                            open={issModalOpen}
                            player={selectedPlayer}
                        />
                    } */}
          </Box>

          <Box width="20%">
            <CheckoutCart
              selectedMovies={selectedMovies}
              handleCheckout={this.handleCheckout}
              handleRemoveMovie={this.handleRemoveMovie}
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
