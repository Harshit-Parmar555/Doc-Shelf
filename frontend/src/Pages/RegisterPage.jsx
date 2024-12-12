import React , {useState} from "react";

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

// Libraries Import
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

const RegisterPage = () => {
  const [loading, setloading] = useState(false);
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
        "/api/v1/doc-shelf/user/register",
        {
          username: data.username,
          email: data.email,
          password: data.password,
          confirmpassword: data.confirmpassword,
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
    }
    finally{
      setloading(false);
    }
  };
  return (
    <>
      <div className="h-lvh w-lvw flex flex-col  bg-slate-950 overflow-hidden">
        <Navbar />
        <div className="h-[70%] w-[95%] m-auto flex items-center justify-center md:w-[50%] lg:w-[30%]">
          <Card className="w-[90%]">
            <CardHeader>
              <CardTitle>Register Form</CardTitle>
              <CardDescription>
                Create Your Account in one-click.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Username</Label>
                    <Input
                      required
                      {...register("username", {
                        required: true,
                        minLength: {
                          value: 5,
                          message: "Username Should Contain 5 Words",
                        },
                        maxLength: {
                          value: 20,
                          message: "Username Cannot Contain More than 20 Words",
                        },
                      })}
                      id="name"
                      placeholder="Select Username"
                    />
                    {errors.username && <div>{errors.username.message}</div>}
                    <Label htmlFor="name">Email</Label>
                    <Input
                      required
                      {...register("email", {
                        required: true,
                        minLength: {
                          value: 5,
                          message: "Email Should Contain 5 Words",
                        },
                      })}
                      id="name"
                      placeholder="Enter Your Mail"
                      type="email"
                    />
                    {errors.email && <div>{errors.email.message}</div>}
                    <Label htmlFor="name">Passoword</Label>
                    <Input
                      required
                      {...register("password", {
                        required: true,
                        minLength: {
                          value: 5,
                          message: "Password Should Contain 5 Words",
                        },
                        maxLength: {
                          value: 10,
                          message: "Password Cannot Contain More than 10 Words",
                        },
                      })}
                      id="name"
                      placeholder="Set Your Password"
                    />
                    {errors.password && <div>{errors.password.message}</div>}
                    <Label htmlFor="name">Confirm Password</Label>
                    <Input
                      required
                      {...register("confirmpassword")}
                      id="name"
                      placeholder="Confirm Your Password"
                    />
                  </div>
                  {loading?<Button disabled className="opacity-55">Submitting . . . </Button>:<Button type="submit">Submit</Button>}
                  
                  
                  <h3
                    onClick={() => navigate("/login")}
                    className="m-auto cursor-pointer"
                  >
                    Already have an Account ??
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

export default RegisterPage;
