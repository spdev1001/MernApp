import { Component } from "react";
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Title: "Site",
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
        return (<h1>Home Page</h1>);
    }
}
export default Home;