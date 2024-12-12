import React, { useState } from "react";

// Ui Imports
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "react-hot-toast";

// Library Import
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";

const UploadPage = () => {
  const theme = useSelector((state) => state.theme.theme);
  const navigate = useNavigate();
  const [loading, setloading] = useState(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const formdata = new FormData();
    formdata.append("filename", data.filename);
    formdata.append("file", data.file[0]);
    try {
      setloading(true);
      const response = await axios.post(
        "/api/v1/doc-shelf/file/uploadfile",
        formdata,
        { withCredentials: true }
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
    } finally {
      setloading(false);
    }
  };
  return (
    <>
      <div
        className={`h-[100vh] w-[100vw] ${
          theme ? "bg-white" : "bg-slate-950"
        } flex items-center justify-center`}
      >
        <Card
          className={`w-[90%] h-[50%] text-center ${
            theme ? "bg-gray-400 text-black" : "bg-black text-white"
          } flex flex-col items-center justify-center md:w-[50%] lg:w-[23%]`}
        >
          <CardContent className="h-[100%] ">
            <div className="h-[100%] w-[100%] ">
              <form
                className="w-[100%] h-[80%]  flex flex-col  justify-evenly"
                onSubmit={handleSubmit(onSubmit)}
              >
                <Label>Enter File Name</Label>
                <Input {...register("filename", { required: true })} />
                <Label>Select File to Upload</Label>
                <Input {...register("file", { required: true })} type="file" />
                {loading ? (
                  <Button disabled className="opacity-55">
                    Uploading . . .{" "}
                  </Button>
                ) : (
                  <Button type="submit">Upload</Button>
                )}
              </form>
              <Button onClick={() => navigate("/home")}>Back to Home</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default UploadPage;
