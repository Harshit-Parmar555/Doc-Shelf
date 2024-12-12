import React from "react";
import { FileCheck2, Download, Delete, Share2 } from "lucide-react";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import axios from "axios";
const File = (props) => {
  const navigate = useNavigate();
  function formatJoinDate(isoDate) {
    const date = new Date(isoDate);
    const options = { year: "numeric", month: "long", day: "numeric" };
    return date.toLocaleDateString(undefined, options);
  }
  const date = formatJoinDate(props.uploadedat);
  const handledelete = async () => {
    try {
      const response = await axios.delete(
        `/api/v1/doc-shelf/file/deletefile/${props.id}`,
        {
          withCredentials: true,
        }
      );

      // If the request is successful
      if (response.data.success === true) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else if (error.request) {
        toast.error("No response from the server. Please try again later.");
      } else {
        toast.error("An unexpected error occurred: " + error.message);
      }
    }
  };
  return (
    <>
      <div className="h-[30%] w-[60%] text-center min-h-[14%] bg-white rounded mt-[5%] flex flex-col items-center justify-evenly lg:flex-row lg:h-[14%] lg:w-[80%]">
        <div className="ml-[2%]">
          <FileCheck2 />
        </div>
        <div className="w-[90%] min-w-[35%]  flex justify-center overflow-x-scroll">
          <h1>{props.filename}</h1>
        </div>
        <div className="w-[90%] min-w-[30%]   flex justify-center overflow-x-scroll">
          <h1> Uploaded at : {date}</h1>
        </div>
        <div className="w-[90%] min-w-[30%]   flex justify-evenly">
          <a href={props.downloadurl} target="_blank">
            <Download />
          </a>
          <Delete color="red" onClick={handledelete} />
          <Share2
            onClick={() =>
              navigate(`/sharefile/${props.id}`, {
                state: {
                  id: props.id,
                  filename: props.filename,
                  downloadurl: props.downloadurl,
                },
              })
            }
          />
        </div>
      </div>
    </>
  );
};

export default File;
