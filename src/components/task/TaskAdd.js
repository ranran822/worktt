import React, {Component} from 'react';
import {Input, Form, Select, Button, DatePicker, Progress} from 'antd';
import axios from "axios";
import moment from 'moment';
const { TextArea } = Input;
const Option = Select.Option;
class TaskAdd extends Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading:false
    };
    // constructor(props){
    //     super(props)
    // }
    option=(url,name)=>{
        let key=[];
        axios.post(url).then((response)=>{
            response.data[0].map(d=>
                key.push ( <Option key={d.owner}>{d.emp_name}</Option>)
            )
            console.log(response.data[0]);
        }).catch((err)=>{console.log(err)})



return  key;
    }
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async(err, values) => {
            if (!err) {
                await this.setState({
                    id:values.id,
                    task_name:values.task_name,
                    description:values.description,
                    category:values.category,
                    status:values.status,
                    owner:values.owner,
                    start_date:values.start_date,
                    end_date:values.end_date,
                    time_plan:values.time_plan,
                    work_dir:values.work_dir,
                    svn:values.svn,
                });
                // console.log(this.state);
                axios.post('/api/worktt/task/addTask.action',this.state)
                    .then((response)=>{

                        if (!(response.data.result = true)) {
                            alert("新建失败！")
                        } else {
                            alert("新建成功");
                            this.props.Ok();
                        }

                    })
                    .catch(function(error){
                        console.log(error);
                    });
            }
            else{
                console.log("tishiyu")
            }
        });
    }
    update = () => {
        this.props.form.validateFields(async(err,values)=>{
            if (!err) {
                let data={
                    id:this.state.data.id,
                    task_name:values.task_name,
                    description:values.description,
                    category:values.category,
                    status:values.status,
                    owner:values.owner,
                    start_date:values.start_date,
                    end_date:values.end_date,
                    time_plan:values.time_plan,
                    work_dir:values.work_dir,
                    svn:values.svn,

                }

                // console.log(data);
                axios.post('/api/worktt/task/updateTask.action',data)
                    .then((response)=>{

                        if (!(response.data.result = true)) {
                            alert("修改失败！")
                        } else {
                            alert("修改成功");
                            this.props.select('');
                            this.props.Ok();
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
    async componentDidMount(){
        await this.props.form.resetFields();
        await this.setState({
            data:this.props.taskData
        })
        console.log(this.state.data.cpercent)
    }

    render(){
        const { getFieldDecorator } = this.props.form;
        let memberselect=this.option('/api/worktt/member/showOwner.action');
        return(
         <div>
             <Form onSubmit={this.handleSubmit} className="login-form" style={{paddingLeft:70}}>
                 <div className="row">
                     <div className="column" style={{padding:30}} >
                             <Form.Item><h5>工作任务</h5></Form.Item>
                         <Form.Item  label="任务名称：" style={{marginBottom:10}}>
                                 {getFieldDecorator('task_name',{
                                     rules: [{ required: true, message: '请输入任务名称!' }],
                                     initialValue:this.state.data?this.state.data.task_name:null
                                 },)(
                                     <input style={{width:180}} />
                                 )}
                                 </Form.Item>
                             <Form.Item label="负责人：" style={{marginBottom:10}}>
                                 {getFieldDecorator('owner',{
                                     rules: [{ required: true, message: '请选择负责人!' }],
                                     initialValue:this.state.data?this.state.data.owner:''
                                 },)(
                                     <Select defaultValue="--"  style={{width:130}}>
                                         {memberselect}
                                     </Select>
                                 )}
                             </Form.Item>
                             <Form.Item>
                                 描述：
                                 {getFieldDecorator('description',{
                                     initialValue:this.state.data?this.state.data.description:null
                                 })(
                                     <TextArea rows={8} style={{}} />
                                 )}

                             </Form.Item>
                     </div>
                     <div className="column" style={{paddingTop:30}}>
                         <Form.Item><h5>任务分类</h5></Form.Item>
                         <Form.Item>分类：
                             {getFieldDecorator('category',{
                                 initialValue:this.state.data?this.state.data.category:null
                             })(
                                 <Select defaultValue="--" style={{width:130}}>
                                     <Option value="系统规划">系统规划</Option>
                                     <Option value="日常运维">日常运维</Option>
                                     <Option value="项目工作">项目工作</Option>
                                     <Option value="部门管理">部门管理</Option>
                                     <Option value="部门间协作">部门间协作</Option>
                                     <Option value="学习与提升">学习与提升</Option>
                                 </Select>
                             )}
                             </Form.Item>
                     </div>
                     <div className="column" style={{padding:30}}>
                         <Form.Item><h5>计划及进度</h5></Form.Item>
                         <Form.Item label=" 开始日期：" style={{marginBottom:10}}>
                            {getFieldDecorator('start_date',{
                             rules: [{ required: true, message: '请选择开始日期!' }],
                                initialValue:this.state.data?moment(this.state.data.start_date):null
                         },)(
                             <DatePicker />
                         )}

                         </Form.Item>
                         <Form.Item label=" 结束日期：" style={{marginBottom:10}}>
                            {getFieldDecorator('end_date',{
                             rules: [{ required: true, message: '请选择结束日期!' }],
                                initialValue:this.state.data?moment(this.state.data.end_date):null
                         })(
                             <DatePicker />
                         )}

                         </Form.Item>
                         <Form.Item>状态：{getFieldDecorator('status',{
                             initialValue:this.state.data?this.state.data.status:null
                         })(
                             <Select defaultValue="--"  style={{width:130}}>
                                 <Option value="进行中">进行中</Option>
                                 <Option value="已完成">已完成</Option>
                                 <Option value="未开始">未开始</Option>
                             </Select>
                         )}
                         </Form.Item>
                         <Form.Item>时间进度：{getFieldDecorator("cpercent",{


                         })(
                             <Progress percent={this.state.data?this.state.data.cpercent:0} status="active"  showInfo={false}/>
                            )}</Form.Item>
                     </div>
                     <div className="column" style={{paddingTop:30}}>
                         <Form.Item><h5>目录存储</h5></Form.Item>
                         <Form.Item>工作目录：
                             {getFieldDecorator('work_dir',{
                                 initialValue:this.state.data?this.state.data.work_dir:null
                             })(
                             <input style={{width:200}}/>
                         )}
                         </Form.Item>
                         <Form.Item>SVN目录：{getFieldDecorator('svn',{
                             initialValue:this.state.data?this.state.data.svn:null
                         })(
                             <input style={{width:200}}/>
                         )}
                         </Form.Item>

                     </div>
                 </div>
                 <div className="row" style={{marginLeft:600,padding:30}}>
                     <Button type="primary" htmlType="submit">增加</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                     <Button type="primary" onClick={this.update}>修改</Button>&nbsp;&nbsp;&nbsp;&nbsp;
                     {/*<Button type="primary">关闭</Button>*/}
                 </div>
             </Form>
         </div>
        )
    }
}
const WrappedRegistrationForm = Form.create({ name: 'addTask' })(TaskAdd);

export default WrappedRegistrationForm;
