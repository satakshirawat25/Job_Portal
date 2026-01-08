import React, { useState } from "react";
import Navbar from "../shared/Navbar";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup  } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { set } from "mongoose";

const Login = () => {
    const [input,setInput]=useState({
        fullname:"",
        email:"",
        phoneNumber:"",
        password:"",
        role:"",
        file:""
    })

    const changeEventHandler = (e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const changeFileHandler = (e)=>{
        setInput({...input,file:e.taget.files?.[0]})
    }


  return (
    <div>
    <Navbar/>
      <div className="flex items-center justify-center  max-w-7xl mx-auto">
        <form
          action=""
          className="w-1/2 border border-gray-200  rounded-md p-4 my-10"
        >
          <h1 className="font-bold text-xl mb-5">Login</h1>
         

          <div className="my-4">
            <Label className="block mb-2">Email</Label>
            <Input type="email" placeholder="enter your email" />
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
          </div>
          <Button type="submit" className="w-full my-4 bg-black text-white hover:bg-[#360998]">Signup</Button>
          <span className="text-sm">Don't have an account?<Link to="/signup" className="text-blue-700">Signup</Link></span>
        </form>
      </div>
    </div>
  );
};

export default Login;







