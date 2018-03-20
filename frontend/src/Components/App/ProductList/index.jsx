import React, { Component } from 'react';
import { Card, CardTitle, Row, Col} from 'react-materialize'
import { Link } from 'react-router-dom'
 
class ProductList extends Component {


    componentWillMount() {
        this.props.refreshProducts(this.props.category);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.category === this.props.category) {
            return;
        } else {
            this.props.refreshProducts(nextProps.category);
        }
    }

    renderChild = (item, i) => (

        <div key={i}>
            <Col className="child">
                <Link to={`/products/${this.props.category}/${item.ASIN}`}>
                    <Card
                        header={<CardTitle image={item.ImageSets[0].ImageSet[0].LargeImage[0].URL[0]} waves='light' />}
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
                <h2>Items for your {this.props.category}</h2>
                <Row className="masonry">
                    {this.props.productList.map(this.renderChild)}
                </Row>
            </div>
        )
    }
}

export default ProductList;
