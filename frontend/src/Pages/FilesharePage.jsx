import React, { useState } from "react";
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { toast } from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useForm } from "react-hook-form";
import { useLocation } from "react-router-dom";
const FilesharePage = () => {
  const [loading, setloading] = useState(false);
  const location = useLocation();
  const { state } = location;
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setloading(true)
      const response = await axios.post(
        "/api/v1/doc-shelf/file/sharefile",
        {
          filename: state.filename,
          filepath: state.downloadurl,
          email: data.email,
        },
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
    }finally{
      setloading(false);
    }
  };
  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-slate-950 flex items-center justify-center">
        <Card className="w-[23%] h-[40%]  text-center flex flex-col items-center justify-center">
           
          <CardContent className="h-[100%] w-[100%] ">
          <div className="h-[100%] w-[100%] flex flex-col items-center justify-evenly">
            <form
              className="w-[100%] h-[60%]  flex flex-col  justify-evenly"
              onSubmit={handleSubmit(onSubmit)}
            >
              <Label>Enter Receiver Email</Label>
              <Input {...register("email", { required: true })} />


              {loading? <Button disabled className="opacity-35">Sharing . . . .</Button>: <Button type="submit">Share</Button>}
             
             
              
            </form>
            <Button onClick={() => navigate("/home")}>Back to Home</Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default FilesharePage;
