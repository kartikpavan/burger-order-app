require('dotenv').config() // to have the a=access of env file in our application
const express=require('express')
const app=express()
const ejs=require("ejs")
const path=require("path")
const expressLayout=require("express-ejs-layouts");
const mongoose = require('mongoose')
const session = require('express-session')
const flash = require('express-flash')
const MongoStore = require('connect-mongo');
const passport = require('passport')
//Assets
app.use(express.static('public'))
app.use(express.urlencoded({extended:false}))
app.use(express.json())

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

//session store

app.use(session({
    secret: process.env.COOKIE_SECRET,
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({              //saving sessions in mongo database (by default stored in memory)
        mongoUrl: 'mongodb://localhost/burger',
        collectionName: 'sessions'
    }),
    cookie: { maxAge: 1000 * 60 * 60 * 24 } //24 hrs
  }))

//passport config

const passportInit = require('./app/config/passport')
passportInit(passport)

app.use(passport.initialize())
app.use(passport.session())

//middleware
app.use(flash());
//global-middleware
app.use((req,res,next)=>{
    res.locals.session = req.session
    res.locals.user = req.user
    next()
})


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