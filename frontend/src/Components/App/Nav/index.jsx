import React, { Component } from 'react';
import { Icon, SideNav, SideNavItem, Button} from 'react-materialize'
import { Link, } from "react-router-dom" 

//tell the api to search multiple categories (search indeces)
//on component 
//attach click to link and then take value of 'Baby' then get req of value 

class Nav extends Component {

    render() {
        return (
            <SideNav id="slide-out" className="side-nav fixed" trigger={<p> </p>}>
                <SideNavItem className="searchBox"><input ref={self => {this.inputBox = self}} type="text" placeholder="Search"/></SideNavItem><br/>
                <Button onClick={() => {this.props.search(this.inputBox.value)}}>search</Button>
                <div className="navLinks">
                    <SideNavItem><Link to="/home">Home</Link></SideNavItem>
                    <SideNavItem><Link to="/cart">Cart</Link></SideNavItem>
                    <SideNavItem><Link to="/products">Shop</Link></SideNavItem>
                    <SideNavItem><Link to="/products/baby">Baby</Link></SideNavItem>
                    <SideNavItem><Link to="/products/beauty">Beauty</Link></SideNavItem>
                    <SideNavItem><Link to="/products/health">Health</Link></SideNavItem>
                    <SideNavItem><Link to="/products/grocery">Grocery</Link></SideNavItem>
                    <SideNavItem><Link to="/products/kitchen">Kitchen</Link></SideNavItem>
                    <SideNavItem><Link to="/products/pets">Pets</Link></SideNavItem>
                </div>
            </SideNav>
        )
    }

}







export default Nav;