import React, { Component } from 'react';
import { fetchMoviesApi, FetchMoviesApiResponse  } from '../api/movies_management/fetchMovies';
import MoviesList from '../components/movies_management/MoviesList';
import { CheckoutFormData } from '../api/types/Checkout';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Box from '@material-ui/core/Box';
import toast from 'react-hot-toast';
import SkeletonLoader from "../components/TableCellLoader";
import AppHeader from '../components/AppHeader';
import { TableFooter } from '@material-ui/core';
import { debounce } from '../utils/debounce';
// import CheckoutConfirmationModal from "../components/modals/CheckoutConfirmationModal";
import { getUpdatedItemsListOnEdit } from "../utils/getUpdatedItemsListOnEdit";
import { getUpdatedItemsListOnDelete } from "../utils/getUpdatedItemsListOnDelete";
import { Movie } from "../api/types/Movie";

interface MoviesManagementState {
    loading: boolean;
    moviesList: Movie[];
    searchTerm: string;
    isSearching: boolean;
    selectedMovie?: Movie;
    issModalOpen: boolean;
}

class MoviesManagement extends Component<{}, MoviesManagementState> {
    constructor(props: any) {
        super(props)

        this.state = {
            moviesList: [],
            loading: false,
            searchTerm: "",
            isSearching: false,
            issModalOpen: false
        }

        this.handleSearch = debounce(this.handleSearch, 500);
    }

    fetchMovies = (query: string) => {
        this.setState({ loading: true });
        fetchMoviesApi(query).then((response: FetchMoviesApiResponse) => {
            if (response.success) {
                // const currentPlayersList = getCurrentPlayersList(1, playersPerPage, response.data);

                this.setState({
                    moviesList: response.data.results,
                    loading: false
                })
            } else {
                toast.error(response.errorMessage);
                this.setState({
                    moviesList: [],
                    loading: false
                })
            }
        })
    }

    handleSearch = (event: any) => {
        const value = event.target.value
        this.setState({ searchTerm: value, loading: true });
        this.fetchMovies(value);
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
    }

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
    }

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
    }

    handleChangeInput = (event: any) => {
        // const { value } = event.target;

        // this.setState({ newPlayerName: value })
    }
    
    // handleOpenModal = (player: Player) => {
    //     this.setState({
    //         selectedMovie: player,
    //         issModalOpen: true
    //     });
    // }

    // handleCloseModal = () => {
    //     this.setState({
    //         selectedMovie: undefined,
    //         issModalOpen: false
    //     });
    // }

    render() {
        const { 
            moviesList, 
            loading, 
            searchTerm, 
            isSearching,
            selectedMovie, 
            issModalOpen 
        } = this.state;

        return (
            <Box
                boxShadow="0 15px 17px 0 rgb(0 0 0 / 16%), 0 15px 17px 0 rgb(0 0 0 / 12%)"
                border="1px black solid"
                borderRadius="8px"
                p={2}
                mt={2}
            >
                <AppHeader
                    handleSearch={this.handleSearch}
                    handleAddPlayer={this.handleAddPlayer}
                    handleChangeInput={this.handleChangeInput}
                    searchTerm={searchTerm}
                />
                <Box
                    mt={2}
                    pb={2}
                    display="flex"
                    flexDirection="row"
                    flexWrap="wrap"
                    justifyContent="space-evenly"
                >
                        {!loading
                            ? <MoviesList 
                                moviesList={moviesList}
                            />
                        : <SkeletonLoader />
                    }

                    {/* {issModalOpen && selectedPlayer &&
                        <CheckoutConfirmationModal
                            handleCloseModal={this.handleCloseModal}
                            handleDeletePlayer={this.handleRowDelete}
                            open={issModalOpen}
                            player={selectedPlayer}
                        />
                    } */}
                </Box>
            </Box>
        );
    }
}

export default MoviesManagement;