import React from 'react';
import '../App.css';
import cartApi from "../actions/cartApi.js";
import swal from 'sweetalert';

const initialState = {
    products: [],
    messages: [],
    confirmButton: "Send",
    p_id: "",
    p_name: "",
    p_price: "",
    p_discount: "",
    p_quantity : "",
    p_image : "",
    quantity : "",
    type:"",
    total:"",
    quantityError:""
}

class product_view extends React.Component {

    constructor(props) {
        super(props);
        this.state = initialState;
    }

    handleChange = e => {
        const isCheckbox = e.target.type === "checkbox";
        this.setState({
            [e.target.name]: isCheckbox
                ? e.target.checked
                : e.target.value
        });
    }

    componentDidMount() {
        const purl = "http://localhost:3500/product";
        fetch(purl).then(response => response.json())
        .then(json => {const pro = json.filter(pro => pro._id===localStorage.getItem('itemId'))
            this.setState({products: pro,p_id:pro[0]['_id'],p_name:pro[0]['name'],p_price:pro[0]['price'],p_discount:pro[0]['discount'],p_quantity:pro[0]['quantity'],p_image:pro[0]['image']})
        })
    }

    onCart(){
        if(this.state.quantity){
            if(this.state.quantity<=this.state.p_quantity){
                const total=this.state.quantity*this.state.p_price-(this.state.p_discount*this.state.quantity)
                this.setState({ type:'cart' ,total:total , email: localStorage.getItem('email') }, () => { 
                    cartApi.cart().create(this.state)
                    .then(res =>{
                        swal("Success!", "Add Successful!", "success")
                        this.componentDidMount()
                        this.setState(initialState)
                    })
                })
            }else{
                this.setState({quantityError:"Quantity Error!"})
            }
        }else{
            this.setState({quantityError:"Quantity Required!"})
        }
    }

    editButton(id,msg,email){
        if(localStorage.getItem('email')){
            if(email===localStorage.getItem('email')){
                return  [<button type='button' onClick={() => this.onChange(id,msg)} class="btn btn-outline-success">EDIT</button>,
                        <button type='button' onClick={() => this.onDelete(id)} class="btn btn-outline-danger">Delete</button>];
            }
        }
    }

    render (){
        const { products } = this.state;
        return (
            <div class="container">
            <br/><br/>
                <div class="justify-content-center">
                    <table class="table">
                        <tbody>
                        {
                            products.map((product) =>

                            <tr>
                                <td class="tableTh" width="35%"><img width="500px" alt="" src={ "http://localhost:3500/"+product.image } class="img-thumbnail" /></td>
                                <td class="tableTh" width="65%"><h3>{ product.name  }</h3><br/><h5>category :{ product.name  } / Price: Rs. { product.price }</h5>
                                <br/><h5>Discount : Rs. { product.discount }</h5>
                                <br/><h5>Available Quantity : { product.quantity }</h5>
                                <p>Description : { product.description  }</p>
                                <br/>Quantity : <input type='text' name="quantity" value={this.state.quantity} onChange={this.handleChange} style={{width: "50px"}} /> / { product.quantity }
                                <div style={{color : "red"}}>{this.state.quantityError}</div><br/>
                                <br/><button type='button' onClick={() => this.onCart()} class="btn btn-outline-primary">Add to Cart</button>
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

export default product_view;
