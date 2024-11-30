import * as React from "react";
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
        <img src={menuicon} alt="" style={{ filter: "invert(1)" }} />
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
            width: "220px",
            height: "250px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "space-between",
          },
        }}
      >
        <div style={{ height: "200px" }}>
          <MenuItem
            sx={{
              fontSize: "20px",
              fontFamily: "Poppins",
              textAlign: "center",
              height: "35%",
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
              height: "35%",
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
              color: "red",
              textAlign: "center",
              height: "35%",
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
