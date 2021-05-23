import { FC } from 'react';
import { Button, Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

interface IProps {
  openEdit: boolean;
  handleOpenEdit: () => void;
}
const EditUnitOfMeasure: FC<IProps> = ({ openEdit, handleOpenEdit }) => {
  const handleSave = () => {
    handleOpenEdit();
  };
  return (
    <Dialog
      open={openEdit}
      onClose={handleOpenEdit}
      aria-labelledby="form-dialog-title"
    >
      <DialogTitle id="form-dialog-title">
        <Typography variant="h6">Add/Save Unit Of Measure</Typography>
      </DialogTitle>
      <DialogContent dividers>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We
          will send updates occasionally.
        </DialogContentText>
        <TextField
          autoFocus
          margin="dense"
          id="name"
          label="Email Address"
          type="email"
          fullWidth
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleOpenEdit} color="primary">
          Cancel
        </Button>
        <Button onClick={handleSave} color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditUnitOfMeasure;
