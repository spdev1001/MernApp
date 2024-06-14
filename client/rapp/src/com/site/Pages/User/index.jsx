import { Component } from "react";
import { Redirect } from "react-router";
import Cookies from "universal-cookie";
import io from "socket.io-client";
const socket = io();
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: "Site",
            pageLoaded: false,
            redirect: false
        };
        this.handleSignOut = this.handleSignOut.bind(this);
    }
    componentDidMount() {
        this.Socket_Reciever_Request('customevent_response_from_server', (data) => {
            alert(JSON.stringify(data));
        })
        this.Socket_Reciever_Request('user:read', (data) => {
            alert(JSON.stringify(data));
        })
    }
    componentWillUnmount() {
        //window.removeEventListener("resize", this.handleResize);
    }
    handleSignOut = (e) => {
        const cookies = new Cookies();
        cookies.remove("token");
        this.setState({
            user: {},
            showSignIn: true,
            showLogOut: false,
            redirect: true,
            isAdmin: false,
        });
    };
    Socket_Emit_Request = () => {
        console.log('Raising emit request');
        socket.emit('customevent', { 'data': 'data emit' });
    }
    Socket_Reciever_Request = (event, callback) => {
        socket.on(event, data => callback(data));
    };
    Socket_Emit_User_Request = () => {
        console.log('Raising user emit request');
        socket.emit('user:save', { 'data': 'data emit' });
    }

    render() {
        const UserLayout = (<><h1>User Pages</h1>
            <div>
                <p>{this.props.user ? <>User : {this.props.user.first_name}<div><a onClick={() => this.handleSignOut()}>Sign Out</a></div></> : <div><a onClick={() => this.handleSignOut()}>Sign Out</a></div>}</p>
                <p><input type="button" value={"Custom Emit Message"} onClick={this.Socket_Emit_Request}></input></p>
                <p><input type="button" value={"User model Emit save Message"} onClick={this.Socket_Emit_User_Request}></input></p>
            </div>
        </>);
        if (this.state.redirect) {
            return <Redirect to="/login" />;
        }
        return UserLayout;
    }
}
export default User;