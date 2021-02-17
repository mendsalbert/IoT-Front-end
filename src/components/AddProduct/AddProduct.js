import React, { useState } from "react";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";
import axios from "axios";

// import { makeStyles } from "@material-ui/core/styles";

// const useStyle = makeStyles((theme) => ({
//   textInput: {
//     width: "60%",
//     [theme.breakpoints.down("sm")]: {
//       width: "80%",
//     },
//   },
// }));
export default function AddProduct(props) {
  //   const classes = useStyle();
  const [devices, setDevices] = useState([]);
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [purpose, setPurpose] = useState("");
  // const [topic, setTopic] = useState("");
  const [mqttId, setMqttId] = useState("");
  const [mqttPassword, setMqttPassword] = useState("");
  const [spinner, setSpinner] = useState(false);
  const setInputHandler = (e) => {
    setInput(e.target.value);
  };

  const setInputHandlerPurpose = (e) => {
    setPurpose(e.target.value);
  };

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
        "http://localhost:5000/device/api/add-device",
        {
          name: input,
          purpose: purpose,
          mqttId: mqttId,
          mqttPassword: mqttPassword,
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
        setMqttPassword("");
        setMqttId("");
        setPurpose("");
        window.location.reload();
        // console.log(suc);
      })
      .catch((e) => console.log(e));
    // }, 500);
  };

  return (
    <div>
      <Grid>
        <Grid item>
          <h1>Add a Device</h1>
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
              onChange={setInputHandler}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              id="standard-full-width"
              label="Enter device name"
              style={{ width: "80%", marginBottom: "20px" }}
              placeholder="Enter Device Name"
              fullWidth
            />

            <TextField
              value={purpose}
              onChange={setInputHandlerPurpose}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              id="standard-full-width"
              label="Enter purpose of device"
              style={{ width: "80%", marginBottom: "20px" }}
              placeholder="Enter the use of the Device eg: temperature"
              fullWidth
            />

            {/* <TextField
              value={topic}
              onChange={setInputHandlerTopic}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              id="standard-full-width"
              label="Enter topic "
              style={{ width: "80%", marginBottom: "20px" }}
              placeholder="Enter a topic to publish this device"
              fullWidth
            /> */}
            <TextField
              value={mqttId}
              onChange={(e) => setMqttId(e.target.value)}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              id="standard-full-width"
              label="Enter mqtt id "
              style={{ width: "80%", marginBottom: "20px" }}
              placeholder="Enter a MQTT ID"
              fullWidth
            />

            <TextField
              value={mqttPassword}
              onChange={(e) => {
                setMqttPassword(e.target.value);
              }}
              id="outlined-basic"
              label="Outlined"
              variant="outlined"
              id="standard-full-width"
              label="Enter mqtt password"
              type="password"
              style={{ width: "80%", marginBottom: "20px" }}
              placeholder="Enter a MQTT password"
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
