import React, { Component } from 'react';
import { Icon, SideNav, SideNavItem, Button } from 'react-materialize'
import { Link, } from "react-router-dom"

//tell the api to search multiple categories (search indeces)
//on component 
//attach click to link and then take value of 'Baby' then get req of value 

class Nav extends Component {

    render() {
        return (
            <SideNav id="slide-out" className="side-nav fixed" trigger={<p> </p>}>
                <li className="searchBox">
                    <input className="searchBar" ref={self => { this.inputBox = self }} type="text" placeholder="Search" />
                    <Link to="/search/:keywords">
                        <Button className="searchBtn" onClick={() => { this.props.search(this.inputBox.value) }}><Icon>search</Icon></Button>
                    </Link>
                </li>

                <div className="navLinks">
                    <li><Link to="/home">Home</Link></li>
                    <li><Link to="/cart">Cart</Link></li>
                    <SideNavItem divider />
                    <li className="subheader">Categories</li>
                    <div className="categories">
                        <li><Link to="/products/baby">Baby</Link></li>
                        <li><Link to="/products/beauty">Beauty</Link></li>
                        <li><Link to="/products/health">Health</Link></li>
                        <li><Link to="/products/grocery">Grocery</Link></li>
                        <li><Link to="/products/kitchen">Kitchen</Link></li>
                        <li><Link to="/products/pets">Pets</Link></li>
                    </div>
                </div>

                <div className="footer">
                    <div>
                        <p>Contact Us!</p>
                    </div>
                </div>
            </SideNav>
        )
    }

}







export default Nav;