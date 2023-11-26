import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { ModalDeleteProps } from "../../types";

export default function DeleteDialog(props: ModalDeleteProps) {
  const [error, setError] = React.useState("");
  const { open, setOpen, id, setStateProducts, products } = props;
  const handleClose = () => {
    setOpen(false);
  };
  const handleDelete = () => {
    const storage = localStorage.getItem("admin");
    const token = storage ? JSON.parse(storage).token : null;
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
    myHeaders.append("authorization", token);
    fetch(`${import.meta.env.VITE_BASE_URL}/api/inventory/${id}`, {
      method: "DELETE",
      redirect: "follow",
      headers: myHeaders,
    })
      .then(async (res) => {
        if (!res.ok) {
          const errorText = await res.text();
          throw new Error(
            `HTTP error! Status: ${res.status}, Error: ${errorText}`
          );
        }
        return res.json();
      })
      .then((resolve) => {
        console.log(resolve);
        const currentObjects = [...products];
        const updatedObjects = currentObjects.filter((obj) => obj._id !== id);
        setStateProducts(() => updatedObjects);
        handleClose();
      })
      .catch((error) => {
        console.log("error", error), setError("network error");
      });
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