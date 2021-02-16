import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Movie } from '../../api/types/Movie';
import { Box, Button, Input, SnackbarContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface MoviesListProps {
    moviesList: Movie[];
    notificationText: string;
    selectMovie: (movie: Movie) => void;
    // handleUpdate: (form: any) => void;
    // handleDelete: (player: Player) => void;
}

const MoviesList: React.FC<MoviesListProps> = (({ moviesList, notificationText, selectMovie }: MoviesListProps) => {
    const [isEditMode, setMode] = useState(false);
    const [name, setName] = useState("");
    const [selectedRow, setSelectedRow] = useState("");

    // const closeEditMode = () => {
    //     setMode(!isEditMode);
    //     setSelectedRow("");
    // }

    // const handlePrimaryAction = (isEditRow: boolean, id: string) => {
    //     if (isEditRow) {
    //         const form = { name, id }
    //         handleUpdate(form);
    //         closeEditMode();
    //     } else {
    //         setMode(!isEditRow);
    //         setSelectedRow(id);
    //     }
    // }

    // const handleSecondaryAction = (isEditRow: boolean, player: Player) => {
    //     if (isEditRow) {
    //         closeEditMode();
    //         setName("");
    //     } else {
    //         handleDelete(player)
    //     }
    // }

    // const onChangeInput = (event: any) => {
    //     const value = event.target.value;
    //     setName(value);
    // }

    return (
        <>
            {moviesList.length > 0 
                ? moviesList.map((movie: Movie) => {
                return (
                    <Box key={movie.id} width="300px" maxHeight="450px" p={1}>
                    <Card>
                    <CardContent>
                      <Typography gutterBottom>
                        <Box fontSize="15px" p="5px">{movie.title}</Box>
                      </Typography>
                      <Box display="flex" justifyContent="center" p="5px">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="preview-poster" width="200" height="250" />
                      </Box>
                      <Typography color="textSecondary">
                        Release date: {movie.release_date}
                      </Typography>
                      <Typography color="textSecondary">
                          Score: {movie.vote_average}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                      <Button size="small" color="primary" onClick={() => selectMovie(movie)}>{movie.isSelected ? "Remove" : "Add"}</Button>
                    </CardActions>
                  </Card>
                  </Box>
                )
            })
            : "No movies to show"
            }
        </>
    )
});

export default MoviesList;