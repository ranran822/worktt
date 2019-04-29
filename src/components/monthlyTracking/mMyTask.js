/* eslint-disable react/forbid-prop-types,global-require */
import React from 'react';
import TaskTrackList from "../common/TaskTrackList";
import {Form} from 'antd';
import axios from "axios";


class mMyTask extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };

    async componentDidMount(){
        await this.setState({
            period_type:"mm",
        });
        axios.get("/api/worktt/task_track/getOwnerTask_Track.action?emp_id="+window.sessionStorage.getItem('emp_id')+"&period_type="+this.state.period_type+"")
            .then((response) => {
                // console.log(response);
                let data=[]
                Object.assign(data,response.data.datam)
                // console.log(response.data.datam)
                this.setState({data:data})
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    render(){

        return(
            <div>
                <Form layout="inline">
                    <TaskTrackList weekData={this.state.data} />
                </Form>
            </div>
        );
    }

}
const WrappedRegistrationForm = Form.create({ name: 'getOwnerTask_Track' })(mMyTask);

export default WrappedRegistrationForm;






