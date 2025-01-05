import React from "react";
import { useForm } from "react-hook-form";

// Components Import
import Navbar from "@/custom/authNavbar";
import {
  Card,
  CardContent,
  CardDescription,
  CardTitle,
  CardHeader,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

// Store Import
import { useAuthStore } from "@/store/useAuthStore";

// Picture Import
import SidePic from "../assets/auth.png";
const Register = () => {
  const { signup, signing } = useAuthStore();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    signup(data);
  };
  return (
    <div className="h-screen w-screen bg-black">
      <Navbar />
      <div className="flex items-center justify-center">
        <div className="flex mt-16 border-gray-600 border-[1px] p-4 rounded-2xl">
          <div>
            <Card className="w-[350px]">
              <CardHeader>
                <CardTitle>Register Page</CardTitle>
                <CardDescription>
                  Create Your Account In One Click.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  className="flex flex-col items-center justify-evenly"
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Label className="mt-2">Enter Your Username</Label>
                  <Input className="mt-2" {...register("username")} required />
                  <Label className="mt-2">Enter Your Email</Label>
                  <Input
                    className="mt-2"
                    {...register("email")}
                    required
                    type="email"
                  />
                  <Label className="mt-2">Enter Your Password</Label>
                  <Input className="mt-2" {...register("password")} required />
                  <Label className="mt-2">Enter Your Confirm Password</Label>
                  <Input
                    className="mt-2"
                    {...register("confirmpassword")}
                    required
                  />
                  {signing ? (
                    <Button disabled className="mt-4 ">
                      Wait . . .
                    </Button>
                  ) : (
                    <Button className="mt-4" type="submit">
                      Register
                    </Button>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="w-[350px] ml-8 hidden md:flex">
            <img
              src={SidePic}
              alt=""
              className="h-full w-full object-contain rounded-lg invert"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
