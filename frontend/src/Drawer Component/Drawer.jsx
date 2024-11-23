import * as React from "react";
import "./Drawer.css";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/MenuOutlined";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {useDispatch} from "react-redux"
import { authActions } from "../Redux Store/store";

export default function SwipeableTemporaryDrawer() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [state, setState] = React.useState({
    left: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List style={{ height: "60vh" }}>
        <div className="Dashboard-Page-Container-Left">
          <div className="Dashboard-Page-Container-Left-Drawer">
            <ul>
              <li
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </li>
              <li>About Us</li>
              <li>Contact Us</li>
            </ul>
          </div>
          <Divider />
          <div className="Dashboard-Page-Container-Left-Option">
            <button onClick={() => {navigate("/upload")}} style={{ backgroundColor: "#7767f1" }}>
              + Add New
            </button>
            <button style={{ backgroundColor: "red" }} onClick={handlelogout}>
              Logout
            </button>
          </div>
        </div>
      </List>
    </Box>
  );

  const handlelogout = async () => {
    try {
      const backendResponse = await axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });

      // If the request is successful
      if (backendResponse.data.success === true) {
        dispatch(authActions.logout());
        navigate("/login");
      } else {
        alert("Unexpected response: " + backendResponse.data.message);
      }
    } catch (error) {
      if (error.response) {
        // Errors from the server (e.g., 4xx, 5xx status codes)
        alert(error.response.data.message || "Something went wrong!");
      } else if (error.request) {
        // Errors related to no response from the server
        alert("No response from the server. Please try again later.");
      } else {
        // Other errors
        alert("An unexpected error occurred: " + error.message);
      }
    }
  };

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{<MenuIcon style={{ fontSize: "40px" , color:"black" , position:"absolute" }}/>}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
