// import React, { useState } from 'react'
// import Navbar from './shared/Navbar'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import {  Contact, Mail, Pen } from 'lucide-react'
// import { Label } from './ui/label'
// import { Badge } from './ui/badge'
// import AppliedJobTable from './AppliedJobTable'
// import UpdateProfileDialog from './UpdateProfileDialog'


// const skills = ["reactjs","nodejs","exxpress","database","html"]
// const Profile = () => {

//     const [open,setOpen]=useState(false)
//   const isResume = true
//   return (
//     <div>
//       <Navbar/>
//       <div className='max-w-7xl mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8'>
//         <div className='flex justify-between'>
//           <div className='flex items-center gap-4'>

        
//         <Avatar className="h-24 w-24">
//           <AvatarImage src="https://static.vecteezy.com/system/resources/previews/015/259/493/original/business-consulting-services-logo-design-vector.jpg"/>
//         </Avatar>
//         <div>
//           <h1 className='font-medium text-xl'>Full name</h1>
//           <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsum aliquid harum natus </p>
//         </div>
//         </div>
//         <Button onClick={()=>setOpen(true)} className='text-right' variant='outline'><Pen/></Button>
//         </div>
//         <div className='my-5'>
//           <div className='flex items-center gap-3 my-2'>
//             <Mail/>
//           <span>Sakshi@gmail.com</span>
//           </div>
//           <div className='flex items-center gap-3 my-2'>
//           <Contact/>
//         <span>8425697630</span>
//           </div>
//         </div>
//         <div className='my-5'>
//           <h1>Skills</h1>
//           <div className='flex items-center gap-1'>
//           {
//            skills.length !== 0 ?  skills.map((item,index)=><Badge className="bg-black text-white px-3 py-1 rounded-md" key={index} >{item}</Badge>) : <span>NA</span>
//           }
//         </div>
//       </div>
//       <div className='grid w-full max-w-sm items-center gap-1.5'>
//         <Label className="text-md font-bold">Resume</Label>
//         {
//           isResume? <a target="blank" href='https://www.youtube.com/' className='text-blue-500 w-full hover:underline cursor-pointer '>Sakshi Mern Satck</a>:<span>NA</span>
//         }
//       </div>
//         </div>
//       <div className='max-w-4xl mx-auto bg-white rounded-2xl'>
//         <h1 className='font-bold text-lg my-5'>Applied Jobs</h1>
//         <AppliedJobTable/>
//       </div>
//     <UpdateProfileDialog open={open} setOpen={setOpen}/>
//     </div>
//   )
// }

// export default Profile










import { useSelector } from "react-redux";

import Navbar from './shared/Navbar'
import { Avatar, AvatarImage } from './ui/avatar'
 import { Button } from './ui/button'
import {  Contact, Mail, Pen } from 'lucide-react'
import { Label } from './ui/label'
import { Badge } from './ui/badge'
import AppliedJobTable from './AppliedJobTable'
import UpdateProfileDialog from './UpdateProfileDialog'


import React, { useState } from 'react'
// import Navbar from './shared/Navbar'
// import { Avatar, AvatarImage } from './ui/avatar'
// import { Button } from './ui/button'
// import {  Contact, Mail, Pen } from 'lucide-react'
// import { Label } from './ui/label'
// import { Badge } from './ui/badge'
// import AppliedJobTable from './AppliedJobTable'
// import UpdateProfileDialog from './UpdateProfileDialog'


// const skills = ["html","css","javascript","react"]
const isResume = true;
const Profile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);

  return (
    <div>
      <Navbar />
      <div className="max-w-4xl  mx-auto bg-white border border-gray-200 rounded-2xl my-5 p-8">
        <div className="flex justify-between">
          <div className="flex items-center gap-4">
            <Avatar className="h-24 w-24">
              <AvatarImage src="https://static.vecteezy.com/system/resources/previews/015/259/493/original/business-consulting-services-logo-design-vector.jpg" />
            </Avatar>
            <div>
              <h1 className="font-medium text-xl">{user?.fullname}</h1>
              <p>{user?.profile?.bio}</p>
            </div>
          </div>
          <Button
            onClick={() => setOpen(true)}
            className="text-right"
            variant="outline"
          >
            <Pen />
          </Button>
        </div>
        <div className="my-5">
          <div className="flex items-center gap-3 my-2">
            <Mail />
            <span>{user?.email}</span>
          </div>
          <div className="flex items-center gap-3 my-2">
            <Contact />
            <span>{user?.phoneNumber}</span>
          </div>
        </div>
        <div>
          <h1>Skills</h1>
          <div className="flex items-center gap-1">
            {user?.profile?.skills.length !== 0 &&
              user?.profile?.skills.map((item, index) => (
                <Badge className="bg-black text-white px-3 py-1 rounded-md" key={index} >{item}</Badge>
              ))}
          </div>
        </div>
        <div className="grid w-full max-w-sm items-center gap=1.5">
          <Label className="text-md font-bold">Resume</Label>
          {/* {
                    isResume ? <a target ='blank' href={user?.profile.resume} className='text-blue-800 w-full hover:underline cursor-pointer'>{user?.profile?.resumeOriginalName}</a>:<span>NA</span>
                } */}

          {user?.profile?.resume ? (
            <a
              href={user.profile.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline"
            >
              {user?.profile?.resumeOriginalName}
            </a>
          ) : (
            <p>No resume uploaded</p>
          )}
        </div>
      </div>
      <div className="max-w-4xl mx-auto bg-white rounded-2xl">
        <h1 className="font-bold text-lg my-5">Applied Jobs</h1>
        <AppliedJobTable />
      </div>
      <UpdateProfileDialog open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;

