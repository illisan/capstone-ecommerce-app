import React, { Component } from 'react';
import { Row, Table, Button, Container, Icon, Modal, Input } from 'react-materialize'
import axios from 'axios';

let total


class Cart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            cart: (this.props.cart),
            total: 0
        }
        console.log(this.props.cart)
    }

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
                        <td>{this.props.cart[i].title}</td>
                        <td>{this.props.cart[i].price /100}</td>
                        <td><Button className="clearBtn" onClick={() => { this.props.removeItem(item) }}><Icon>clear</Icon></Button></td>
                    </tr>
                </tbody>
            </Table>
        </div>)


    render() {
        console.log(this.props.cart)
        // console.log(this.props.cart)
    //    let getTotal= this.props.cart.forEach((item) => {
    //         //console.log(product)
    //         if (getTotal === 0) {
    //             getTotal = "Your Cart Is Empty :("
    //         }
    //         this.setState({
    //             total: this.state.total += Number(item[0].Offers[0].Offer[0].OfferListing[0].Price[0].Amount[0]) / 100
    //         })
    //     })

        let priceArr = this.props.cart.map((item)=>{
            return item.price
        })
        console.log(priceArr)
       let cartTotal = priceArr.reduce((sum, item) => {
                return sum + item / 100
        }, 0)
        if (cartTotal === 0) {
            cartTotal = "Your Cart Is Currently Empty"
        }

        return (
            <Container>
                <h3>Shopping Cart</h3>
                <Row >
                    {this.props.cart.map(this.renderCart)}
                </Row>
                <Table>
                    <tr>
                        <th data-field="id">Cart Total</th>
                        <th data-field="price">CDN$ {cartTotal}</th>
                    </tr>
                </Table>

                <Modal
                    trigger={<Button>Check Out</Button>}>
                    <h4>Customer Information</h4>
                    <Row>
                        <Input placeholder="First Name" s={6} label="First Name" />
                        <Input s={6} label="Last Name" />
                        <Input type="text" label="Phone" s={12} />
                        <Input type="email" label="Email" s={12} />
                        <Modal
                            trigger={<Button>Next</Button>}>
                            <h4>Billing Address</h4>
                            <Row>
                                <Input type="text" label="Street Address" s={12} />
                                <Input type="text" label="Postal Code" s={12} />
                                <Input type="text" label="City" s={12} />
                                <Modal
                                    trigger={<Button>Next</Button>}>
                                    <h4>Payment Information</h4>
                                    <Row>
                                        <Input type="password" label="Credit Card" s={12} />
                                        <Input type="text" label="Expiry" s={12} />
                                        <Input type="text" label="CVC Code" s={12} />
                                        <Modal
                                            trigger={<Button>Confirm Order</Button>}>
                                            <h4>Thank You For Your Purchase!</h4>
                                            <p>Sign Up For Our NewsLetter!</p>
                                            <Row>
                                                <Input placeholder="Name" s={6} label="First Name" />
                                                <Input type="email" label="Email" s={12} />
                                            </Row>
                                        </Modal>
                                    </Row>
                                </Modal>
                            </Row>
                        </Modal>
                    </Row>
                </Modal>
                
            </Container>
                )
            }
}




export default Cart;