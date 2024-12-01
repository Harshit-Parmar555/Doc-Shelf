import * as React from "react";
import "./Drawer.css";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import menuicon from "../assets/menuicon.svg";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { authActions } from "../Redux Store/store";
export default function BasicMenu() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlelogout = async () => {
    try {
      const backendResponse = await axios.get("/api/v1/user/logout", {
        withCredentials: true,
      });

      // If the request is successful
      if (backendResponse.data.success === true) {
        toast("Logout Successfull", {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
        dispatch(authActions.logout());
        navigate("/login");
      } else {
        toast("Unexpected response: " + backendResponse.data.message, {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
      }
    } catch (error) {
      if (error.response) {
        // Errors from the server (e.g., 4xx, 5xx status codes)
        toast(error.response.data.message || "Something went wrong!", {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
      } else if (error.request) {
        // Errors related to no response from the server
        toast("No response from the server. Please try again later.", {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
      } else {
        // Other errors
        toast("An unexpected error occurred: " + error.message, {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
      }
    }
  };

  return (
    <div>
      <Button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        disableRipple
      >
        <img src={menuicon} alt="" />
      </Button>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
        sx={{
          "& .MuiPaper-root": {
            backgroundColor: "transparent",
            boxShadow: "none",
          },
        }}
      >
        <div className="MenuItem-Container">
          <MenuItem
            sx={{
              fontSize: "20px",
              fontFamily: "Poppins",
              textAlign: "center",
              height: "27%",
              "&:hover": { backgroundColor: "transparent" },
            }}
            disableRipple
            onClick={() => {
              navigate("/profile");
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            sx={{
              textAlign: "center",
              height: "27%",
              fontSize: "20px",
              "&:hover": { backgroundColor: "transparent" },
            }}
            disableRipple
            onClick={() => {
              navigate("/upload");
            }}
          >
            Upload File
          </MenuItem>

          <MenuItem
            sx={{
              textAlign: "center",
              height: "27%",
              fontSize: "20px",
              "&:hover": { backgroundColor: "transparent" },
            }}
            disableRipple
            onClick={() => {
              navigate("/receivedfiles");
            }}
          >
            Received file
          </MenuItem>

          <MenuItem
            sx={{
              color: "red",
              textAlign: "center",
              height: "27%",
              fontSize: "20px",
              "&:hover": { backgroundColor: "transparent" },
            }}
            disableRipple
            onClick={handlelogout}
          >
            Logout
          </MenuItem>
        </div>
      </Menu>
    </div>
  );
}
