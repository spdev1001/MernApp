import React, { Component } from "react";
import { stringify } from "query-string";
const format = require("string-format");
class ModelLayout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dbmodel: {},
            items: [],
            totalItem: 0
        };

    }
    componentDidMount() {
        this.getModelData();
    }
    getModelData = () => {
        var req = {};
        var queryString = {
            select: JSON.stringify(["_id", "title"])
        };
        req['url'] = format('/adminapi/{0}/get_json?{1}', this.props.model) + stringify(queryString);
        req['method'] = 'get';
        this.props.onExecuteRequest(req, res => {
            if (res && res.status === 200 && res.data && res.data) {
                this.setState({
                    items: res.data.d,
                    totalItem: res.data.total
                })

            } else {

            }
        });
    };
    render() {
        const { items, totalItem } = this.state;
        const ctrl = (<>
            <table border={{border:"1"}}>
                <thead>
                    <tr><th>Title</th></tr>
                </thead>
                <tbody>
                    {items.map((row, index) => (
                        <tr key={row._id}><td>{row.title}</td></tr>
                    ))}
                </tbody>
                <tfoot>Total : {totalItem}</tfoot>
            </table>

        </>);
        return ctrl;
    }

}
export default ModelLayout;