import React from "react";
import { File as FileIcon, Download } from "lucide-react";
import { formatMongoDate } from "@/lib/date";
import { useFileStore } from "@/store/useFileStore";
import DeleteDialog from "./DeleteDialog";
const File = (props) => {
  const newdate = formatMongoDate(props.date);
  const { deletefile } = useFileStore();
  return (
    <div className="min-h-[55px] w-[90%] md:w-[70%] bg-fileback mt-10 border-b-[0.8px] border-gray-400 flex items-center justify-between">
      <FileIcon className="ml-2" />
      <div className="flex-1 ml-4 overflow-hidden">
        <h1 className="text-sm w-full overflow-hidden text-ellipsis whitespace-nowrap">
          {props.filename}
        </h1>
        <p className="text-xs text-gray-500">{newdate}</p>
      </div>

      <div className="flex items-center w-auto ml-2">
        <a className="mr-5 md:mr-16" href={props.url} target="_blank">
          <Download />
        </a>
        <DeleteDialog id={props.id} className="mr-5" />
      </div>
    </div>
  );
};

export default File;
