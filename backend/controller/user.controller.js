import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt  from "jsonwebtoken";
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";


// ------------register controller----------
export const register = async(req,res)=>{
    try{
        const {email,fullname,phoneNumber,password,role}=req.body;
        if(!fullname || !email || !phoneNumber ||!role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        //cloudinary 
        const file = req.file
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)

        //if already exist
        const user= await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"user alredy exist with this email",
                success:false,
            })
        }
        



        //hashing password
        const hashedPassword = await bcrypt.hash(password,10)

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashedPassword,
            role,
            profile:{
                profilePhoto:cloudResponse.secure_url
            }
        })
        return res.status(201).json({
            message:"Account created successfully",
            success:true
        })
    }catch(error){
        console.log(error)
    }
}


// -------------------login--------------
export const login = async(req,res)=>{
    try{
        const {email,role,password}=req.body;
        // console.log("REQ BODY:", req.body);

      
        if( !email || !password ||!role){
            return res.status(400).json({
                message:"Something is missing",
                success:false
            })
        }

        let user= await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"incorrect email or password",
                success:false
            })
        }

        // password check with hashed password
        const isPasswordMatched = await bcrypt.compare(password,user.password)
        //not matched
        if(!isPasswordMatched){
            return res.status(400).json({
                message:"incorrect email or password",
                success:false
            })
        }
        //check role is correct or not
        if(role !== user.role){
            return res.status(400).json({
                message:"Account doesn't exists with currenrt role",
                success:false
            })
        }

        //generate token
        const tokenData ={
            userId:user._id,
        }
        const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn:'1d'})
        user={
            _id:user._id,
            fullname:user.fullname,
            role:user.role,
            phoneNumber:user.phoneNumber,
            email:user.email,
            profile:user.profile
        }

        //token store in cookie
        return res.status(200).cookie("token",token,{maxAge:1*24*60*60*1000,httpOnly:true,sameSite:'strict'}).json({
            message:`Welcome back ${user.fullname}`,
            success:true,
            user:{
            _id:user._id,
            fullname:user.fullname,
            role:user.role,
            phoneNumber:user.phoneNumber,
            email:user.email,
            profile:user.profile
        }
        })
    }catch(error){
        console.log(error)
    }
}

// .------------------------logout-----------------------
export const logout = async(req,res)=>{
    try{
        return res
        .status(200)
        .cookie("token","",
            {maxAge:0 }).json({
            message:"logout successfully",
            success:true
        })
    }catch(error){
        console.log(error)
    }
}


// --------------------update profile------------------
export const updateProfile = async(req,res)=>{
    try{
        const {fullname,email,phoneNumber,bio,skills}=req.body;
        console.log(fullname,email,phoneNumber,bio,skills)
        const file=req.file
       
        //cloudinary
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)



        //convert skills into array
        let skillsArray;
        if(skills){
             skillsArray = skills.split(",")
        }
       
        const userId = req.id //middleware authentication
        let user = await User.findById(userId)

        if(!user){
            return res.status(400).json({
                message:"User not found",
                success:false
            })
        }
    //updating data
        
        if(fullname) user.fullname=fullname
        if(email)  user.email=email
        if(phoneNumber)  user.phoneNumber=phoneNumber
        if(bio)  user.profile.bio = bio
        // if(skills) user.profile.skills = skillsArray
       if(skills)  user.profile.skills = skills.split(",");

        if(cloudResponse){
            user.profile.resume = cloudResponse.secure_url  //save the cloudinary url
            user.profile.resumeOriginalName = file.originalname  //save the original file name
        }


        await user.save()

        user={
            _id:user._id,
            fullname:user.fullname,
            role:user.role,
            phoneNumber:user.phoneNumber,
            email:user.email,
            profile:user.profile
        }

        return res.status(200).json({
            message:"profile updated successfully",
            user,
            success:true,
        })
        }catch(error){
        console.log(error)

    }
}



// export const updateProfile = async (req, res) => {
//   try {
//     const { fullname, email, phoneNumber, bio, skills } = req.body;
//     console.log(fullname, email, phoneNumber, bio, skills);

//     const userId = req.id; // from auth middleware
//     const user = await User.findById(userId);

//     if (!user) {
//       return res.status(400).json({
//         message: "User not found",
//         success: false,
//       });
//     }

//     // ===== FILE HANDLING =====
//     const file = req.file;
//     let cloudResponse;

//     if (file) {
//       const fileUri = getDataUri(file);
//       cloudResponse = await cloudinary.uploader.upload(
//         fileUri.content,
//         { resource_type: "raw" }
//       );
//     }

//     // ===== SKILLS =====
//     let skillsArray;
//     if (skills) {
//       skillsArray = skills.split(",");
//     }

//     // ===== UPDATE FIELDS =====
//     if (fullname) user.fullname = fullname;
//     if (email) user.email = email;
//     if (phoneNumber) user.phoneNumber = phoneNumber;
//     if (bio) user.profile.bio = bio;
//     if (skillsArray) user.profile.skills = skillsArray;

//     if (cloudResponse) {
//       user.profile.resume = cloudResponse.secure_url;
//       user.profile.resumeOriginalName = file.originalname;
//     }

//     await user.save();

//     return res.status(200).json({
//       message: "Profile updated successfully",
//       success: true,
//       user: {
//         _id: user._id,
//         fullname: user.fullname,
//         email: user.email,
//         phoneNumber: user.phoneNumber,
//         role: user.role,
//         profile: user.profile,
//       },
//     });

//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({
//       message: "Server error",
//       success: false,
//     });
//   }
// };
