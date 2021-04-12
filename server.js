const express=require('express')
const app=express()
const ejs=require("ejs")
const path=require("path")
const expressLayout=require("express-ejs-layouts");


app.get("/",function(req,res){
    res.render("home")
})

//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,"/resources/views"))
app.set('view engine','ejs')

app.listen(process.env.PORT || 3000,function(){
    console.log("Port started on 3000")
})