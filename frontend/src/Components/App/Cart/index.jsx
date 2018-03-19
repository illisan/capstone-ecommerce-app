import React, { Component } from 'react';
import {Row,Table} from 'react-materialize' 


class Cart extends Component {

   
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
                    </tr>
                </tbody>
            </Table>
        </div>
    )


    render() {
        return ( 
            
            <div>
                <h2>This is your cart</h2>
                <Row >
                    {this.props.cart.map(this.renderCart)}
                </Row>
            </div>
            
        )
        
    }
}




export default Cart;