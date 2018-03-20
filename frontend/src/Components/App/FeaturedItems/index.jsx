import React, { Component } from 'react';
import { Card, CardTitle, Row, Col } from 'react-materialize'
import { Link } from "react-router-dom"

class FeaturedItems extends Component {

    renderFeatItem = (item, i) => (

        <div key={i}>
            <Col className="child">
                <Link to={`/home/${item.ASIN}`}>
                    <Card header={<CardTitle image={item.ImageSets[0].ImageSet[0].LargeImage[0].URL[0]} waves='light' />}
                        title={item.ItemAttributes[0].Title}>
                        <h5>Price:{item.Offers[0].Offer[0].OfferListing[0].Price[0].FormattedPrice[0]}</h5>
                    </Card>
                </Link>
            </Col>
        </div>
    )
 
    render() {
        return (
            <div>
                <h1>Featured Items</h1>
                <Row className="masonry">
                    {this.props.featuredItems.map(this.renderFeatItem)}
                </Row>
            </div>
        )
    }
}



export default FeaturedItems;