
import Cookies from "universal-cookie";
import axios from "axios";


class Auth {
    constructor() {
        this.isAuthenticated = false;
        this.token = null;
        this.user = {};
    }

    login = (body) => {
        const config = { headers: { "Content-Type": "application/json" } };
        var url = "/api/user/auth/local";
        let promise = new Promise((resolve, reject) => {
            axios
                .post(url, body, config)
                .then((res) => {
                    const cookies = new Cookies();
                    cookies.set("token", res.data.token, { path: "/" });
                    this.isAuthenticated = true;
                    resolve();
                })
                .catch((error) => {
                    reject(error);
                });
        });
        return promise;
    }

    logout = () => {
        let promise = new Promise((resolve, reject) => {
            setTimeout(() => {
                this.isAuthenticated = false;
                console.log('successfully logged out!');
                resolve();
            }, 1000);
        });
        return promise;
    }

    isUserAuthenticated = () => {
        return this.isAuthenticated;
    }

}

//new Auth() - es6 singleton pattern
export default new Auth();