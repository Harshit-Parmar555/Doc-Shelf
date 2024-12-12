import React from "react";
import { FileCheck2, Download } from "lucide-react";



const ReceivedFile = (props) => {
  return (
    <>
      <div className="h-[20%] w-[90%] text-center   bg-white rounded mt-[3%] flex flex-col md:h-[15%] lg:flex-row lg:h-[10%] items-center justify-evenly ">
        <div className="ml-[2%] ">
          <FileCheck2 />
        </div>
        <div className="w-[90%] min-w-[30%]  flex justify-center overflow-x-scroll ">
          <h1>{props.filename}</h1>
        </div>
        <div className="w-[90%] min-w-[45%]   flex justify-center overflow-x-scroll ">
          <h1>Received by : {props.sender}</h1>
        </div>
        <div className="w-[90%] min-w-[20%]   flex justify-evenly ">
          <a href={props.filepath} target="_blank">
            <Download />
          </a>
        </div>
      </div>
    </>
  );
};

export default ReceivedFile;
