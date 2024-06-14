import React, { Component, Suspense } from "react";
import { Route, Switch } from "react-router-dom";
import axios from "axios";
import Cookies from "universal-cookie";
//import io from "socket.io-client";
import routes from "../routes";
import Header from "../controls/common/header";
//const socket = io();
class AdminLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: "Admin",
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
    loading = () => (
        <div className="animated fadeIn pt-1 text-center">Loading...</div>
    );
    ExecuteRequest = (req, callback) => {
        const cookies = new Cookies();
    
        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + cookies.get("token")
          }
        };
        if (req["responseType"]) {
          config["responseType"] = req["responseType"];
        }
        if (req.method === "get") {
          axios
            .get(req.url, config)
            .then(res => {
              callback(res);
            })
            .catch(error => {
              callback(error.response);
            });
        } else if (req.method === "post") {
          axios
            .post(req.url, req.body, config)
            .then(res => {
              callback(res);
            })
            .catch(error => {
              callback(error.response);
            });
        } else if (req.method === "put") {
          axios
            .put(req.url, req.body, config)
            .then(res => {
              callback(res);
            })
            .catch(error => {
              callback(error.response);
            });
        } else if (req.method === "delete") {
          axios
            .delete(req.url, config)
            .then(res => {
              callback(res);
            })
            .catch(error => {
              callback(error.response);
            });
        }
      };
    render() {
        const AdminLayout = (<>
            <div>
                <Header></Header>
                <div style={{ border: "1px solid blue",width:"85%",float:"clear" }}>
                    <section className="content">
                        <Suspense fallback={this.loading()}>
                            <Switch>
                                {routes.map((route, idx) => {
                                    console.log(route.component);
                                    return route.component ? (
                                        <Route
                                            key={idx}
                                            path={route.path}
                                            exact={route.exact}
                                            name={route.name}
                                            render={props => (
                                                <route.component
                                                    model={route.model}
                                                    user={""}
                                                    modelPermission={""}
                                                    groupPermission={""}
                                                    listUrl={""}
                                                    onExecuteRequest={this.ExecuteRequest}
                                                    onSocketEmit={""}
                                                    onSocketRecieve={""}
                                                    {...props}
                                                />
                                            )}
                                        />
                                    ) : null;
                                })}
                            </Switch>
                        </Suspense>
                    </section>
                </div>
            </div>
        </>);
        return AdminLayout;
    }
}
export default AdminLayout;