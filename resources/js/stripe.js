import {loadStripe} from '@stripe/stripe-js';

export async function initStripe(){
    const stripe = await loadStripe('pk_test_51IhD2ISEIMxXwIhEbF3F1RJovmp613mt1x3vyZGjKqoYqe5pGc9C2cTxN3uNPGIkiTuo815fej7RzpHQE15H7NYb00siStbRNX');
    
    let card = null;
    
    function mountWidget(){

        const elements = stripe.elements()
        var style = {
        base: {
          color: "#32325d",
          fontFamily: 'Arial, sans-serif',
          fontSmoothing: "antialiased",
          fontSize: "16px",
          "::placeholder": {
            color: "#32325d"
          }
        },
        invalid: {
          fontFamily: 'Arial, sans-serif',
          color: "#fa755a",
          iconColor: "#fa755a"
        }
      };

    card = elements.create('card', {style,hidePostalCode:true});
     
      card.mount('#card-element')
    }


    const paymentType = document.querySelector('#paymentType')
    if (!paymentType){
        return
    }
    paymentType.addEventListener('change',(event)=>{
        console.log(event.target.value)

    if(event.target.value === 'card'){
        //card widget
        mountWidget()

    }
    else{
        //
        card.destroy()
    }
    
    });


}
