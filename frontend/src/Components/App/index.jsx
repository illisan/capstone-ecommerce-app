import React, { Component } from 'react';
import '../../Assets/css/main.css';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'
import Nav from './Nav'
import FeaturedItems from './FeaturedItems'
import FeaturedDetails from './FeaturedDetails'
import ProductList from './ProductList'
import ProductDetails from './ProductDetails'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      products: [],
      cart: [],
      FeaturedItems: []
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/featuredData`)
      .then((response) => {
        this.setState({
          FeaturedItems: response.data
        })
      })
  }

  refreshProducts = (category) => {
    axios.get(`http://localhost:8080/products/${category}`)
      .then((response) => {
        this.setState({
          category,
          products: response.data
        })
      })
  }

  render() {
    return (
      <div className="App">
        <Nav
          searchCategory={this.searchCategory} />
        <main>
          <header className="App-header">
            <img className="bbLogo responsive-img" alt="" src="../../../bb_logo.png" />
          </header>
          <section>
            <Switch>
              <Route exact path='/home' render={(props) => {
                return <FeaturedItems
                  FeaturedItems={this.state.FeaturedItems}
                  {...props}
                />
              }
              } />
              <Route exact path='/home/:featureASIN' render={(props) => {
                return <FeaturedDetails
                  FeaturedItems={this.state.FeaturedItems}
                  {...props}
                />
              }
              } />
              <Route exact path='/products/:category' render={(props) => {
                return <ProductList
                  category={props.match.params.category} // get the category from the route, not the state, as the state hasn't been updated at this point. The child component ProductList will call refreshProducts and subsequently update the app state's category and products
                  productList={this.state.products}
                  refreshProducts={this.refreshProducts}
                  {...props}
                />
              }
              } />
              <Route path='/products/:category/:productASIN' render={(props) => {
                console.log("gets here!");
                return <ProductDetails
                  productList={this.state.products}
                  {...props} />
              }
              } />
            </Switch>
          </section>
        </main>
      </div>
    );
  }
}


export default App;

