import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ModalDeleteProps } from "../../types";
import { useFetch } from "./CustomDeleteDialog";



export const DeleteDialog = (props: ModalDeleteProps) => {
  const { error, open, deleteAndClose ,handleClose, id} = useFetch(props) 
  const handleDelete = () => {
    deleteAndClose()
  
  };
  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"delete product"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {`Are you sure you want to delete the product ${id} from the inventory?`}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>cancel</Button>
          <Button onClick={handleDelete} autoFocus>
            delete
          </Button>
          {error && <p className="errorMessage">{error + " !"}</p>}
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
