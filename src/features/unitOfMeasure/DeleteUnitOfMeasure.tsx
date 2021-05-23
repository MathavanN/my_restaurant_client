import { FC } from 'react';
import { Button, Typography, makeStyles } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const useStyles = makeStyles((theme) => ({
  yes: {
    backgroundColor: '#DA2903',
    color: '#fff',
    '&:hover': {
      backgroundColor: '#C32503',
    },
  },
  no: {
    backgroundColor: '#BFBFBF',
    color: '#000',
    '&:hover': {
      backgroundColor: '#AFADAD',
    },
  },
}));

interface IProps {
  openDelete: boolean;
  handleOpenDelete: () => void;
}
const DeleteUnitOfMeasure: FC<IProps> = ({ openDelete, handleOpenDelete }) => {
  const classes = useStyles();
  const handleDelete = () => {
    handleOpenDelete();
  };

  return (
    <Dialog
      open={openDelete}
      onClose={handleOpenDelete}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h6">Are you sure to delete?</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>Are you sure to delete?</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={handleDelete}
          variant="contained"
          className={classes.yes}
        >
          Yes
        </Button>
        <Button
          onClick={handleOpenDelete}
          variant="contained"
          className={classes.no}
        >
          No
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteUnitOfMeasure;
