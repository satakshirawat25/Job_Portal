import express from "express"
import cookieParser from "cookie-parser"
import cors from"cors"
import dotenv from'dotenv'
dotenv.config()
import connectDB from './utils/db.js'
import userRoute from './routes/user.routes.js'

const app= express()

//middleware
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

const corsOptions={
    origin:'http://localhost:5173',
    credentials:true

}
app.use(cors(corsOptions))



const PORT = process.env.PORT || 3000

//apisor routes
app.use("/api/v1/user",userRoute)
//"http://localhost:3000/api/v1/user/register"



app.listen(PORT,()=>{
    connectDB()
    console.log(`server running at ${PORT}`)
})