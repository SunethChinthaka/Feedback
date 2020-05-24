import React from 'react';
import '../App.css';
import cartApi from "../actions/cartApi.js";
import swal from 'sweetalert';

const initialState = {
    myCart: []
}

class myCart extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    componentDidMount() {
        const purl = "http://localhost:3500/cart";
        fetch(purl).then(response => response.json())
        .then(json => {const cart = json.filter(cart => {
                return (cart.email===localStorage.getItem('email') && cart.type==='cart')
            })
            this.setState({ myCart:cart })
        })
    }

    onBuy(id){
        localStorage.setItem("cartId",id);
        window.location.href = '/payment';
    }
    
    onDelete(id){

        swal({
            title: "Are you sure?",
            text: "delete this record?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                cartApi.cart().delete(id)
                .then(res =>{
                    swal("Delete Successful!", {
                        icon: "success",
                    })
                    this.componentDidMount()
                });
            }
          })

    }

    render (){
        const { myCart } = this.state;
        return (
            <div class="container">
            <br/><br/>
                <div class="justify-content-center">
                    <h1>Shooping Cart</h1>
                    <hr/>
                    <table class="table">
                        <tbody>
                        {
                            myCart.map((cart) =>

                            <tr>
                                <td class="tableTh" width="25%"><img width="200px" alt="" src={ "http://localhost:3500/"+cart.p_image } class="img-thumbnail" /></td>
                                <td class="tableTh" width="60%"><h3>{ cart.p_name  }</h3><br/><h5>Price: Rs. { cart.p_price } / Discount: Rs. { cart.p_discount }</h5><br/><h5>Total: Rs. { cart.total } / Quantity: { cart.p_quantity }</h5></td>
                                <td class="tableTh" width="15%"><button type='button' onClick={() => this.onBuy(cart._id)} class="btn btn-outline-primary">BUY</button>
                                    <button type='button' onClick={() => this.onDelete(cart._id)} class="btn btn-outline-danger">Remove</button>
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

export default myCart;
