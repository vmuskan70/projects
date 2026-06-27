const express=require("express")
const app=express();
app.get("/students/:roll/:name",(req,res)=>{
    const {roll,name}=req.params;
    res.json({
        message:"single student",
        user_roll:roll,
        student_name:name
    });
});

app.get("/students",(req,res)=>{
    res.json({
        message:"data inside query",
        data:req.query

    });
    
});

app.listen(5000,()=>{
    console.log("server startes on port 5000")
})