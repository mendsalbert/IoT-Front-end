import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

export default function AddProduct(props) {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [spinner, setSpinner] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  const submitDataHandler = () => {
    setSpinner(true);
    var token = localStorage.getItem("UserToken");
    axios
      .post(
        "http://10.10.64.11:5000/device/api/project/add-project",
        {
          name: input,
        },
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((suc) => {
        setSpinner(false);
        handleClick();
        setInput("");
      })
      .catch((e) => console.log(e));
  };

  return (
    <div>
      <Grid>
        <Grid item>
          <h1>Add a Project</h1>
        </Grid>
        <Grid>
          <Grid item>
            <Snackbar
              anchorOrigin={{
                vertical: "top",
                horizontal: "center",
              }}
              open={open}
              autoHideDuration={6000}
              onClose={handleClose}
              message="Device Added successfully"
              action={
                <React.Fragment>
                  <IconButton
                    size="small"
                    aria-label="close"
                    color="inherit"
                    onClick={handleClose}
                  >
                    <CloseIcon fontSize="small" />
                  </IconButton>
                </React.Fragment>
              }
            />
            <TextField
              value={input}
              onChange={(e) => {
                setInput(e.target.value);
              }}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              id="standard-full-width"
              label="Enter project name"
              style={{ width: "80%", marginBottom: "20px" }}
              placeholder="Enter Device Name"
              fullWidth
            />
          </Grid>
          <Grid item>
            <Button
              size="large"
              variant="contained"
              color="primary"
              onClick={submitDataHandler}
              component="span"
              style={{ width: "80%", marginTop: 20, padding: 15 }}
            >
              {spinner && (
                <CircularProgress
                  style={{ color: "white", marginRight: 10 }}
                  disableShrink={false}
                  variant="indeterminate"
                  size={24}
                />
              )}
              ADD
            </Button>
          </Grid>
        </Grid>
      </Grid>
      {/* {devices} */}
    </div>
  );
}
