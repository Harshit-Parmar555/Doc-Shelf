import React from "react";
import ReceivedFile from "./ReceivedFile";

const ReceivedBox = () => {
  return (
    <div className="h-[100%] w-[96%] bg-black flex items-center justify-center">
      <div className="h-[90%] w-[90%] flex flex-col items-center">
        <div>
          <h1 className="font-kanit text-4xl text-white">
            Received Files Shelf
          </h1>
        </div>
        <div className="min-h-[80%] w-[90%] bg-back rounded-md mt-6 flex flex-col items-center overflow-y-scroll">
          <ReceivedFile />
          <ReceivedFile />
          <ReceivedFile />
          <ReceivedFile />
          <ReceivedFile />
          <ReceivedFile />
          <ReceivedFile />
          <ReceivedFile />
          <ReceivedFile />
          <ReceivedFile />
          <ReceivedFile />
        </div>
      </div>
    </div>
  );
};

export default ReceivedBox;
