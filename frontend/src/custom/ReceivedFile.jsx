import React from "react";
import { File as FileIcon, Delete, Share } from "lucide-react";
const ReceivedFile = () => {
  return (
    <div className="min-h-[55px] w-[90%] bg-fileback mt-10 border-b-[0.8px] border-gray-400 flex items-center justify-between">
      <FileIcon className="ml-4" />
      <h1>File Name</h1>
      <h1>Shared By : parmarharshit441@gmail.com</h1>
      <Delete className="text-red-600 mr-4" />
    </div>
  );
};

export default ReceivedFile;
