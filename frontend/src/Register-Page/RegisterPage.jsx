import React, { useState } from "react";
import "./RegisterPage.css";
import Navbar1 from "../Navbar-1/Navbar1";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [picture, setpicture] = useState("");
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const formdata = new FormData();
    formdata.append("username", data.username);
    formdata.append("email", data.email);
    formdata.append("password", data.password);
    formdata.append("file", picture);
    try {
      setloading(true);
      const backendResponse = await axios.post(
        "/api/v1/user/register",
        formdata,
        { withCredentials: true }
      );

      // If the request is successful
      if (backendResponse.data.success === true) {
        toast(backendResponse.data.message, {
          position: "bottom-right",
          style: { backgroundColor: "black", color: "white" },
        });
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
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <Navbar1 />
      <div className="Register-Page-Container">
        <div className="Register-Page-Container-Left">
          <h2>Welcome to</h2>
          <h1>Doc-Shelf</h1>
          <p>Register on Doc Shelf to start storing, organizing, and sharing your documents effortlessly. Create your account in just a few steps and unlock seamless access to your files anytime, anywhere!</p>
        </div>
        <div className="Register-Page-Container-Right">
          <div className="Register-Page-Container-Right-Box">
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                type="text"
                placeholder="Enter Your Username"
                {...register("username", { required: true })}
              />
              {errors.username && <span>This field is required</span>}
              <input
                type="email"
                placeholder="Enter Your Email"
                {...register("email", { required: true })}
              />
              {errors.email && <span>This field is required</span>}
              <input
                type="text"
                placeholder="Enter Your Password"
                {...register("password", { required: true })}
              />
              {errors.password && <span>This field is required</span>}

              <input
                id="fileinput"
                className="file-input"
                type="file"
                placeholder="Select Profile Picture"
                onChange={(e) => setpicture(e.target.files[0])}
                required
              />
              <label htmlFor="fileinput" className="file-label">
                <span className="file-text">Choose Profile</span>
              </label>

              {loading ? (
                <button style={{ opacity: 0.5 }} disabled>
                  Submitting
                </button>
              ) : (
                <button type="submit">Submit</button>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
