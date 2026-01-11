// import React, { useState } from "react";
// import axios from "axios";
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "./ui/dialog";
// import { Label } from "./ui/label";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import { Loader2 } from "lucide-react";
// import { useDispatch, useStore } from "react-redux";
// import { USER_API_END_POINT } from "@/utils/constants";
// import { setUser } from "@/redux/authSlice";
// import { toast } from "sonner";


// const UpdateProfileDialog = ({ open, setOpen }) => {
//   const [loading, setLoading] = useState(false);
//   const {user} = useStore(store=>store.auth)

//   const [input,setInput] = useState({
//     fullname:user?.fullname,
//     email:user?.email,
//     phoneNumber:user?.phoneNumber,
//     bio:user?.profile?.bio,
//     skills:user?.profile?.skills?.map(skill=>skill),
//     file:user?.profile?.resume,
//   })
//   const dispatch = useDispatch()

//   //data get k liye
//   const changeEventHandler=(e)=>{
//     setInput({...input,[e.target.name]:e.target.value})
//   }

//   const fileChangeHandler = (e)=>{
//     const file = e.target.files?.[0]
//     setInput({...input,file})
//   }

//   const submitHandler = async(e)=>{
//     e.preventDefault()
//     const formData = new FormData()
//     formData.append("fullname",input.fullname)
//     formData.append("email",input.email)
//     formData.append("phoneNumber",input.phoneNumber)
//     formData.append("skills",input.skills)
//     formData.append("bio",input.bio)
//     if(input.file){
//         formData.append("file",input.file)
//     }
//     try{
//         const res = await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
//             headers:{
//                  'Content-Type':'multipart/form-data'
//             },
//             withCredentials:true
           
//         })
//         if(res.data.success){
//             dispatch(setUser(res.data.user))
//             toast.success(res.data.message)

//         }
//     }catch(error){
//         console.log(error)
//     }
//     setOpen(false)
//     console.log(input)
   
//   }
//   return (
//     <div>
//       <Dialog open={open}>
//         <DialogContent
//           className="sm:max-w-125"
//           onInteractOutside={() => setOpen(false)}
//         >
//           <DialogHeader>
//             <DialogTitle>Update Profile</DialogTitle>
//           </DialogHeader>
//           <form onSubmit={submitHandler}>
//             <div className="grid gap-4 py-4">
//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="fullname" className="text-right">
//                   Name
//                 </Label>
//                 <Input id="fullname" value={input.fullname} 
//                  onChange={changeEventHandler}
//                 name="fullname" className="col-span-3" />
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="email" className="text-right">
//                   Email
//                 </Label>
//                 <Input id="email" value={input.email} 
//                  name="email"
//                  onChange={changeEventHandler}
//                   className="col-span-3" />
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="phoneNumber" className="text-right">
//                   Number
//                 </Label>
//                 <Input id="phoneNumber"
//                 value={input.phoneNumber} 
//                 name="phoneNumber"
//                 type="text"
//                 onChange={changeEventHandler}
//                  className="col-span-3" />
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="bio" className="text-right">
//                   Bio
//                 </Label>
//                 <Input id="bio" value={input.bio}
//                  onChange={changeEventHandler}
//                  name="bio" className="col-span-3" />
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="skills" className="text-right">
//                   Skills
//                 </Label>
//                 <Input id="skills" value={input.skills}
//                  onChange={changeEventHandler}
//                  name="skills" className="col-span-3" />
//               </div>

//               <div className="grid grid-cols-4 items-center gap-4">
//                 <Label htmlFor="resume" className="text-right">
//                   Resume
//                 </Label>
//                 <Input
//                   id="file"
//                   name="file"
//                   onChange = {fileChangeHandler}
//                   type="file"
//                   accept="application/pdf"
//                   className="col-span-3"
//                 />
//               </div>
//             </div>
//             <DialogFooter>
//               {loading ? (
//                 <Button className="w-full my-4">
//                   <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                   Please Wait
//                 </Button>
//               ) : (
//                 <Button
//                   type="submit"
//                   className="w-full my-4 bg-black text-white hover:bg-[#360998]"
//                 >
//                   Update
//                 </Button>
//               )}
//             </DialogFooter>
//           </form>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// };

