import React, { useState } from "react";

// Ui Imports
import { Button } from "@/Components/ui/button";
import {
  Card,
  CardHeader,
  CardDescription,
  CardTitle,
  CardContent,
} from "@/Components/ui/card";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import Navbar from "@/CustomeComponent/Navbar";
import { toast } from "react-hot-toast";

//Libraries Import
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

//Redux Import
import { useDispatch } from "react-redux";
import { login } from "../Redux/authslice";

const LoginPage = () => {
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      setloading(true);
      const response = await axios.post(
        "/api/v1/doc-shelf/user/login",
        {
          email: data.email,
          password: data.password,
        },
        { withCredentials: true }
      );

      // If the request is successful
      if (response.data.success === true) {
        dispatch(login());
        navigate("/home");
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
      <div className="h-lvh w-lvw flex flex-col  bg-slate-950 overflow-hidden">
        <Navbar />
        <div className="h-[70%] w-[90%]  m-auto flex items-center justify-center md:w-[50%] lg:w-[30%]">
          <Card className="w-[95%]">
            <CardHeader>
              <CardTitle>Login Form</CardTitle>
              <CardDescription>
                Start Using Doc-Shelf in one Click
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Email</Label>
                    <Input
                      {...register("email")}
                      type="email"
                      id="name"
                      placeholder="Enter Your Mail"
                      required
                    />
                    <Label htmlFor="name">Passoword</Label>
                    <Input
                      {...register("password")}
                      type="text"
                      id="name"
                      placeholder="Enter Your Password"
                      required
                    />
                  </div>
                  {loading ? (
                    <Button disabled className="opacity-35" >Submitting . . .</Button>
                  ) : (
                    <Button type="submit">Submit</Button>
                  )}

                  <h3
                    onClick={() => navigate("/register")}
                    className="m-auto cursor-pointer"
                  >
                    Not have an account ??
                  </h3>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
