const express=require("express");
const mongoose=require("mongoose");
const bcryptjs=require("bcryptjs");
const jwt=require("jsonwebtoken");
const dotenv=require("dotenv");
const cookieParser=require("cookie-parser");
dotenv.config();

const User=require("./models/User");
const authMiddleware=require("./middleware/authMiddleware");
const app=express();
app.use(express.json());
app.use(cookieParser());
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    console.log("db connected successfully!");
})
.catch((err)=>{
    console.log("unable to connect to db",err);
});
app.post("/api/register",async(req,res)=>{
    try{
        const {name,email,password}=req.body;
        const oldUser=await User.findOne({email});
        if(oldUser){
            return res.json({
                success:false,
                message:"user already exists"
            });
    }
const hashpassword=await bcryptjs.hash(password,10);
const user=await User.create({name,email,password:hashpassword});
res.json({
    success:true,
    message:"user registered successfully!",
    user
})
}
catch(err){
    console.log("unable to register",err)
}
});
// app.get("/api/register",(req,res)=>{
//     res.json({
//         message:" data saved successfully",
//         data:req.body,
//         User
//     })
// })
app.post("/api/login",async(req,res)=>{
    try{
        const {email,password}=req.body;
        const user=await User.findOne({email});
        if(!user){
            return res.json({
                success:false,
                message:"User not found"
            });
        }
        //we will write below this...
        const isMatch=await bcryptjs.compare(password,user.password);
        if(!isMatch){
            return res.json({
                success:false,
                message:"invalid password"
            });
        }
        const token=jwt.sign({
            id:user._id,email:user.email
        },process.env.SECRET_KEY,{expiresIn:"2d"});
        res.cookie("token",token,{httpOnly:true});
        res.json({
            success:true,
            message:"login successfully"
        });
    }
     catch(err){
        console.log("unable to login",err)
    }
});
        app.get("/api/home",authMiddleware,(req,res)=>{
            res.json({
                success:true,
                message:"welcome to home page",
                user:req.user
            })
        })
        app.get("/api/logout",(req,res)=>{
            res.clearCookie("token");
            res.json({
                success:true,
                message:"logged out successfully"
            });
        });
   
const PORT=process.env.PORT || 5000;
app.listen(PORT,()=>{
    console.log("server started at "+PORT)
})