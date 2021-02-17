import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FileCopyIcon from "@material-ui/icons/FileCopy";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import Snackbar from "@material-ui/core/Snackbar";
import FilledInput from "@material-ui/core/FilledInput";
import { useParams } from "react-router-dom";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
  in: {
    width: "60px",
  },
}));
const DeviceDetail = (props) => {
  const { id } = useParams();
  const [singleDevice, setSingleDevice] = useState({
    devData: [],
  });

  useEffect(() => {
    axios
      .get(`http://localhost:5000/device/api/single-device/${id}`)
      .then((dev) => {
        // const filter = dev.data;
        setSingleDevice({ ...singleDevice, devData: dev.data });
        // console.log(singleDevice);
      });
  }, []);

  // console.log(singleDevice.devData.name);
  // console.log(props.match.params.id);
  const classes = useStyles();

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };

  const copyToClipboardHandler = () => {
    var copyText = document.getElementById("myInput");
    copyText.select();
    copyText.setSelectionRange(0, 99999);
    document.execCommand("copy");
    handleClick();
    // alert("Copied the text: " + copyText.value);
  };
  return (
    <Grid>
      <Grid item>
        <Typography variant="h4">
          Device Name :{singleDevice.devData.name}
        </Typography>
      </Grid>
      <Grid item>
        <Snackbar
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          open={open}
          autoHideDuration={4000}
          onClose={handleClose}
          message="Device ID copied"
        />
        ;
        <TextField
          id="filled-full-width"
          label="Device Name"
          value={singleDevice.devData.name}
          fullWidth
          style={{ width: "80%", marginBottom: 40 }}
          margin="normal"
          disabled={true}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
        />
      </Grid>
      <Grid item>
        <FilledInput
          id="myInput"
          label="Device ID"
          fullWidth
          value={singleDevice.devData.dev_id}
          style={{ width: "80%" }}
          margin="normal"
          disabled={true}
          InputLabelProps={{
            shrink: true,
          }}
          variant="filled"
          endAdornment={
            <InputAdornment position="end">
              <IconButton onClick={copyToClipboardHandler}>
                <FileCopyIcon />
              </IconButton>
            </InputAdornment>
          }
        />
      </Grid>
    </Grid>
  );
};
export default DeviceDetail;
