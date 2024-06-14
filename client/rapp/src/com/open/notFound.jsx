import  { Component } from "react";
class NotFound extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: "NotFound",
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
        return (<><h1>Not Found</h1><a href="/admin">Back</a></>);
    }
}
export default NotFound;