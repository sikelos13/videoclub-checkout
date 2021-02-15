import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Movie } from '../../api/types/Movie';
import { Button, Input } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

interface MoviesListProps {
    moviesList: Movie[]
    // handleUpdate: (form: any) => void;
    // handleDelete: (player: Player) => void;
}

const MoviesList: React.FC<MoviesListProps> = (({ moviesList }: MoviesListProps) => {
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
            {moviesList.map((movie: Movie) => {
                return (
                    <Card key={movie.id}>
                    <CardContent>
                      <Typography gutterBottom>
                        Word of the Day
                      </Typography>
                      <Typography variant="h5" component="h2">
                        {movie.title}
                      </Typography>
                      <Typography color="textSecondary">
                        {movie.release_date}
                      </Typography>
                      <Typography variant="body2" component="p">
                          {movie.vote_average}
                      </Typography>
                    </CardContent>
                    <CardActions>
                      <Button size="small">Learn More</Button>
                    </CardActions>
                  </Card>
                )
            })
            }
        </>
    )
});

export default MoviesList;