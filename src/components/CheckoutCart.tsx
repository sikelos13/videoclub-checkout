import React, { useState } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { Movie } from '../api/types/Movie';
import { Box, Button, IconButton, Input, SnackbarContent } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem, { ListItemProps } from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import LocalMoviesIcon from '@material-ui/icons/LocalMovies';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

interface CheckoutCartProps {
    selectedMovies: Movie[];
    handleCheckout: (form: any) => void;
    handleRemoveMovie: (id: string) => void;
}

const CheckoutCart: React.FC<CheckoutCartProps> = (({ selectedMovies, handleCheckout,handleRemoveMovie }: CheckoutCartProps) => {
    const [isEditMode, setMode] = useState(false);
    const [name, setName] = useState();
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
        <Box
            border="1px solid black"
            borderRadius="5px"
            style={{ backgroundColor: "#ffffff", maxHeight: "500px", width: "400px" }}
            mt="25px"
        >
            <Box textAlign="center" fontSize="20px" fontWeight="bold" p={1}>
                Shopping cart
        </Box>
            <List>
                {selectedMovies.length > 0
                    ? selectedMovies.map((movie: Movie) => {
                        return (
                            <>
                                <ListItem>
                                    <ListItemText
                                        primary={movie.title}
                                    />
                                    <IconButton onClick={() => handleRemoveMovie(movie.id)}>
                                        <DeleteForeverIcon />
                                    </IconButton>
                                </ListItem>
                            </>
                        )
                    })
                    : <ListItem><ListItemText primary="No movies selected" /></ListItem>
                }
            </List>
            <Box display="flex" justifyContent="center" p={1}>
                <Button color="primary">Checkout</Button>
                <Button>Clear</Button>
            </Box>
        </Box>
    )
});

export default CheckoutCart;