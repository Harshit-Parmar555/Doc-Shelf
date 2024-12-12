import React from "react";

// Ui Imports
import { Card, CardContent } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Input } from "@/Components/ui/input";
import { Label } from "@/Components/ui/label";
import { Textarea } from "@/Components/ui/textarea";

import { useNavigate } from "react-router-dom";
const ContactUs = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="h-[100vh] w-[100vw] bg-slate-950 flex items-center justify-center">
        <Card className="w-[90%] h-[65%] text-center flex flex-col items-center md:w-[40%]">
          <CardContent className="h-[100%] w-[100%] flex flex-col items-center justify-evenly">
            <Label>Enter Your Name</Label>
            <Input />
            <Label>Enter Your Email</Label>
            <Input />
            <Label>Enter Your Email</Label>
            <Input />
            <Label>Enter Your Query/Complaint</Label>
            <Textarea />
            <Button>Send</Button>
            <Button onClick={()=>navigate("/")}>Back to Home</Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default ContactUs;
