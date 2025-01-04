import React from "react";
import avatar from "../assets/avatar.jpg";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/useAuthStore";
import { useThemeStore } from "@/store/useThemeStore";

import { formatMongoDate } from "@/lib/date";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

import { useForm } from "react-hook-form";

const ProfileBox = () => {
  const { theme } = useThemeStore();
  const { authUser, logout, update, updating } = useAuthStore();
  const joinedat = formatMongoDate(authUser.createdAt);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const form = new FormData();
    form.append("profile", data.profile[0]);
    update(form);
  };
  return (
    <div
      className={`h-[100%] w-[96%] flex items-center justify-center ${
        theme ? "bg-white" : "bg-black"
      } transition-colors duration-500 ease-in-out`}
    >
      <Card className="w-[320px] md:w-[500px] bg-back border-none">
        <CardHeader className="">
          <div className="flex items-center justify-between text-white">
            <div>
              <h1 className="font-poppins font-xl">Hello 👋 ,</h1>
              <h1 className="font-kanit text-xl md:text-3xl ">
                {authUser.username}
              </h1>
            </div>
            <div className="flex flex-col items-center">
              <Avatar className="h-[60px] w-[60px] md:w-[80px] md:h-[80px]">
                <AvatarImage src={authUser.profile || avatar} />
              </Avatar>
            </div>
          </div>
        </CardHeader>
        <CardContent className="text-center text-white">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex items-center justify-evenly"
          >
            <Input
              required
              {...register("profile")}
              className="w-[40%]"
              type="file"
            />
            {updating ? (
              <Button disabled>Updating . . .</Button>
            ) : (
              <Button type="submit">Update Profile</Button>
            )}
          </form>

          <h1 className="mt-6 font-poppins font-base">
            Joined Doc-Shlef : {joinedat}
          </h1>
        </CardContent>
        <CardFooter className="flex items-center justify-center">
          <Button
            onClick={() => logout()}
            className="bg-red-600 text-white p-4 mt-4 hover:bg-red-600"
          >
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default ProfileBox;
