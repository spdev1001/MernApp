import React, { Component } from "react";
//import { useAuth } from "../../../util/auth/AuthContext";

class XYZ extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: "Site",
            pageLoaded: false,
            redirect: false
        };

    }
    componentDidMount() {
       
    }
    componentWillUnmount() {
        //window.removeEventListener("resize", this.handleResize);
    }

    render() {
        
        const XyzLayout = (<><h1>XYZ Pages</h1>

        </>);

        return XyzLayout;
    }
}
export default XYZ;