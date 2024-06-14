import React, { Component } from "react";
import Cookies from "universal-cookie";
import { NavLink } from "react-router-dom";
import UserProfile from '../util/UserProfile';
class TopMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            errorMessage: ''
        };

    }
    componentDidMount() {

        this.getLoggedInUser();
    }
    getLoggedInUser = () => {
        this.setState({ user: UserProfile.getUser() });
        if (!this.state.user._id) {
            setTimeout(() => {
                this.getLoggedInUser();
            }, 100);
        }
        else {
            //this.setState({ user: UserProfile.getUser() });
        }
        /*
        var req = {};
        req["url"] = "/api/user/me";
        req["method"] = "get";
        this.props.onExecuteRequest(req, (res) => {
            if (res && res.status == "200") {
                this.setState({ user: res.data });
            }
        });
        /**/
    }

    LogInBy = (e, provider) => {
        window.location.href = "/auth/" + provider;
    };

    render() {
        return (
            <>
                <div className="navbar">
                    <b>Menu</b>
                    <nav>
                        <ul>
                            <li>  <h3>{this.state.user ? <>User : {this.state.user.first_name + " " + this.state.user.last_name}</> : ""}</h3>                                  </li>
                            <li><NavLink to="/login">Login</NavLink></li>
                            <li><NavLink to="/">Landing Page</NavLink></li>
                          
                            
                            
                            <li><NavLink to="/home">Home</NavLink></li>
                            <li><NavLink to="/users">Users</NavLink></li>
                            <li><NavLink to="/admin">Admin</NavLink></li>

                            <li><NavLink to="/abc">ABC</NavLink></li>
                        </ul>
                    </nav>
                </div>                
            </>
        );
    }
}

export default TopMenu;
