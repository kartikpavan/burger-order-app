// const Contact = require('../../models/contact')
const mongoose=require("mongoose");

const Schema=mongoose.Schema

const contactSchema= new Schema({
    firstname: { type:String,required:true },
    lastname: { type:String,required:true },
    email: { type:String,required:true },
    message: { type:String,required:true }


})

const Contact = mongoose.model('Contact',contactSchema)

function contactController(){

    return{
    index(req,res){
        res.render('contact')

    },
    thankyou(req,res){

    const{firstname,lastname,email,message } = req.body;
        const contact = new Contact({
            firstname:firstname,
            lastname:lastname,
            email:email,
           message:message
        })
        contact.save().then(result=>{
            req.flash('success','feedback sucessfully')
            return res.render('thankyou')


        }).catch(err=>{
            req.flash('error','something went wrong')
            return res.redirect('/contact')
        })
    }
    }


}

module.exports = contactController