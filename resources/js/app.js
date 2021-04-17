import axios from 'axios'
import Noty from 'noty'
import moment from 'moment'


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

//Removing alert after 5 seconds
const removeAlert = document.querySelector('#success')
if (removeAlert){
    timeout(()=>{
        removeAlert.remove()
    }, 2000)
}




//admin code
const orderTableBody = document.querySelector('#orderTableBody')
    let orders = []
    let markup

    axios.get('/admin/orders', {
        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }
    }).then(res => {
        orders = res.data
        markup = generateMarkup(orders)
        orderTableBody.innerHTML = markup
    }).catch(err => {
        console.log(err)
    })


    function renderItems(items) {
        let parsedItems = Object.values(items)
        return parsedItems.map((menuItem) => {
            return `
                <p>${ menuItem.item.name } - ${ menuItem.qty } pcs </p>
            `
        }).join('')
      }

    function generateMarkup(orders) {
        return orders.map(order => {
            return `
                <tr>
                <td class="border px-4 py-2 text-green-900">
                    <p>${ order._id }</p>
                    <div>${ renderItems(order.items) }</div>
                </td>
                <td class="border px-4 py-2">${ order.address }</td>
                <td class="border px-4 py-2">${ order.phone }</td>

            
                <td class="border px-4 py-2">
                    <div class="inline-block relative w-64">
                        <form action="" method="">
                            <input type="hidden" name="orderId">
                            <select name="status" 
                                class="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline">
                                <option value="order_placed">Placed</option>
                                <option value="completed" > Completed</option>
                            </select>
                        </form>
                        <div
                            class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                            <svg class="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20">
                                <path
                                    d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                            </svg>
                        </div>
                    </div>
                </td>
                <td class="border px-4 py-2">
                    ${ moment(order.createdAt).format('hh:mm A') }
                </td>
              
            </tr>
        `
        }).join('')
    }

