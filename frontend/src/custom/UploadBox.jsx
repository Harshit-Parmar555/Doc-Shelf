import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { useFileStore } from "@/store/useFileStore";
import { useThemeStore } from "@/store/useThemeStore";

const UploadBox = () => {
  const { theme } = useThemeStore();
  const { upload, uploading } = useFileStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const form = new FormData();
    form.append("filename", data.filename);
    form.append("file", data.file[0]);
    upload(form);
  };
  return (
    <div
      className={`h-[100%] w-[96%] ${
        theme ? "bg-white" : "bg-black"
      } flex items-center justify-center transition-colors duration-500 ease-in-out`}
    >
      <Card
        className={`w-[320px] md:w-[350px] ${
          theme ? "bg-gray-300" : ""
        } transition-colors ease-in-out duration-500`}
      >
        <CardHeader>
          <CardTitle>Upload Document</CardTitle>
          <CardDescription>Upload Your Document In One Click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col items-center"
          >
            <Input
              {...register("filename")}
              className="mt-4"
              placeholder="Set Your File Name"
            />
            <Input
              {...register("file")}
              className="mt-8"
              type="file"
              accept=".pdf, .jpg, .jpeg, .png"
              placeholder="Select Your File"
            />
            {uploading ? (
              <Button disabled className="mt-8">
                Wait . . .
              </Button>
            ) : (
              <Button type="submit" className="mt-8">
                Upload
              </Button>
            )}
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UploadBox;
