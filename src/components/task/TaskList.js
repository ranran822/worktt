/* eslint-disable react/forbid-prop-types,global-require,jsx-a11y/anchor-is-valid */
import React from 'react';
import {Table, Progress, Icon, Modal, Button, Input, Select, DatePicker, Form} from 'antd';
import TaskEdit from "./TaskEdit";
import TaskAdd from "./TaskAdd";
import axios from "axios";
import moment from 'moment';
const Option = Select.Option;
class TaskList extends React.Component {
    state = {
        addTaskData:{},
        visible: false,vis:false , data:[],aa:false}
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
    editTask = (record) => {
        let task_id = record.id;
        let editTaskData = record;
        editTaskData.task_id = task_id;
        this.setState({
            visible: true,
            editTaskData:editTaskData,
        });
    }
    addTask = (record) =>{
        console.log(record)
        this.setState({addTaskData:record,
            vis: true,

        })
    }
    handleOk = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    handleCancel = (e) => {
        console.log(e);
        this.setState({
            visible: false,
        });
    }
    Ok = (e) => {
        console.log(e);
        this.setState({
            vis: false,
        });
    }
    Cancel = async(e) => {
        console.log(e);
        this.setState({
            vis: false,
        });
        await this.setState({
            addTaskData:{},
        });

    }
    select=(params)=>{
        this.setState({aa:true})
        axios.get("/api/worktt/task/getTaskByCondition.action",{params})
            .then((response)=>{
                let data=[];
                response.data.datas.map(aa)
                function aa(item) {
                    item.start_date = moment(item.start_date).format("YYYY-MM-DD");
                    item.end_date = moment(item.end_date).format("YYYY-MM-DD");
                    data.push(item);
                }

                // console.log(data);
                this.setState({data:data,aa:false});
            })
            .catch(function(error){
                console.log(error);
            });


    }
    submit = () => {
        this.props.form.validateFields((err,values)=>{
            if (!err) {
                console.log('Received values of form: ', values);
                // console.log(values);
                let params = {
                    ...values
                }
                // console.log(params);
                this.select(params);
            }
            else{
                alert(err);
                console.log("tishiyu")
            }

        })

    }

    render(){
        const { getFieldDecorator } = this.props.form;
        let memberselect=this.option('/api/worktt/member/showOwner.action');
        // let categoryselect=this.option('/api/worktt/task/showTask.action');
        const columns = [
            {
                title: 'No.',
                dataIndex: 'no',
                width:100,
                render: (text, record, index) => `${index+1}`
            }, {
                title: '任务名称',
                dataIndex: 'task_name',
                key: 'task_name',
                width:200
            },
            {
                title: '分类',
                dataIndex: 'category',
                width:150
            }, {
                title: '负责人',
                dataIndex: 'owner',
                width:100
            }, {
                title: '开始日期',
                dataIndex: 'start_date',
                width:150
            }, {
                title: '结束日期',
                width:150,
                dataIndex: 'end_date',
            },{
                title: '时间进度',
                width:150,
                dataIndex: 'cpercent',
                render: cpercent =><Progress percent={cpercent} status="active" showInfo={false} />,
            },
            {
                title: '状态',
                width:100,
                dataIndex: 'status',
            },
            {
                title: '编辑',
                width:100,
                dataIndex: 'edit',
                render: (text, record) => <div style={{fontWeight: 'bold', textAlign: 'center'}}>
                    <a onClick={() => this.addTask(record)}><Icon type="edit" theme="twoTone"/></a>
                </div>,
            },
            {
                title: '跟踪',
                width:100,
                dataIndex: 'tracking',
                render: (text, record)=> <a onClick={() => this.editTask(record)}><Icon type="eye"  theme="twoTone"/></a>,
            },
        ];
        const Option = Select.Option;
        return(
            <div>
                <nav className="navbar navbar-expand-lg navbar-light bg-light">
                        <Form layout="inline">
                        <div className="collapse navbar-collapse" style={{paddingLeft:0}}>
                                    <Form.Item
                                        label="任务名称:"
                                    >
                                    {getFieldDecorator('task_name')(
                                        <Input style={{width:130,height:32}} placeholder=""/>
                                    )}
                                    </Form.Item>
                                    <Form.Item
                                        label="类别:"
                                    >
                                    {getFieldDecorator('category',{initialValue:''})(
                                        <Select style={{width:130}}>
                                            <Option value="系统规划">系统规划</Option>
                                            <Option value="日常运维">日常运维</Option>
                                            <Option value="项目工作">项目工作</Option>
                                            <Option value="部门管理">部门管理</Option>
                                            <Option value="部门间协作">部门间协作</Option>
                                            <Option value="学习与提升">学习与提升</Option>
                                        </Select>
                                    )}
                                    </Form.Item>
                                    <Form.Item
                                        label="负责人:"
                                    >
                                    {getFieldDecorator('owner',{initialValue:''})(
                                        <Select  style={{width:130}}>
                                            {memberselect}
                                        </Select>
                                    )}
                                    </Form.Item>
                                    <Form.Item
                                        label="开始日期:"
                                    >
                                    {getFieldDecorator('start_date')(
                                            <DatePicker style={{width:120}} />
                                    )}
                                    </Form.Item>
                                    <Form.Item
                                        label="结束日期:"
                                    >
                                    {getFieldDecorator('end_date')(
                                            <DatePicker style={{width:120}} />
                                    )}
                                    </Form.Item>

                                    <Form.Item
                                        label="状态:"
                                    >
                                    {getFieldDecorator('status',{initialValue:''})(
                                        <Select  style={{width:130}}>
                                            <Option value="进行中">进行中</Option>
                                            <Option value="已完成">已完成</Option>
                                            <Option value="未开始">未开始</Option>
                                        </Select>
                                    )}
                                    </Form.Item>
                                    <Form.Item>
                                    <Button type="primary"  onClick={this.submit} >搜索</Button>
                                    </Form.Item>
                                    <Form.Item>
                                    <Button type="primary" onClick={this.addTask.bind(this,[])}>新增</Button>
                                    </Form.Item>
                        </div>
                        </Form>
                </nav>
                <Table bordered={true} columns={columns} dataSource={this.state.data} rowKey="no" loading={this.state.aa} scroll={{ x: 1300, y: 600 }}/>
                <Modal width={1100}
                       footer={null}
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    > {this.state.visible?
                    <TaskEdit taskData={this.state.editTaskData}/>:''}
                </Modal>
                <Modal width={1000}
                       visible={this.state.vis}
                       onOk={this.Ok}
                       onCancel={this.Cancel}
                >    {this.state.vis?
                    <TaskAdd select={this.select} Ok={this.Ok} taskData={this.state.addTaskData}/>:''}
                </Modal>
            </div>

        );
    }

}

const WrappedRegistrationForm = Form.create({ name: 'getTaskByCondition' })(TaskList);

export default WrappedRegistrationForm;
