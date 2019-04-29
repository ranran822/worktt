
import React from 'react';
import TaskTrackList from "../common/TaskTrackList";
import {Form, Input} from 'antd';
import axios from "axios";


class aMyParticipationProjects extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
    };
    onPressEnter = () => {
        this.setState({
            period_type:"yy",
        });
        this.props.form.validateFields(async(err,values)=>{
            if (!err) {
                // console.log(data);
                axios.get("/api/worktt/task_track/getPartiTask_TrackListByPeriodName.action?emp_id="+window.sessionStorage.getItem('emp_id')+"&period_type="+this.state.period_type+"&period_name="+values.period_name+"")
                    .then((response)=>{
                        console.log(response);
                        let data=[];
                        Object.assign(data,response.data.datat)
                        this.setState({datat:data})
                        console.log(this.state.datat)
                        this.setState({data:data,limit:response.data.limit,period_name:response.data.period_name})
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            }
            else{
                console.log("tishiyu")
            }

        })

    }
    async componentDidMount(){
        await this.setState({
            period_type:"yy",
        });
        axios.get("/api/worktt/task_track/getPartiTask_Track.action?emp_id="+window.sessionStorage.getItem('emp_id')+"&period_type="+this.state.period_type+"")
            .then((response) => {
                // console.log(response);
                let data=[]
                Object.assign(data,response.data.datay)
                // console.log(response.data.datay)
                this.setState({data:data,period_name:response.data.period_name_year})
            })
            .catch(function (error) {
                console.log(error);
            });

    }
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div>
                <Form layout="inline">
                    <h3>本期工作跟踪列表</h3>
                    <h6 >
                        <Form.Item
                            label="任务周期："
                        >
                            {getFieldDecorator('period_name',{initialValue:this.state.period_name})(
                                <Input onPressEnter={ this.onPressEnter} style={{ width: 150 }}/>
                            )}
                            <span style={{marginLeft:20,fontSize:15,color:"#f4a344"}}>**周期格式示例：年度周期Y2019、月度周期2019M4、单周周期2019W15**</span>
                        </Form.Item>
                    </h6>
                    <TaskTrackList weekData={this.state.data} />
                </Form>
            </div>
        );
    }

}
const WrappedRegistrationForm = Form.create({ name: 'getDateLimit' })(aMyParticipationProjects);

export default WrappedRegistrationForm;




