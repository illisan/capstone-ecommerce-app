import React, { Component } from 'react';
import { Button } from 'react-materialize'



class ProductDetails extends Component { 

    render() {
        // console.log(this.props.productList)
        // console.log(this.props.match.params)

        let products = this.props.productList
        let params = this.props.match.params 

        let filterItem = products.filter((item, i) => {
            if (item.ASIN[0] === params.productASIN)
                return item
        })

        let featuresArr = filterItem[0].ItemAttributes[0].Feature.map((title) => {
            return <div key={title}>
                <div>
                    <ul>
                        <li>{title}</li>
                    </ul>
                </div>
            </div>
        })

        console.log(filterItem)
        let image = filterItem[0].ImageSets[0]
        return (
            <div className="itemDetails">
                <h2 className="itemTitle" >{filterItem[0].ItemAttributes[0].Title}</h2>
                <div className="mainBox">
                    <div className="imgBox">
                        <img className="productImg" alt="" src={
                            filterItem[0].LargeImage === undefined ? 
                                image.ImageSet[0].LargeImage[0].URL[0] :
                                filterItem[0].LargeImage[0].URL[0]
                        }
                        />
                    </div>
                    <div className="priceBox">
                        <h4>{filterItem[0].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0]}</h4>
                        <p className>{featuresArr}</p>                        
                        <Button waves='light' className="addBtn" onClick={() => { this.props.addToCart(filterItem) }}>Add to Cart</Button>
                    </div>
                </div>
                <Button onClick={this.props.changeItem}>Prev</Button>
                <Button onClick={this.props.changeItem}>Next</Button>
                <h4 className="othersHeader">Other Products Your Might Like</h4>
            </div>
        )
    }
}

export default ProductDetails;
