import React, { Component } from 'react';
import '../../Assets/css/main.css';
import axios from 'axios';
import { Route, Switch } from 'react-router-dom'

import Nav from './Nav'
import Cart from './Cart'
import FeaturedItems from './FeaturedItems'
import FeaturedDetails from './FeaturedDetails'
import ProductList from './ProductList'
import ProductDetails from './ProductDetails'
import SearchResults from './SearchResults'
import SearchDetails from './SearchDetails'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: null,
      products: [],
      cart: [],
      featuredItems: [],
      cartQty: 0,
      total: 0,
      searchResults: [],
      keywords: null,
      fireRedirect: false
    }
  }

  componentDidMount() {
    axios.get(`http://localhost:8080/featuredData`)
      .then((response) => {
        this.setState({
          featuredItems: response.data
        })
      })
    axios.get(`http://localhost:8080/cart`)
      .then((response) => {
        console.log(response.data)
        this.setState({
          cart: response.data,
          cartQty: response.data.length
        })
      })
    console.log(this.state.cart)
  }

  searchItems = (keywords) => {
    console.log("search search search")
    console.log(keywords)
    axios.get(`http://localhost:8080/searchData?keyword=${keywords}+fair%20trade+organic`)
      .then((response) => {
        this.setState({
          searchResults: response.data,
          keywords
        })
        console.log(response.data)
        console.log(this.state.keywords)
      })

  }

  submitSearch = (event) => {
    event.preventDefault();
    console.log(event.target.searchBox.value)
    let query = event.target.searchBox.value
    axios.get(`http://localhost:8080/searchData?keyword=${query}+fair%20trade+organic`)
      .then((response) => {
        this.setState({
          searchResults: response.data,
          keywords: query,
          fireRedirect: true
        })
      })
    // event.target.saerchBox.value = ""
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
 

  addToCart = (item) => {
    console.log('cart function getting called')
    console.log(item)
    let itemTitle = item[0].ItemAttributes[0].Title[0]
    let itemPrice = item[0].Offers[0].Offer[0].OfferListing[0].Price[0].Amount[0]
    console.log(itemTitle)
    console.log(itemPrice)
    axios.post("http://localhost:8080/cart", {
      title: itemTitle,
      price: itemPrice,
    })
      .then((response) => {
        console.log("Success!")
      })
    //this.state.cart.unshift(item);
    console.log(this.state.cart)

    // this.setState({
    //   cart: this.state.cart.unshift(response.data),
    //   cartQty: this.state.cartQty + 1
    // });
  }

  // onClick of Clear button, the entire item is removed from cart. 
  // the price of the removed item is subtracted from the total.
  
  
  removeItem = (cartIndex) => {
    let newCartArr = [...this.state.cart].map((item) =>{
      return item.title})
    //newCartArr.splice(cartIndex, 1)
    //let itemTitle = item[0].title
    // let priceArr = this.props.cart.map((item) => {
    //   return item.price
    // })
    console.log(this.state.cart)
    console.log(cartIndex.title)
    axios.post("http://localhost:8080/clear", {
      title: cartIndex.title
    })
      .then((response) => {
        this.setState({
          cart: newCartArr,
          cartQty: this.state.cartQty - 1
        });
      })

  }


  render() {
    return (
      <div className="App">
        <Nav
          search={this.searchItems}
          submitSearch={this.submitSearch}
          fireRedirect={this.state.fireRedirect}
          cartQty={this.state.cartQty}
        />
        <main>
          <header className="App-header">
            <img className="bbLogo responsive-img" alt="" src="../../../bb_logo.png" />
          </header>
          <section>
            <Switch>
              <Route exact path='/home' render={(props) => {
                return <FeaturedItems
                  featuredItems={this.state.featuredItems}
                  {...props}
                />
              }
              } />
              <Route exact path='/home/:featureASIN' render={(props) => {
                return <FeaturedDetails
                  featuredItems={this.state.featuredItems}
                  addToCart={this.addToCart}
                  {...props}
                />
              }
              } />
              <Route exact path='/cart' render={(props) => {
                return <Cart
                  cart={this.state.cart}
                  total={this.state.total}
                  removeItem={this.removeItem}
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
                return <ProductDetails
                  productList={this.state.products}
                  addToCart={this.addToCart}
                  {...props} />
              }
              } />
              <Route exact path='/search/:keyword' render={(props) => {
                return <SearchResults
                  searchResults={this.state.searchResults}
                  keywords={this.state.keywords}
                  searchItems={this.searchItems}
                  {...props} />
              }
              } />
              <Route path='/search/:keywords/:productASIN' render={(props) => {
                return <SearchDetails
                  searchResults={this.state.searchResults}
                  addToCart={this.addToCart}
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

