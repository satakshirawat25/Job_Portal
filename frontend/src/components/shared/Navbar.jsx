import React from "react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from "sonner";
import { setUser } from "@/redux/authSlice";
import axios from "axios";

const Navbar = () => {
  // const user = false;
  const {user} = useSelector(store=>store.auth)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const logoutHandler = async(e)=>{
    try{
      const res = await axios.get(`${USER_API_END_POINT}/logout`,{withCredentials:true})
      if(res.data.success){
        dispatch(setUser(null))
        navigate("/")
        toast.success(res.data.message)
      }
    }catch(error){
      console.log(error)
      toast.error(error.response.data.message)
    }
  }

  return (
    <div className="bg-white">
      <div className="flex items-center justify-between mx-auto h-auto max-w-7xl">
        <div>
          <h1 className="text-2xl font-bold">
            Carrer<span className="text-[#F83002]">Connect</span>
          </h1>
        </div>
        <div className="flex items-center gap-12">
          <ul className="flex font-medium items-center gap-5">

            {
              user && user.role == 'recruiter' ? (
                <>
                  <li><Link to ='/admin/companies'>Companies</Link></li>
                  <li><Link to ='/admin/jobs'>Job</Link></li>

                </>
              ):(
                <>
                   <li><Link to='/'>Home</Link></li>
                  <li><Link to='/jobs'>Jobs</Link></li>
                  <li><Link to='/browse'>Browse</Link></li>
                </>
              )
            }

           
            
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
                    src={user?.profile?.profilePhoto}
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-88">
                <div className="">
                  <div className="flex gap-4 space-y-2">
                    <Avatar className="cursor-pointer">
                      <AvatarImage
                        src={user?.profile?.profilePhoto}
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{user.fullname}</h4>
                      <p className="text-sm text-muted-foreground">
                       {user?.profile?.bio}
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col  text-gray-600">

            {
              user && user.role =='student' && (
                <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <User2 />
                      <Button variant="Link"><Link to="/profile">View profile</Link></Button>
                    </div>
              )
            }
                    <div className="flex w-fit items-center gap-2 cursor-pointer">
                      <LogOut />
                      <Button onClick={logoutHandler} variant="Link">Logout</Button>
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
