import axios from 'axios'
import Noty from 'noty'

let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter=document.querySelector('#cartCounter')
function updateCart(burger){
    axios.post("/update-cart",burger).then(res=>{
        console.log(res)
        cartCounter.innerText = res.data.totalQty
        new Noty({
            type:'success',
            timeout: 1000,
            layout: 'topLeft', 
            progressBar:false,
            text: " Item Added to Cart"
          }).show();
    }).catch(function(err){
        new Noty({
            type:'error',
            timeout: 1000,
            layout: 'topLeft',
            progressBar:false,
            text: "Error : Action not possible"
          }).show();

    })

}



addToCart.forEach((btn)=>{
    btn.addEventListener('click',function(e){
        let burger=JSON.parse(btn.dataset.burger)
        updateCart(burger)


    })
})