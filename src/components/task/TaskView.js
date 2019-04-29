/* eslint-disable react/forbid-prop-types,global-require */
import React, {Component} from 'react'
import ClassPieEcharts from "../charts/ClassPieEcharts";
import StatePieEcharts from "../charts/StatePieEcharts";
import ManagerPieEcharts from "../charts/ManagerPieEcharts";
import TaskPieEcharts from "../charts/TaskPieEcharts";
class TaskView extends Component {
    render() {
        return (
            <div className="row" style={{paddingLeft:20}}>
                <div className="column">
                    <ClassPieEcharts/>
                </div>
                <div className="column">
                    <StatePieEcharts/>
                </div>
                <div className="column">
                    <ManagerPieEcharts/>
                </div>
                <div className="column">
                <TaskPieEcharts/>
                </div>
            </div>
        )
    }
}
export default TaskView;

