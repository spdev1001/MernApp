import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Router } from "react-router";
import history from "./com/admin/config/history";//"./com/admin/config/history";
import logo from './logo.svg';
import './App.css';
import AdminLayout from "./com/admin/Layout";
import SiteLayout from "./com/site/Layout";
import NotFound from "./com/open/notFound";
import Login from "./com/open/login";
import TopMenu from "./com/open/topMenu";




class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      rootDivClass: "",
    };
  }
  componentDidMount() {
    //window.addEventListener("resize", _this.handleResize);
    //_this.checkStatusForResize(true);
  }

  componentWillUnmount() {
    //window.removeEventListener("resize", this.handleResize);
  }

  render() {
    const loading = () => (
      <div className="animated fadeIn pt-3 text-center">Loading...</div>
    );
    return (
    
        <Router history={history}>
          <React.Suspense fallback={loading()}>
            <Switch>
              <Route path="/admin" name="Admin" render={props => <AdminLayout {...props} />} />
              <Route path="/login" name="Login" render={props => <Login {...props} />} />
              <Route path="/" name="Default" render={props => <SiteLayout {...props} />} />
              <Route path="*"><NotFound /></Route>
            </Switch></React.Suspense>
        </Router>
     
    );
  }
}

export default App;

