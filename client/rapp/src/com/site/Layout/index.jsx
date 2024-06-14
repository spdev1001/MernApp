import React, { Component, Suspense } from "react";
import TopMenu from "../../open/topMenu";
import ContentLayout from "./contentLayout";
import axios from "axios";
import Cookies from "universal-cookie";
import { Route, Switch, Redirect } from "react-router-dom";

//import logo from '../../../logo.svg';
import '../../../App.css';
import UserProfile from '../../util/UserProfile';
import routes from "../routes";

import CheckAuth from '../../util/auth/checkAuthentication';
import auth from '../../util/auth/authentication';
const User = React.lazy(() => import("../Pages/User"));
const XYZ = React.lazy(() => import("../Pages/xyz"));

class SiteLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            rootDivClass: "",
            user: {}
        };
        this.ExecuteRequest = this.ExecuteRequest.bind(this);
    }

    ExecuteRequest = (req, callback) => {
        const cookies = new Cookies();
        const config = {
            headers: {
                "Content-Type": "application/json",
                Authorization: "Bearer " + cookies.get("token")
            }
        };
        if (req.method == "get") {
            axios
                .get(req.url, config)
                .then(res => {
                    callback(res);
                })
                .catch(error => {
                    callback(error.response);
                });
        } else if (req.method == "post") {
            axios
                .post(req.url, req.body, config)
                .then(res => {
                    callback(res);
                })
                .catch(error => {
                    console.log(error);
                });
        } else if (req.method == "delete") {
            axios
                .delete(req.url, config)
                .then(res => {
                    callback(res);
                })
                .catch(error => {
                    console.log(error);
                });
        }
        else if (req.method == "put") {
            axios
                .put(req.url, req.body, config)
                .then(res => {
                    callback(res);
                })
                .catch(error => {
                    console.log(error);
                });
        }
    };

    componentDidMount() {
        this.getLoggedInUser();
    }
    getLoggedInUser = () => {
        var req = {};
        req["url"] = "/api/user/me";
        req["method"] = "get";
        this.ExecuteRequest(req, (res) => {
            if (res && res.status == "200") {
                UserProfile.setUser(res.data);
                this.setState({ user: res.data });
            }
        });
    }
    loading = () => (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );
    requireAuth = (nextState, replace, next) => {
        console.log('requireAuth');
        if (true) {
            replace({
                pathname: "/login",
                state: { nextPathname: nextState.location.pathname }
            });
        }
        next();
    }
    render() {
        const SiteLayout = (<>
            <div className="Container">


                <TopMenu onExecuteRequest={this.ExecuteRequest}></TopMenu>
                <div className="main">
                    <p>
                        <ContentLayout user={this.state.user}></ContentLayout>
                    </p>
                    <p>
                        <Suspense fallback={this.loading()}>
                            <Switch>
                                {routes.map((route, idx) => {
                                    return route.component ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}

                                            render={props => (
                                                <route.component
                                                    model={route.model}
                                                    onExecuteRequest={this.ExecuteRequest}
                                                    {...props}
                                                />
                                            )}
                                        />
                                    ) : null;
                                })}
                                <CheckAuth path="/abc" component={User} />                                
                            </Switch>
                        </Suspense>
                    </p>
                </div>
            </div>

        </>);
        return SiteLayout;
    }
}

export default SiteLayout;