import React, { Component, Suspense } from "react";
import UserProfile from '../../util/UserProfile';

class ContentLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
        };
 
    }
    
    componentDidMount() {
        
        this.setState({ user: UserProfile.getUser() });
    }

    render() {
        const ContentLayout = (<>
            <div>
                <p>{this.props.user ? <>User : {this.props.user.first_name}<div></div></> : ''}</p>

            </div>
        </>);
        return ContentLayout;
    }
}

export default ContentLayout;