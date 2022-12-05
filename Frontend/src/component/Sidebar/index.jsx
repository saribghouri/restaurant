import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import Menu from "@mui/material/Menu";
import Avatar from "@mui/material/Avatar";
import Tooltip from "@mui/material/Tooltip";
import MenuItem from "@mui/material/MenuItem";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { GlobalContext } from "../context";
import Dashboard from "../Dashboard";

const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  padding: theme.spacing(0, 1),

  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

export default function Sidebar() {
  let { state, dispatch } = React.useContext(GlobalContext);
  const navigation = useNavigate();
  const Settingnavigation = useNavigate();
  const Categorynavigation = useNavigate();
  const Taxnavigation = useNavigate();
  const Tablenavigation = useNavigate();
  const Productnavigation = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState(null);

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const handleClick = () => {
    navigation("/profile");
  };
  const handleClickSettings = () => {
    Settingnavigation("/settings");
  };
  const handleCategory = () => {
    Categorynavigation("/category");
  };
  const handleTable = () => {
    Tablenavigation("/table");
  };
  const handleTax = () => {
    Taxnavigation("/tax");
  };
  const handleProduct = () => {
    Productnavigation("/Product");
  };

  console.log(state.user);
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <div className="nav">
        <AppBar
          position="fixed"
          display="flex"
          justifyContent="flex-end"
          open={open}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              sx={{
                marginRight: 5,
                ...(open && { display: "none" }),
              }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div">
              DASHBOARD
            </Typography>

            <Box sx={{ flexGrow: 1 }} />
            <Box
              sx={{
                flexGrow: 0,
                display: "flex",
                justifyContent: "flex-end",
              }}
            >
              <List>
                <ListItemButton sx={{ textAlign: "center", color: "white" }}>
                  <ListItemText
                    primary={state.user.name ? state.user.name : "master"}
                  />
                </ListItemButton>
              </List>

              <Tooltip title="Open settings">
                <IconButton
                  onClick={handleOpenUserMenu}
                  sx={{ p: 0, display: "flex", justifyContent: "flex-end" }}
                >
                  <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg" />
                </IconButton>
              </Tooltip>
              <Menu
                sx={{ mt: "45px" }}
                id="menu-appbar"
                anchorEl={anchorElUser}
                anchorOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "right",
                }}
                open={Boolean(anchorElUser)}
                onClose={handleCloseUserMenu}
              >
                <MenuItem key={"profile"} onClick={handleClick}>
                  <Typography textAlign="center">Profile</Typography>
                </MenuItem>
                <MenuItem key={"setting"} onClick={handleClickSettings}>
                  <Typography textAlign="center">Settings</Typography>
                </MenuItem>
                <MenuItem key={"logout"} onClick={() => {}}>
                  <Typography textAlign="center">logout</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Toolbar>
        </AppBar>
      </div>
      <Drawer variant="permanent" open={open}>
        <DrawerHeader>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          <ListItem key={"Category"} onClick={handleCategory}>
            <ListItemButton
              sx={{
                minHeight: 45,
                justifyContent: open ? "initial" : "center",
                px: 2.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              Category
              {/* <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} /> */}
            </ListItemButton>
          </ListItem>
          <ListItem key={"table"} onClick={handleTable}>
            <ListItemButton
              sx={{
                minHeight: 30,
                justifyContent: open ? "initial" : "center",
                px: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              Table
              {/* <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} /> */}
            </ListItemButton>
          </ListItem>
          <ListItem key={"tax"} onClick={handleTax}>
            <ListItemButton
              sx={{
                minHeight: 30,
                justifyContent: open ? "initial" : "center",
                px: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              Tax
              {/* <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} /> */}
            </ListItemButton>
          </ListItem>
          <ListItem key={"product"} onClick={handleProduct}>
            <ListItemButton
              sx={{
                minHeight: 30,
                justifyContent: open ? "initial" : "center",
                px: 1.5,
              }}
            >
              <ListItemIcon
                sx={{
                  minWidth: 0,
                  mr: open ? 3 : "auto",
                  justifyContent: "center",
                }}
              >
                {2 === 0 ? <InboxIcon /> : <MailIcon />}
              </ListItemIcon>
              Product
              {/* <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} /> */}
            </ListItemButton>
          </ListItem>
        </List>
        <Divider />
        <List>
          {["User", "Order", "Billing"].map((text, index) => (
            <ListItem key={text} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                sx={{
                  minHeight: 30,
                  justifyContent: open ? "initial" : "center",
                  px: 2.2,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : "auto",
                    justifyContent: "center",
                  }}
                >
                  {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                </ListItemIcon>
                <ListItemText primary={text} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
}
