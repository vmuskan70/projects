const http = require("http");

const server = http.createServer((req,res)=>{
    if (req.url==="/")
        res.write("home page");
    else if(req.url==="/about")
        res.write("about us page")
    else if(req.url==="/services")
        res.write("server page")
    else
        res.write("404 not found");
    res.end();
    console.log("welcom to server 2");
    });
    server.listen(3001,()=>{
        console.log("server started at 3001")
    });