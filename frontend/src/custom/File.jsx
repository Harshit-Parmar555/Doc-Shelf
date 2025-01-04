import React from "react";
import { File as FileIcon, Delete, Download } from "lucide-react";
import { formatMongoDate } from "@/lib/date";
import { useFileStore } from "@/store/useFileStore";
const File = (props) => {
  const newdate = formatMongoDate(props.date);
  const {deletefile} = useFileStore();
  return (
    <div className="min-h-[55px] w-[90%] bg-fileback mt-10 border-b-[0.8px] border-gray-400 flex items-center justify-between">
      <FileIcon className="ml-4" />
      <h1>{props.filename}</h1>
      <h1 className="hidden md:flex lg:flex">{newdate}</h1>
      <a href={props.url} target="_blank"><Download /></a>
      <Delete onClick={()=>deletefile(props.id)} className="text-red-600 mr-4" />
    </div>
  );
};

export default File;
