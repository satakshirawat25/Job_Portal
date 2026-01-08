import React from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup  } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";

const Signup = () => {
  return (
    <div>
      <Navbar />
      <div className="flex items-center justify-center max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-200 rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Signup</h1>
          <div className="my-4 ">
            <Label className="block mb-2">Full Name</Label>
            <Input type="text" placeholder="enter your name" />
          </div>

          <div className="my-4">
            <Label className="block mb-2">Email</Label>
            <Input type="email" placeholder="enter your email" />
          </div>

          <div className="my-4">
            <Label className="block mb-2">Phone Number</Label>
            <Input type="number" placeholder="enter your phoneNumber" />
          </div>

          <div className="my-4 ">
            <Label className="block mb-2">password</Label>
            <Input type="text" placeholder="password" />
          </div>

          <div className="flex items-center justify-between">
            <RadioGroup className="flex items-center gap-4 my-5">

              <div className="flex items-center gap-3 space-x-2">
                <Input
                type="radio"
                name="role"
                value="student"
                className="cursor-pointer"
                />
                <Label htmlFor="r1">Student</Label>
              </div>

              <div className="flex items-center gap-3 space-x-2">
                <Input
                type="radio"
                name="role"
                value="recruiter"
                className="cursor-pointer"
                />
                <Label htmlFor="r2">Recruiter</Label>
              </div>
              
            </RadioGroup>
            <div className="flex items-center gap-2">
                <Label>Profile</Label>
                <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                />
            </div>
          </div>
          <Button type="submit" className="w-full my-4 bg-black text-white hover:bg-[#360998]">Signup</Button>
          <span className="text-sm">Already have an account?<Link to="/login" className="text-blue-700">Login</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Signup;






