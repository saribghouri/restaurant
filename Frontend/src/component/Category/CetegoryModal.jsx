import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
// import FilterListIcon from "@mui/icons-material/FilterList";
import TextField from "@mui/material/TextField";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";

import "./index.css";
const style = {
  position: "absolute",
  top: "40%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",

  boxShadow: 24,
  p: 4,
};

export default function CategoryModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      <Button onClick={handleOpen}>
        <AddCircleOutlineIcon />
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <h3>Add Data</h3>

            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              width="100%"
            >
              <TextField
                id="outlined-textarea"
                className="input"
                label="Category Name"
                placeholder="Category Name"
                multiline
                width="100%"
              />
            </Typography>

            <Typography
              className="button-parent"
              id="transition-modal-description"
              sx={{ mt: 2 }}
            >
              <Button variant="contained" size="small">
                Add
              </Button>

              <Button variant="contained" size="small">
                Close
              </Button>
            </Typography>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
