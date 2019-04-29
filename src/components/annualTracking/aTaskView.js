/* eslint-disable react/forbid-prop-types,global-require */
import React, {Component} from 'react'
import ClassLineBarEcharts from "../charts/ClassLineBarEcharts";
class aTaskView extends Component {
    render() {
        return (
            <div className="row" style={{paddingLeft:50}}>
                <div className="column">
                    <h5>按类别统计</h5>
                    <ClassLineBarEcharts/>
                </div>
            </div>
        )
    }
}
export default aTaskView;

