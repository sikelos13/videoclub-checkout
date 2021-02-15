import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import Box from '@material-ui/core/Box';
import { Movie } from '../../../api/types/Movie';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';

interface CheckoutConfirmationModalProps {
    handleCloseModal: () => void;
    handleDeletePlayer: (id: string) => void;
    open: boolean;
    movie: Movie;
}

const CheckoutConfirmationModal: React.FC<CheckoutConfirmationModalProps> = (({ movie, open, handleCloseModal, handleDeletePlayer }: CheckoutConfirmationModalProps) => (
    <Dialog onClose={handleCloseModal} open={open}>
        <DialogTitle style={{ cursor: 'move', width: 300 }}>
            Confirm checkout
        </DialogTitle>
        <DialogContent>
            <Box flexWrap="no-wrap">
                Do you want to but the movies below??
            </Box>
        </DialogContent>
        <DialogActions>
        <Button autoFocus onClick={handleCloseModal}>
                Cancel
          </Button>
            <Button autoFocus color="primary">
                Delete
          </Button>
        </DialogActions>
    </Dialog>
));

export default CheckoutConfirmationModal;