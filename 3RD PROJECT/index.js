const express=require("express");
const app=express();
app.use(express.json());
let students=[
    {id:1,name:"muskan",city:"gkp"},
    {id:2,name:"janhavi",city:"skp"}
];
app.get("/api/students",(req,res)=>{
    res.json(students);
});
app.get("/api/students/:id",(req,res)=>{
   const {id}=req.params;
   const student=students.find(s=>s.id ==id);
   if(!student){
    return res.status(404).json({message:"Invalid id"});
   }
   res.json(student);
});
app.post("/api/students",(req,res)=>{
    console.log(req.body);
    students.push(req.body);
    // res.json({
    //     message:"record added successfully!!",
    //     data:req.body,
    //     students:students
    // });
    const newStudent={
        id:req.body.id,
        name:req.body.name,
        city:req.body.city
    };
    students.push(newStudent);
    res.json({
             message:"record added successfully!!",
            data:req.body,
            student:students
    });
});
//updated records
app.put("/api/students/:id",(req,res)=>{
    const {id}=req.params;
    const student=students.find(s=>s.id==id);
    if(!student){
        return res.json({
            message:"invalid students id"
        });
    }
    student.name=req.body.name;
    student.city=req.body.city;
    res.json({
        message:"student record updated",
        student
    });
});
//delete
app.delete("/api/students/:id",(req,res)=>{
    const {id}=req.params;
    students=students.filter(s=>s.id !=id);
    res.json({
        message:"record deleted...",
        data:students
    });
});
app.listen(5001,()=>{
    console.log("SERVER STARTED ON 5001...");
});
