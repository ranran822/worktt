/* eslint-disable react/forbid-prop-types,global-require,jsx-a11y/anchor-is-valid */
import React from 'react';
import {Table, Progress, Icon, Modal} from 'antd';
import TaskEdit from "../task/TaskEdit";
import moment from "moment";
class TaskTrackList extends React.Component {
    state = { visible: false ,}
    editTask = (record) => {
        this.setState({
            visible: true,
            editTaskData:record,
        });
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
    render(){
        const columns = [
            {
                title: 'No',
                dataIndex: 'id',
                width: 100,
                render: (text, record, index) => `${index+1}`
            },
            {
                title: '任务名称',
                dataIndex: 'task_name',
                width: 150
            },
            {
                title: '分类',
                dataIndex: 'category',
                width: 150
            }, {
                title: '负责人',
                dataIndex: 'owner',
                width: 150
            }, {
                title: '开始日期',
                dataIndex: 'start_date',
                width: 150
            }, {
                title: '结束日期',
                dataIndex: 'end_date',
                width: 150
            },{
                title: '计划',
                dataIndex: 'planning',
                width: 150
            },
            {
                title: '完成情况',
                dataIndex: 'fact',
                width: 150
            },
            {
                title: '差异原因',
                dataIndex: 'difference',
                width: 150
            },
            {
                title: '投入时间',
                dataIndex: 'time_fact',
                width: 150
            },
            {
                title: '完成百分比',
                dataIndex: 'cpercent',
                width: 150,
                render: completePercentage => <Progress percent={completePercentage} status="active" showInfo={true}/>
            },
            {
                title: '编辑',
                dataIndex: 'edit',
                width: 100,
// eslint-disable-next-line react/jsx-no-comment-textnodes
                render: (text, record) => <div style={{fontWeight: 'bold', textAlign: 'center'}}>
                    <a onClick={() => this.editTask(record)}><Icon type="edit" theme="twoTone"/></a>
                </div>,
            },
        ];
        let data =[];
        // console.log(this.props.weekData)
        if(!this.props.weekData){
            return null;
        }
        this.props.weekData.forEach((item)=>{
            item.start_date = moment(item.start_date).format("YYYY-MM-DD");
            item.end_date = moment(item.end_date).format("YYYY-MM-DD");
            data.push(item);
        })
        return(
            <div>
                <Table bordered={true} columns={columns} dataSource={data} scroll={{ x: 1500, y: 600 }} rowKey="id" />
                <Modal width={1100}
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                >
                    {this.state.visible?
                        <TaskEdit taskData={this.state.editTaskData}/>:''}
                </Modal>
            </div>
        );
    }

}
export default TaskTrackList;

