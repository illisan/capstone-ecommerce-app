import React, { Component } from 'react';
import {Row, Button} from 'react-materialize'




class FeaturedDetails extends Component {

    render() {

        let allItems = this.props.featuredItems
        let params = this.props.match.params

        let filterItem = allItems.filter((item, i) => {
            if (item.ASIN[0] === params.featureASIN)
                return item
        })
        console.log(filterItem)

        // MAPPING OUT SIMILAR PRODUCTS ARRAY IN A CONDITIONAL, SHOWS AS "othersJSX is not defined :( "

        // console.log(filterItem[0].SimilarProducts)        
        // if (filterItem[0].SimilarProducts !== undefined) {
        //     //console.log(filterItem[0].SimilarProducts[0].SimilarProduct)
        //     let similarItems = (filterItem[0].SimilarProducts[0].SimilarProduct)
        //     //console.log(similarItems)
        //     let othersJSX = similarItems.map((item, i) => {
        //         console.log(othersJSX)
        //         console.log(item.Title[0])
        //         return (<div key={i}>
        //             <h4>{item.Title[0]}</h4>
        //         </div>)

        //     })
        // }   


        let image = filterItem[0].ImageSets[0] //assigning arrays to variable
    
        return (
            <div className="itemDetails">
                <h2 className = "itemTitle" >{filterItem[0].ItemAttributes[0].Title}</h2>
                <div className= "mainBox">
                    <div className="imgBox">
                        <img className="productImg" alt="" src={
                        filterItem[0].LargeImage === undefined ? //ternary works for most images but not others, ex.matcha and coffee capsules.
                        image.ImageSet[0].LargeImage[0].URL[0] :
                        filterItem[0].LargeImage[0].URL[0]
                        }
                        />   
                    </div> 
                    <div className="priceBox">
                        <h3>{filterItem[0].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0]}</h3>
                        <p className>{filterItem[0].ItemAttributes[0].Feature[1]}</p>
                        <Button waves='light' className="addBtn" onClick={() => { this.props.addToCart(filterItem) }} >Add to Cart</Button>
                    </div> 
                </div>
                <h4 className="othersHeader">Other Products Your Might Like</h4>
                <div>
                    <Row>
                    {/* {othersJSX} APPEARS AS UNDEFINED */}
                    </Row>
                </div>
            </div>
        )
    }
}

export default FeaturedDetails; 