var express = require('express');
var app = express();
var todoRoutes  =   require("./routes/todos");
var bodyParser=require('body-parser');


app.use(express.static(__dirname+'/views'));
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.json());  
app.use(bodyParser.urlencoded({extended:true}))
app.use("/api/todos",todoRoutes);
app.get("/",(req,res)=>{
    res.sendFile("Hello");
});  

app.listen(3000,function(){
    console.log("App started!!!");
})