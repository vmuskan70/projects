const express=require("express");
const app=express();
app.use(express.json());
app.get("/",(req,res)=>{
    res.send("app is running...");
});
app.get("/students",(req,res)=>{
    res.json({
        message:"all student"
    });
});
app.post("/students",(req,res)=>{
    console.log(req.body);
    res.json({
        message:"students records",
        data:req.body
    });
});
app.listen(3000,(req,res)=>{
    console.log("server started...");
});