import React, { memo } from 'react';
import { Movie } from '../api/types/Movie';
import { Box, Button, IconButton } from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

interface CheckoutCartProps {
    selectedMovies: Movie[];
    loadingCheckout: boolean;
    handleCheckout: () => void;
    handleClearCart: () => void;
    handleRemoveMovie: (selectedMovie: Movie) => void;
}

const CheckoutCart: React.FC<CheckoutCartProps> = memo(({ selectedMovies, handleClearCart, handleCheckout, handleRemoveMovie, loadingCheckout }: CheckoutCartProps) => (
    <Box
        border="1px solid black"
        borderRadius="5px"
        style={{ backgroundColor: "#ffffff", maxHeight: "500px", width: "400px" }}
        mt="25px"
    >
        <Box textAlign="center" fontSize="20px" fontWeight="bold" p={1}>
            Shopping cart - Selected Movies: {selectedMovies.length}
        </Box>
        <List>
            {selectedMovies.length > 0
                ? selectedMovies.map((movie: Movie) => {
                    return (
                        <ListItem key={movie.id}>
                            <ListItemText primary={movie.title} />
                            <IconButton onClick={() => handleRemoveMovie(movie)}>
                                <DeleteForeverIcon />
                            </IconButton>
                        </ListItem>
                    )
                })
                : <ListItem><ListItemText primary="No movies selected" /></ListItem>
            }
        </List>
        <Box display="flex" justifyContent="center" p={1}>
            <Button onClick={handleClearCart}>Clear</Button>
            <Button 
                color="primary" 
                onClick={handleCheckout}
                disabled={loadingCheckout}
            >
                Checkout
            </Button>
        </Box>
    </Box>
));

export default CheckoutCart;