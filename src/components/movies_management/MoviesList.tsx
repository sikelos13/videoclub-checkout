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
    // handleUpdate: (form: any) => void;
    // handleDelete: (player: Player) => void;
}

const MoviesList: React.FC<MoviesListProps> = (({ moviesList, notificationText }: MoviesListProps) => {
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
                    <Box key={movie.id} width="400px" maxHeight="650px" mb="10px" p={1}>
                    <Card>
                    <CardContent>
                      <Typography gutterBottom>
                      {movie.title}
                      </Typography>
                      <Typography variant="h5" component="h2">
                        <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt="preview-poster" width="350" height="450" />
                      </Typography>
                      <Typography color="textSecondary">
                        Release data: {movie.release_date}
                      </Typography>
                      <Typography variant="body2" component="p">
                          Score: {movie.vote_average}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                  </Box>
                )
            })
            : <SnackbarContent color="secondary" message={notificationText} />
            }
        </>
    )
});

export default MoviesList;