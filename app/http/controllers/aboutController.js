function aboutController(){

    return{
        index(req,res){
            res.render('about')
        }
    }


}

module.exports = aboutController