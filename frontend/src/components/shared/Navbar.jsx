import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const user = false;

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto h-auto max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold">
            Carrer<span className="text-[#F83002]">Connect</span>
          </h1>
        </div>
        <div className="flex items-center gap-2">
          <ul className="flex font-medium items-center gap-5">
            <li>Home</li>
            <li>Jobs</li>
            <li>Browse</li>
          </ul>



{/*if user exist then show the profile otherwise they can ask for login*/}
          {!user ? (
            <div className="flex items-center gap-2">
              <Link to ="/login"><Button variant="outline">Login</Button></Link>
              <Link to ="/signup"><Button className="bg-[#6A3BC2] hover:bg-[#360998]">Signup</Button></Link>
              
              
            </div>
          ) : (
            <Popover>
              <PopoverTrigger asChild>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-88">
                <div className="">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">Sakshi MernStack</h4>
                      <p className="text-sm text-muted-foreground">
                        I am a backend and frontend developer
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col  text-gray-600">
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="Link">View profile</Button>
                    </div>
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button variant="Link">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
