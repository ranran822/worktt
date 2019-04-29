import React, {Component} from 'react';
import {Input, Select,Button,Form} from 'antd';
import axios from "axios";
import ThisPlan from "./ThisPlan";
const Option = Select.Option;
class TaskEdit extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        datat:{

        },
        datan:{

        },
        cycle:{}
    };
    search = () => {
        this.props.form.validateFields(async(err,values)=>{
            if (!err) {
                // console.log(data);
                axios.get("/api/worktt/task_track/getTask_TrackByperiodName.action?emp_id="+window.sessionStorage.getItem('emp_id')+"&task_id="+this.props.taskData.task_id+"&period_type="+values.period_type+"&period_name="+values.period_name+"")
                    .then((response)=>{
                        console.log(response);
                        let data={   planning:'',
                            fact:'',
                            difference:'',
                            time_plan:'',
                            time_fact:'',
                            cpercent:'',
                            creation_date:'',
                            last_updated_date:''}
                        let data1={   planning:'',
                            fact:'',
                            difference:'',
                            time_plan:'',
                            time_fact:'',
                            cpercent:'',
                            creation_date:'',
                            last_updated_date:''}
                        Object.assign(data,response.data.datat)
                        Object.assign(data1,response.data.datan)
                        this.setState({datat:data,datan:data1})
                        console.log(this.state.datat)

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
        // console.log(this.props.taskData)
        await this.props.form.resetFields();
        await this.setState({
                data: this.props.taskData,
            period_type:"ww",
         });
        axios.get("/api/worktt/task_track/getTask_Track.action?emp_id="+window.sessionStorage.getItem('emp_id')+"&task_id="+this.props.taskData.task_id+"")
                .then((response) => {
                    // console.log(response);
                    let data={
                        planning:'',
                        fact:'',
                        difference:'',
                        time_plan:'',
                        time_fact:'',
                        cpercent:'',
                        creation_date:'',
                        last_updated_date:'',

                    }
                    let data1={   planning:'',
                        fact:'',
                        difference:'',
                        time_plan:'',
                        time_fact:'',
                        cpercent:'',
                        creation_date:'',
                        last_updated_date:'',

                    }
                    Object.assign(data,response.data.datat)
                    Object.assign(data1,response.data.datan)
                    this.setState({datat:data,datan:data1,cycle:response.data.cycle,nextcycle:response.data.nextcycle})
                    // console.log(this.state.datat);
                    // console.log(this.state.cycle)
                })
                .catch(function (error) {
                    console.log(error);
                });

    }

    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{paddingTop:30}}>
                <Form layout="inline">
                    <table width="100%">
                            <td width="50%">
                                    <legend>工作任务</legend><br/>
                                    <Form.Item  label="任务名称：" style={{marginBottom:10}}>
                                        {getFieldDecorator('task_name',{
                                            initialValue:this.state.data?this.state.data.task_name:null
                                        },)(
                                            <input style={{width:300,border:0}}  />
                                        )}
                                    </Form.Item>
                            </td>
                            <td width="50%">
                                    <legend>选择跟踪类型</legend><br/>
                                            <Form.Item >
                                                {getFieldDecorator('period_type',{initialValue:"ww"})(
                                                    <Select onChange={(value)=>{this.setState({period_type:value})}}
                                                        style={{width:125}}>
                                                        <Option value="yy">年度跟踪</Option>
                                                        <Option value="mm">月度跟踪</Option>
                                                        <Option value="ww">每周跟踪</Option>
                                                        <Option value="dw">每双周跟踪</Option>
                                                    </Select>
                                                )}
                                            </Form.Item>
                                            <Form.Item >
                                                {getFieldDecorator('period_name',{initialValue:this.state.cycle?this.state.cycle:''})(
                                                    <Input style={{width:125}}/>
                                                )}
                                            </Form.Item>
                                            <Button type="primary" onClick={this.search}>GO</Button>
                                <br/>
                                <span style={{fontSize:13,color:"#f4a344"}}>**周期格式示例：年度周期Y2019、月度周期2019M4、单周周期2019W15**</span>

                            </td>
                    </table>
                    <table width="100%">
                        <td width="50%" style={{marginLeft:30}}>
                            <ThisPlan name='本期计划'  data={this.state.datat} taskId={this.props.taskData.id} period_type={this.state.period_type}  period_name={this.state.cycle} />
                        </td>
                        <td width="50%" style={{marginLeft:30}}>
                            <ThisPlan name='下期计划'  data={this.state.datan} taskId={this.props.taskData.id} period_type={this.state.period_type} period_name={this.state.nextcycle}/>
                        </td>
                    </table>
                </Form>
            </div>
        )
    }
}


const WrappedRegistrationForm = Form.create({ name: 'addTask' })(TaskEdit);
export default WrappedRegistrationForm;
