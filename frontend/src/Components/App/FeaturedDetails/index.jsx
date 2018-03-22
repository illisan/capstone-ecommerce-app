import React, { Component } from 'react';
import {Row, Button} from 'react-materialize'


 

class FeaturedDetails extends Component {
    constructor () {
        super()
        this.state = {
            itemIndex: 0
        }
    }

    render() {
    
    //  let itemArr =  this.props.featuredItems.map((item) => {
    //         return item[0]
    //  }) 
    //  console.log(itemArr)

    // let  changeItem = (index) => {
    // console.log(this.state.featuredItems) 
    // console.log("changeeeee")
    // console.log(index)
    // this.setState({
    //   thisItem: index,
    // })

//   }
console.log(this.props.featuredItems[0])
        let allItems = this.props.featuredItems
        let params = this.props.match.params

        let filterItem = allItems.filter((item, i) => {
            if (item.ASIN[0] === params.featureASIN)
                return item
        })
        console.log(filterItem)
        console.log(this.props.thisItem) 
        let featuresArr = filterItem[0].ItemAttributes[0].Feature.map((title) => {
            return <div key={title}>
                <div>
                    <ul>
                        <li>{title}</li>
                    </ul>
                </div>
            </div>
        })

        // MAPPING OUT SIMILAR PRODUCTS ARRAY IN A CONDITIONAL: Doesn't show array

        // let similarItems =
        // console.log(filterItem[0].SimilarProducts)        
        // if (filterItem[0].SimilarProducts !== undefined) {
        //     console.log(filterItem[0].SimilarProducts[0].SimilarProduct)
        //     //let similarItems = (filterItem[0].SimilarProducts[0].SimilarProduct)
        //     //console.log(similarItems)
        //     let otherArr = filterItem[0].SimilarProducts[0].SimilarProduct.map((item, i) => {
        //         //console.log(othersJSX)
        //         console.log(item.Title[0])
        //         return (<div key={i}>
        //             <h4>{item.Title[0]}</h4>
        //         </div>)

        //     })
        // }   
    
        return (
            <div className="itemDetails">
                <h2 className = "itemTitle" >{filterItem[0].ItemAttributes[0].Title}</h2>
                <div className= "mainBox">
                    <div className="imgBox">
                        <img className="productImg" alt="" src={
                        filterItem[0].LargeImage === undefined ? //ternary works for most images but not others, ex.matcha and coffee capsules.
                        filterItem[0].ImageSets[0].ImageSet[0].LargeImage[0].URL[0] :
                        filterItem[0].LargeImage[0].URL[0]
                        }
                        />   
                    </div> 
                    <div className="priceBox">
                        <h4>{filterItem[0].Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0]}</h4>
                        <p className>{featuresArr}</p>
                        <Button waves='light' className="addBtn" onClick={() => { this.props.addToCart(filterItem) }} >Add to Cart</Button>
                    </div> 
                </div>
                <Button onClick = {
                () => {this.changeItem(this.props.thisItem - 1)}}>Prev</Button>

                <Button onClick={this.props.changeItem}>Next</Button>
                <h4 className="othersHeader">Other Products Your Might Like</h4>
                <div>
                    <Row>
                        {/* <h4>{similarItems}</h4> */}
                    </Row> 
                </div>
            </div>
        )
    }
}

export default FeaturedDetails; 