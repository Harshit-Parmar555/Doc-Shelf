import React from "react";
import {
  File as FileIcon,
  Delete,
  Download,
  EllipsisVertical,
} from "lucide-react";
import { formatMongoDate } from "@/lib/date";
import { useFileStore } from "@/store/useFileStore";
import DeleteDialog from "./DeleteDialog";
const File = (props) => {
  const newdate = formatMongoDate(props.date);
  const { deletefile } = useFileStore();
  return (
    <div className="min-h-[55px] w-[90%] bg-fileback mt-10 border-b-[0.8px] border-gray-400 flex items-center justify-between">
      <FileIcon className="ml-4" />
      <h1>{props.filename}</h1>
      <h1 className="hidden md:flex lg:flex">{newdate}</h1>
      <div className="flex items-center">
        <a className="mr-5 md:mr-16" href={props.url} target="_blank">
          <Download />
        </a>
        <DeleteDialog id={props.id} className="mr-5"/>
      </div>
    </div>
  );
};

export default File;
