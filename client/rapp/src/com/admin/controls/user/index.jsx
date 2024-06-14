import React, { Component } from "react";
import ModelLayout from "../../ModelLayout";
class User extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: {}
        };
    }
    state = {};
    render() {
        const CtrlLayout = (
            <ModelLayout
            model={this.props.model}           
            onExecuteRequest={this.props.onExecuteRequest}            
          ></ModelLayout>
        );
        return CtrlLayout
      }
}

export default User;
