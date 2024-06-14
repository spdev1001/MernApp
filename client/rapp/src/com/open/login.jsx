import React, { Component } from "react";
import Cookies from "universal-cookie";
import axios from "axios";
import auth from '../util/auth/authentication';


class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {},
            errorMessage: ''
        };
        this.handleLogin = this.handleLogin.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onChange = (e) => {
        var objUser = this.state.user;
        if (e.target.type == "checkbox" || e.target.type == "radio") {
            objUser[e.target.name] = e.target.checked;
        } else {
            objUser[e.target.name] = e.target.value;
        }
        this.setState({ user: objUser });
    };
    handleLogin = (e) => {
        e.preventDefault();
        const body = this.state.user;
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        var url = "/api/user/auth/local";
        axios
            .post(url, body, config)
            .then((res) => {
                const cookies = new Cookies();
                cookies.set("token", res.data.token, { path: "/" });
                this.props.history.push("/");
            })
            .catch((error) => {
                this.setState({ errorMessage: error.response.data.message });
            });
    };
    LogInBy = (e, provider) => {
        window.location.href = "/auth/" + provider;
    };
    loginNew = () => {

        const body = this.state.user;
        auth.login(body).then((obj) => {
            this.props.history.push('/');
        }).catch((error) => {
            this.setState({ errorMessage: error.response.data.message });
        });
    }

   
    render() {
        return (
            <>
                <section class="mainContent clearfix logIn">
                    <div class="container">
                        <div class="row justify-content-center">
                            <div class="col-md-7 col-lg-8 col-xl-7 col-12">
                                <div class="panel panel-default">
                                    <div class="panel-heading">
                                        <h3>Mern App Login</h3>
                                    </div>
                                    <div class="panel-body">
                                        <form onSubmit={this.handleLogin} role="form">
                                            <div class="form-group">
                                                <label for="">Enter Email</label>
                                                <input
                                                    type="email"
                                                    class="form-control"
                                                    name="email"
                                                    id="email"
                                                    placeholder="Email"
                                                    required
                                                    autoFocus
                                                    onChange={this.onChange}
                                                />
                                            </div>
                                            <div class="form-group">
                                                <label for="">Password</label>
                                                <input
                                                    type="password"
                                                    name="password"
                                                    className="form-control"
                                                    placeholder="Password"
                                                    onChange={this.onChange}
                                                    required
                                                />
                                            </div>
                                            <div class="form-check ">
                                                <input
                                                    id="rememberme"
                                                    class="checkbox-custom form-check-input"
                                                    name="rememberme"
                                                    type="checkbox"
                                                    onChange={this.onChange}
                                                />
                                                <label
                                                    for="rememberme"
                                                    class="checkbox-custom-label form-check-label"
                                                >
                                                    Remember me
                                                </label>
                                            </div>
                                            <button
                                                type="submit"
                                                class="btn btn-primary btn-default btn-block"
                                            >
                                                log in
                                            </button>
                                            &nbsp;&nbsp;
                                            <input type="button" value={"Login New"} onClick={this.loginNew}></input>
                                            &nbsp;&nbsp;
                                            <p>{this.state.errorMessage}</p>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
    }
}

export default Login;
