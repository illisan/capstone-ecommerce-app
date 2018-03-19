import React, { Component } from 'react';
import { Row, Table, Button } from 'react-materialize'
import axios from 'axios';

let total


class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: (this.props.cart)
        }
        console.log(this.props.cart)
    }

    // componentWillMount() {   //does not save items in cart
    //     axios.get(`http://localhost:8080/getcart`)
    //         .then((response) => {
    //             console.log(response.data)
    //             this.setState({
    //                 cart: response.data.cart
    //             })
    //         })
    // }

    // componentDidUpdate() {
    //     axios.post('http://localhost:8080/postcart', {
    //         cart: this.state.cart
    //     })
    //         .then((response) => {
    //             if (response.data.success) {
    //                 console.log('Cart Items Saved')
    //             }
    //         })
    // }


    renderCart = (item, i) => (

        <div>
            <Table>
                <thead>
                    <tr>
                        <th data-field="id">Item</th>
                        <th data-field="price">Price</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{item[0].ItemAttributes[0].Title}</td>
                        <td>{item[0].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0]}</td>
                        <td><Button onClick={() => { this.props.removeItem(item) }}>Clear</Button></td>
                    </tr>
                </tbody>
            </Table>
        </div>)


    render() {

        let getTotal =
            this.state.cart.reduce((sum, item) => {
                return sum += (Number(item[0].Offers[0].Offer[0].OfferListing[0].Price[0].Amount[0]))
            }, 0)
        if (getTotal === 0) {
            getTotal = "Your Cart Is Empty :("
        }

        return (

            <div>
                <h2>This is your cart</h2>
                <Row >
                    {this.props.cart.map(this.renderCart)}
                </Row>
                <Table>
                    <tr>
                        <td>Cart Total:</td>
                        <td>{getTotal}</td>
                    </tr>
                </Table>
            </div>

        )

    }
}




export default Cart;