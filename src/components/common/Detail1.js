/* eslint-disable react/forbid-prop-types,global-require */
import React from 'react';
import {Form, Table} from 'antd';
const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        render: (text, record, index) => `${index+1}`
    }, {
        title: '任务周期',
        dataIndex: 'period_name',
    },{
        title: '计划完成',
        dataIndex: 'planning',
    },
    {
        title: '实际完成',
        dataIndex: 'fact'
    }, {
        title: '差异原因',
        dataIndex: 'difference'
    },
    {
        title: '计划用时',
        dataIndex: 'time_plan'
    },
    {
        title: '实际用时',
        dataIndex: 'time_fact'
    }
];

class Detail1 extends React.Component {
    state={
        data:[],aa:true
    }
    async componentDidMount() {
        // console.log(this.props.taskData)
       await this.props.form.resetFields();
        await this.setState({
            data: this.props.searchData1,
        });
    }
    render(){
        return(
            <div><Table bordered={true} columns={columns} dataSource={this.state.data}    aa={this.state.aa}/></div>
        );
    }

}

const WrappedRegistrationForm = Form.create({ name: 'addTask' })(Detail1);
export default WrappedRegistrationForm;
