import React, { useEffect } from "react";
import File from "./File";
import { Loader } from "lucide-react";
import { useFileStore } from "@/store/useFileStore";
import { useThemeStore } from "@/store/useThemeStore";
const MainBox = () => {
  const { fetching, fetch, documents } = useFileStore();
  const { theme } = useThemeStore();
  useEffect(() => {
    fetch();
  }, [fetch]);

  if (fetching === true) {
    return (
      <div className="flex items-center justify-center h-[100%] w-[96%]">
        <Loader className="size-10 animate-spin invert" />
      </div>
    );
  }

  return (
    <div
      className={`h-[100%] w-[96%]  ${
        theme ? "bg-white" : "bg-black"
      } flex items-center justify-center`}
    >
      <div className="h-[90%] w-[90%] flex flex-col items-center">
        <div>
          <h1 className="font-kanit text-4xl text-white">MY SHELF</h1>
        </div>
        <div
          className={`min-h-[90%] w-[98%] md:w-[94%] lg:w-[90%] ${
            theme ? "bg-gray-300" : "bg-back"
          } rounded-md mt-6 flex flex-col items-center overflow-y-scroll transition-colors duration-500 ease-in-out`}
        >
          {documents.length > 0 ? (
            documents.map((file, index) => (
              <File
                key={index}
                id={file._id}
                filename={file.filename}
                url={file.downloadurl}
                date={file.createdAt}
              />
            ))
          ) : (
            <p className="font-kanit text-xl text-white mt-6">
              No Document Found.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default MainBox;
