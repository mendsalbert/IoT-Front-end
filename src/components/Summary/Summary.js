import openSocket from "socket.io-client";
import React, { useState, useEffect } from "react";
import axios from "axios";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import GetAppIcon from "@material-ui/icons/GetApp";
import FileSaver from "file-saver";

const useStyles = makeStyles((theme) => ({
  btn: {
    width: "100%",
  },
}));
const SimpleCard = (props) => {
  const [deviceData, setDeviceData] = useState({
    devData: [],
  });

  const [downloadData, setDownloadData] = useState({
    dData: [],
  });

  const [all, setAll] = useState([]);
  const classes = useStyles();
  useEffect(() => {
    var token = localStorage.getItem("UserToken");
    axios
      .get("http://localhost:5000/device/api/all-device", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((dev) => {
        setDeviceData({ ...deviceData, devData: dev.data });
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    const socket = openSocket("http://localhost:5000");
    socket.on("data", (data) => {
      setAll(data.message);
    });
  }, []);

  const downloadDataHandler = (purpose) => {
    var token = localStorage.getItem("UserToken");
    axios
      .get(
        `http://localhost:5000/device/api/summary/get-summary-data/${purpose}`,
        {
          headers: {
            "x-auth-token": token,
          },
        }
      )
      .then((dev) => {
        // setDownloadData({ ...downloadData, dData: dev.data });

        setDownloadData({ ...downloadData, dData: dev.data });
      })
      .catch((e) => console.log(e));
    var arr = [];
    for (let index = 0; index < downloadData.dData.length; index++) {
      arr.push(downloadData.dData[index].device);
    }

    var file = new File(arr, `${purpose}.txt`, {
      type: "text/plain;charset=utf-8",
    });
    FileSaver.saveAs(file);
  };
  return (
    <Grid>
      <Grid
        container
        direction="row"
        sm={12}
        justify="space-evenly"
        spacing={4}
        item
      >
        {deviceData.devData.map((d, i) => (
          <Grid
            item
            alignItems="center"
            justify="space-evenly"
            direction="column"
            spacing={6}
          >
            <Card style={{ width: 275, borderRadius: 15, height: 350 }}>
              <CardContent
                style={{
                  height: 160,
                  backgroundColor: "#2222",
                  textAlign: "center",
                }}
              >
                {/* <Brightness4SharpIcon
                  fontSize="large"
                  style={{ fontSize: 90, textAlign: "center", color: "white" }}
                /> */}
              </CardContent>
              <CardContent>
                <Typography variant="h2" style={{ textAlign: "center" }}>
                  {all[i] === undefined ? 0 : all[i].value}
                  {/* {i} */}
                  {/* {d.purpose} */}
                  {/* {d.purpose === "temperature" ? "C" : "%"} */}
                </Typography>

                <Typography
                  variant="h5"
                  component="h5"
                  color="textSecondary"
                  style={{ textAlign: "center" }}
                >
                  {d.purpose}
                </Typography>
              </CardContent>
              <CardContent>
                <Button
                  size="small"
                  className={classes.btn}
                  color="primary"
                  variant="contained"
                  startIcon={<GetAppIcon />}
                  onClick={() => downloadDataHandler(d.purpose)}
                >
                  Download Data
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};

export default SimpleCard;
