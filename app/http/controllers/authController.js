const bcrypt = require('bcrypt')
const flash = require('express-flash')
const passport = require('passport')
const User = require('../../models/user')


function authController(){

    return {
        login(req,res){
            res.render('auth/login')
        },

        postLogin(req, res, next) {
            const { email, password }   = req.body
           // Validate request 
            if(!email || !password) {
                req.flash('error', 'Missing Credentials ')
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info) => {
                if(err) {
                    req.flash('error', info.message )
                    return next(err)
                }
                if(!user) {
                    req.flash('error', info.message )
                    return res.redirect('/login')
                }
                req.logIn(user, (err) => {
                    if(err) {
                        req.flash('error', info.message ) 
                        return next(err)
                    }
                    if(req.user.role === 'admin'){
                    return res.redirect('/admin/orders')
                }else{
                    return res.redirect('/cart')
                }
                })
            })(req, res, next)
        },
        register(req,res){
            res.render('auth/register')
        },
        async postRegister(req,res){
            const { name,email,password} = req.body
            
            // Validation of the incoming data

            if(!name||!email||!password){
                req.flash('error','All fields are mandatory....')
                req.flash('name',name)
                req.flash('email',email)

                return res.redirect('/register')
            }

            // check if email exists
            User.exists({email:email},function(err,res){
                if(res){
                req.flash('error','Email Already taken')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')

                }
            })
            
            // hashed password
            const hashedPassword = await bcrypt.hash(password,10)

            //create user
            const user = new User({
                name:name,
                email:email,
                password:hashedPassword
            })
            user.save().then((user)=>{

                return res.redirect("/")
            }).catch(err=>{
                req.flash('error','Something went wrong')
                return res.redirect('/register')

            })

       
        },
        logout(req,res){
            req.logout()
            return res.redirect('/login')
        }


    }
}

module.exports = authController