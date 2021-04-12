const express=require('express')
const app=express()
const ejs=require("ejs")
const path=require("path")
const expressLayout=require("express-ejs-layouts");
const mongoose = require('mongoose')


// Database Connection

mongoose.connect('mongodb://localhost/burger',
{ 
    useNewUrlParser: true, 
    useUnifiedTopology: true
});

//connection to the test database running on localhost.
const connection = mongoose.connection;

connection.once('open', function() {
    console.log("Database Connected...");
}).catch(function(err){
    console.log("Connection Failed...")
})

//Assets
app.use(express.static('public'))


//set template engine
app.use(expressLayout)
app.set('views',path.join(__dirname,"/resources/views"))
app.set('view engine','ejs')

//Routes

require('./routes/web')(app)

// Creating PORT
app.listen(process.env.PORT || 3000,function(){
    console.log("Port started on 3000")
})