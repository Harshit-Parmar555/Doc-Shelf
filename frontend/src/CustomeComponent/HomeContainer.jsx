import React, { useEffect, useState } from "react";
import File from "./File";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useDispatch , useSelector } from "react-redux";
import { logout } from "../Redux/authslice";
import { clearUserDetails } from "@/Redux/userslice";
const HomeContainer = () => {
  const theme = useSelector((state)=>state.theme.theme); 
  const dispatch = useDispatch();
  const [files, setfiles] = useState([]);
  const fetchfile = async () => {
    try {
      const response = await axios.get("/api/v1/doc-shelf/file/fetchfile", {
        withCredentials: true,
      });

      // If the request is successful
      if (response.data.success === true) {
        setfiles(response.data.files);
      } else if (response.data.message === "Not Authorized") {
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response.data.message === "Not Authorized") {
        toast.error(error.response.data.message);
        dispatch(logout());
        dispatch(clearUserDetails())
      } else if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred: " + error.message);
      }
    }
  };
  useEffect(() => {
    fetchfile();
  }, []);

  return (
    <>
      <div className={`h-[70%] w-[90%] min-w-[90%] max-w-[70%] md:min-w-[70%] lg:min-w-[60%] ${theme?"bg-gray-400":"bg-black"}  rounded-xl flex flex-col items-center  overflow-y-scroll transition-colors duration-500 ease-in-out`}>
        {files.length > 0 ? (
          files.map((file, index) => (
            <File
              key={index}
              id={file._id}
              filename={file.filename}
              downloadurl={file.downloadurl}
              uploadedat={file.createdAt}
            />
          ))
        ) : (
          <p className="text-white mt-[4%]">No files found.</p>
        )}
      </div>
    </>
  );
};

export default HomeContainer;