// export default UpdateProfileDialog;






import {useState} from 'react'
import {Dialog,DialogContent,DialogHeader,DialogTitle,DialogFooter} from './ui/dialog'
import { Label } from './ui/label'
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from 'react-redux';
// import { USER_API_END_POINT } from "./constant";
import { USER_API_END_POINT } from "@/utils/constants";
import { toast } from 'sonner';
import { setLoading } from '../redux/authSlice';
import axios from "axios";
import { setUser } from "../redux/authSlice";





const UpdateProfileDialog = ({open, setOpen}) => {
    const[loading,setLoading]=useState(false)
    const{user} = useSelector(store=>store.auth)
    

    const [input,setInput]=useState({
        fullname:user?.fullname || "",
        email:user?.email,
        phoneNumber:user?.phoneNumber,
        bio:user?.profile?.bio || "",
        skills:user?.profile?.skills?.map(skill=>skill),
        file:user?.profile?.resume
    })
    const dispatch=useDispatch()

    const changeEventHandler =(e)=>{
        setInput({...input,[e.target.name]:e.target.value})
    }

    const fileChangeHandler =(e)=>{
        const file=e.target.files?.[0]
        setInput({...input,file})
        }
    const submitHandler= async (e)=>{
        e.preventDefault()
        const formData = new FormData()
        formData.append("userId", user?._id);
        formData.append("fullName",input.fullname)
        formData.append("email",input.email)
        formData.append("phoneNumber",input.phoneNumber)
        formData.append("bio",input.bio)
        formData.append("skills",input.skills)
        if(input.file){
            formData.append("file",input.file)
        }
        try{
          setLoading(true)
            const res=await axios.post(`${USER_API_END_POINT}/profile/update`,formData,{
                headers:{
                    'Content-Type':'multipart/form-data'
                },
                withCredentials:true
            })
            if(res.data.success){
                dispatch(setUser(res.data.user))
                toast.success(res.data.message)
            }
        }catch(error){
            console.log(error)
            toast.error(error.response.data.message)

        }finally{
          setLoading(false)
        }
        setOpen(false)
        console.log(input)
    }


  return (
    <div>
      <Dialog open={open}>
        <DialogContent className='sm:max-w-[425px]' onInteractOutside={()=>setOpen(false)}>
          <DialogHeader>
            <DialogTitle>Update Profile</DialogTitle>
          </DialogHeader>
          <form onSubmit={submitHandler}>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input 
                    id="name" 
                    name="fullname" 
                    type="text"
                    value={input.fullname}
                    onChange={changeEventHandler}
                    className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input 
                    id="email" 
                    name="email" 
                    type="email"
                    value={input.email}
                    onChange={changeEventHandler}
                    className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="number" className="text-right">
                  Number
                </Label>
                <Input 
                    id="number" 
                    name="phoneNumber" 
                    value={input.phoneNumber}
                    onChange={changeEventHandler}
                    className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="bio" className="text-right">
                  Bio
                </Label>
                <Input
                     id="bio" 
                     name="bio" 
                     value={input.bio}
                     onChange={changeEventHandler}
                     className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="skills" className="text-right">
                  Skills
                </Label>
                <Input 
                    id="skills"
                     name="skills" 
                     value={input.skills}
                     onChange={changeEventHandler}
                     className="col-span-3" />
              </div>

              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="file" className="text-right">
                  Resume
                </Label>
                <Input 
                    id="file"
                     name="file" 
                     type="file"
                     accept="application/pdf"
                     onChange={fileChangeHandler}
                     className="col-span-3" />
              </div>

            </div>
            <DialogFooter>
                {
            loading?<Button className="w-full my-4"><Loader2 className="mr-2 h-4 w-4 animate-spin"/>Please wait</Button>:<Button type="submit" className="w-full my-4">
            Update
            </Button>
          }
            </DialogFooter>
          </form>
        </DialogContent>
        
          

        

      </Dialog>
    </div>
  );
};

export default UpdateProfileDialog;
