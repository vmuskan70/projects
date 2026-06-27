const jwt=require("jsonwebtoken");
const authMiddleware=(req,res,next)=>{
    const token=req.cookies.token;
    if(!token){
        return res.status(401).json({
            success:false,
            message:"please login first"
        });
    }
    try{

const decoded=jwt.verify(token,process.env.SECRET_KEY);
req.user=decoded;
next();
    }
    catch(err){
        return res.status(404).json({
            success:false,
            message:"invalid token",
            error:err
        });
    }
};
module.exports=authMiddleware;