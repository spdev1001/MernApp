import React, { Component } from "react";
import {  NavLink } from "react-router-dom";
class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageLoaded: false
          
        };
    } 
    componentDidMount() {
        setTimeout(() => {
            this.setState({ pageLoaded: true });
        }, 50);
    }
    componentWillUnmount() {
        //window.removeEventListener("resize", this.handleResize);
    }
    render() {
        return (
            <React.Fragment>
                <div style={{ border: "1px solid red",width:"15%",float:"left" }}>
                    <ul className="list">
                        <li className="header">Admin Page</li>
                        <li className="active">
                            <NavLink to={"/admin"}>
                                <span>Admin Home</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/admin/products"}>
                                <span>Product</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/admin/users"}>
                                <span>User</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/admin/test"}>
                                <span>Testt</span>
                            </NavLink>
                        </li>
                        <li>
                            <NavLink to={"/"}>
                                <span>Home</span>
                            </NavLink>
                        </li>
                    </ul>
                </div>
            </React.Fragment>
        );
    }
}

export default Header;
