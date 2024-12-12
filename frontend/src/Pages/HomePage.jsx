import React, { useEffect, useState } from "react";
import Navbar2 from "@/CustomeComponent/Navbar2";
import HomeContainer from "@/CustomeComponent/HomeContainer";
import HomeContainer2 from "@/CustomeComponent/HomeContainer2";
import { toast } from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { setUserDetails } from "@/Redux/userslice";
import axios from "axios";

const HomePage = () => {
  const theme = useSelector((state)=>state.theme.theme); 
  function formatJoinDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  const dispatch = useDispatch();
  const userdetail = async () => {
    try {
      const response = await axios.get(
        "/api/v1/doc-shelf/user/profiledetails",
        {
          withCredentials: true,
        }
      );

      // If the request is successful
      if (response.data.success === true) {
        const joindate = await formatJoinDate(response.data.user.createdAt);
        dispatch(
          setUserDetails({
            name: response.data.user.username,
            email: response.data.user.email,
            avatar: response.data.user.avatar,
            joinedat: joindate,
            document: response.data.user.files.length,
          })
        );
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast("No response from the server. Please try again later.");
      } else {
        toast("An unexpected error occurred: " + error.message);
      }
    }
  };
  useEffect(() => {
    userdetail();
  });
  return (
    <>
      <div className={`h-lvh w-lvw flex flex-col m-auto overflow-hidden transition-colors duration-500 ease-in-out ${
        theme ? "bg-white " : "bg-slate-950 "
      }`}>
        <Navbar2 />
        <div className="h-[86%] w-full flex  flex-col justify-evenly items-center">
          <HomeContainer />
          <HomeContainer2 />
        </div>
      </div>
    </>
  );
};

export default HomePage;
