/* eslint-disable react/forbid-prop-types,global-require */
import React from 'react';
import {Form, Table} from 'antd';
const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        render: (text, record, index) => `${index+1}`
    }, {
        title: '任务名称',
        dataIndex: 'task_name',
    },{
        title: '负责人',
        dataIndex: 'owner',
    },
    {
        title: '本期计划',
        dataIndex: 'planning'
    }, {
        title: '实际完成情况',
        dataIndex: 'fact'
    },
    {
        title: '耗时',
        dataIndex: 'time_fact'
    },
    {
        title: '下期计划',
        dataIndex: 'next_planning'
    }
];

class Detail2 extends React.Component {
    state={
        data:[],aa:true
    }
    async componentDidMount() {
        // console.log(this.props.taskData)
        await this.props.form.resetFields();
        await this.setState({
            data: this.props.searchData2,

        });
    }
    render(){
        return(
            <div><Table bordered={true} columns={columns} dataSource={this.state.data}    aa={this.state.aa}/></div>
        );
    }

}

const WrappedRegistrationForm = Form.create({ name: 'addTask' })(Detail2);
export default WrappedRegistrationForm;
