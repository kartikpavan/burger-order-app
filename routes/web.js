
const homeController = require('../app/http/controllers/homeController')
const authController = require('../app/http/controllers/authController')
const cartController = require('../app/http/controllers/customers/cartController')
const orderController = require('../app/http/controllers/customers/orderController')
const AdminOrderController = require('../app/http/controllers/admin/orderController')

const auth = require('../app/http/middlewares/auth')

function initRoutes(app){

    app.get("/",homeController().index)
    app.get("/login",authController().login)
    app.post('/login',authController().postLogin)
    app.get("/register",authController().register)
    app.post("/register",authController().postRegister)
    app.post("/logout",authController().logout)

    app.get("/cart",cartController().index)
    app.post('/cart',cartController().remove)
    app.post("/update-cart",cartController().update)

    //customer routes
    app.post('/orders',auth,orderController().store)
    app.get('/customer/orders',auth,orderController().index)
    
    //admin Routes
    app.get('/admin/orders',auth,AdminOrderController().index)

    //contact us 

     app.get('/contact',function(req,res){
        res.render('contact')
    })
    app.post('/thankyou',function(req,res){

        res.render('thankyou')
    })
    

}


module.exports = initRoutes