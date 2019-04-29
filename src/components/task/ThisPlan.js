import React, {Component} from 'react';
import {Input,Button,Form} from 'antd';
import axios from "axios";
const { TextArea } = Input;

class ThisPlan extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading:false
    };
    async componentDidMount(){
        this.setState({
            roleId:window.sessionStorage.getItem('emp_id')
        })
        await this.props.form.resetFields();
    }
    saveOrUpdate = (type) => {
        //区分按钮
        // if(type==1){
        //
        // }
        this.props.form.validateFields(async(err,values)=>{
            if (!err) {
                let data={
                    id:values.id,
                    planning:values.planning,
                    fact:values.fact,
                    difference:values.difference,
                    time_plan:values.time_plan,
                    time_fact:values.time_fact,
                    emp_id: this.state.roleId,
                    task_id:this.props.taskId,
                    period_type:this.props.period_type,
                    period_name:this.props.period_name
                }
                console.log(data);
                axios.post('/api/worktt/task_track/saveOrUpdateTask_Track.action',data)
                    .then((response)=>{
                        if (!(response.data.result = true)) {
                            alert("保存失败！")
                        } else {
                            alert("保存成功！");
                        }

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
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{paddingTop:30}}>
                <Form layout="inline">
                    <legend>{this.props.name}</legend>
                    <Form.Item>
                        {getFieldDecorator('id',{initialValue:this.props.data.id})(
                            <input type="hidden"/>
                        )}
                    </Form.Item>
                    <Form.Item  label="计划">
                        {getFieldDecorator('planning',{initialValue:this.props.data.planning})(
                            <TextArea rows={8} style={{width:500}}/>
                        )}
                    </Form.Item>
                    <Form.Item  label="实际完成情况">
                        {getFieldDecorator('fact',{initialValue:this.props.data.fact})(
                            <TextArea rows={8} style={{width:500}}/>
                        )}
                    </Form.Item>
                    <Form.Item  label="差异原因">
                        {getFieldDecorator('difference',{initialValue:this.props.data.difference})(
                            <TextArea rows={8} style={{width:500}}/>
                        )}
                    </Form.Item>
                    <Form.Item  label="计划耗时">
                        {getFieldDecorator('time_plan',{initialValue:this.props.data.time_plan})(
                            <Input type="text" style={{width:100}}  />
                        )}
                    </Form.Item>
                    <Form.Item  label="实际耗时">
                        {getFieldDecorator('time_fact',{initialValue:this.props.data.time_fact})(
                            <Input type="text" style={{width:100}}  />
                        )}
                    </Form.Item>
                    <Form.Item >
                        <Button style={{marginLeft:50}} onClick={()=>this.saveOrUpdate(this.props.biaoshi)}>保存</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const WrappedRegistrationForm = Form.create({ name: 'addTask' })(ThisPlan);
export default WrappedRegistrationForm;
