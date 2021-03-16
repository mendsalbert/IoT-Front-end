import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles, useTheme } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import AddIcon from "@material-ui/icons/Add";
import BarChartIcon from "@material-ui/icons/BarChart";
import TimelineIcon from "@material-ui/icons/Timeline";
import { Route, Link, useHistory } from "react-router-dom";
import Collapse from "@material-ui/core/Collapse";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";
import AddProduct from "../AddProduct/AddProduct";
import Summary from "../Summary/Summary";
import Details from "../Details/Details";
import MemoryIcon from "@material-ui/icons/Memory";
import DeviceDetail from "../DeviceDetail/DeviceDetail";
import axios from "axios";
import AccountTreeIcon from "@material-ui/icons/AccountTree";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";
import AddProject from "../AddProject/AddProject";
import { useDispatch, useSelector } from "react-redux";
import LogOut from "../Auth/LogOut";
import * as authAction from "../../store/actions/authAction";
import { Redirect } from "react-router";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

export default function MiniDrawer(props) {
  const [deviceData, setDeviceData] = useState({
    devData: [],
  });
  // const [allDevices, setAllDevices] = useState([]);
  // console.log(allDevices);
  const [title, setTitle] = useState("");
  const userId = useSelector((state) => state.auth.userId);
  useEffect(() => {
    var token = localStorage.getItem("UserToken");
    axios
      .get("http://10.10.64.11:5000/device/api/all-device", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((dev) => {
        // console.log(dev.data);
        setDeviceData({ ...deviceData, devData: dev.data });
      })
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    var token = localStorage.getItem("UserToken");
    axios
      .get("http://10.10.64.11:5000/device/api/project/get-project-title", {
        headers: {
          "x-auth-token": token,
        },
      })
      .then((dev) => {
        var projectTitle = dev.data.name;
        setTitle(projectTitle);
        // setDeviceData({ ...deviceData, devData: dev.data });
      })
      .catch((e) => console.log(e));
  }, []);

  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const [openMore, setOpenMore] = React.useState(false);
  // const [allData, setAllData] = useState([]);
  const handleClick = () => {
    setOpen(!openMore);
  };

  const [value, setValue] = useState(0);
  // console.log(window.location.pathname);

  useEffect(() => {
    if (window.location.pathname === "/add-product" && value !== 0) {
      setValue(0);
    } else if (window.location.pathname === "/summary" && value !== 1) {
      setValue(1);
    } else if (window.location.pathname === "/details" && value !== 2) {
      setValue(2);
    } else if (window.location.pathname === "/add-project" && value !== 3) {
      setValue(3);
    }
    // } else if (window.location.pathname === "/" && value !== 4) {
    //   setValue(4);
    // }
  });

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            {title}
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem
            onClick={() => setValue(3)}
            button
            key={Math.random(0, 1)}
            component={Link}
            to="/add-project"
            selected={value === 3}
          >
            <ListItemIcon>
              <AccountTreeIcon />
            </ListItemIcon>
            <ListItemText primary="Project" />
          </ListItem>
          <ListItem
            onClick={() => {
              setValue(0);
              setOpenMore(!openMore);
            }}
            button
            key={Math.random(0, 1)}
            component={Link}
            to="/add-product"
            selected={value === 0}
          >
            <ListItemIcon>
              <AddIcon />
            </ListItemIcon>
            <ListItemText primary="Add Device" />
            {openMore ? <ExpandLess /> : <ExpandMore />}
          </ListItem>
          {/* Render dynamic devices here */}
          <Collapse in={openMore} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
              {deviceData.devData.map((devices) => (
                <ListItem
                  button
                  className={classes.nested}
                  component={Link}
                  to={`/${devices.name}/${devices._id}`}
                >
                  <ListItemIcon>
                    <MemoryIcon />
                  </ListItemIcon>
                  <ListItemText primary={devices.name} />
                </ListItem>
              ))}
            </List>
          </Collapse>
          {/* Render Dynamic devices here */}
        </List>
        <Divider />
        <List>
          <ListItem
            onClick={() => setValue(1)}
            button
            key={Math.random(0, 1)}
            component={Link}
            to="/summary"
            selected={value === 1}
          >
            <ListItemIcon>
              <TimelineIcon />
            </ListItemIcon>
            <ListItemText primary="Summary" />
          </ListItem>

          <ListItem
            onClick={() => setValue(2)}
            button
            key={Math.random(0, 1)}
            component={Link}
            to="/details"
            selected={value === 2}
          >
            <ListItemIcon>
              <BarChartIcon />
            </ListItemIcon>
            <ListItemText primary="Details" />
          </ListItem>
          <ListItem
            onClick={() => setValue(4)}
            button
            key={Math.random(0, 1)}
            to="/log-out"
            selected={value === 4}
            component={Link}
          >
            <ListItemIcon>
              <AccountCircleIcon />
            </ListItemIcon>
            <ListItemText primary="Log Out" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        <div className={classes.toolbar} />

        <Route path="/add-project" component={() => <AddProject />} />
        <Route path="/add-product" component={() => <AddProduct />} />
        {/* <Route
          path="/summary"
          component={() => <Summary allDevices={props.allDeviceData} />}
        /> */}
        <Route path="/summary" component={Summary} />
        <Route path="/details" component={Details} />
        <Route path="/log-out" component={LogOut} />
        {deviceData.devData.map((routes) => (
          <Route
            path={`/${routes.name}/:id`}
            component={() => <DeviceDetail />}
          />
        ))}
      </main>
    </div>
  );
}
