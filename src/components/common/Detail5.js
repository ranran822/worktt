import {Card, Form, Table} from 'antd';
import React from 'react';
import axios from "axios";

//表头赋值
const columns = [{
    title: '工作类别',
    dataIndex: 'category',
    width: 100,
    fixed: 'left',
    render: (value, row, index) => {
        let obj = {
            children: value,
            props: {

            },
        };
        // for(let i=0;i<index.length;i+=2){
        //     if(index===i){
        //         obj.props.rowSpan = 2;
        //     }
        //     if(index===(i+1)){
        //         obj.props.rowSpan = 0;
        //     }
        //
        // }

        return obj;
    },
}, {
    title: '序号',
        dataIndex: 'no',
        key:'no',
        render: (text, record, index) => `${index+1}`,
        width: 80,
        fixed: 'left',
}, {
        title: '事项描述',
        dataIndex: 'task_name',
        width: 150,
        fixed: 'left',
}, {
        title: '负责人',
        dataIndex: 'owner',
        width: 100,
        fixed: 'left',
}, {
    title: '进度',
    dataIndex: 'cpercent',
    width: 100,
    fixed: 'left',
}, {
    title: '跟踪成员',
    dataIndex: 'emp_name',
    width: 100,
    fixed: 'left',
},
    {
    title: '本周工作完成情况',
    dataIndex: 'fact',
    width: 230,
    fixed: 'left',
},{
    title: '下周工作计划',
    dataIndex: 'nextplanning',
    width: 230,
    fixed: 'left',
}
];
class Detail5 extends React.Component {
    constructor() {
        super();
        var today = new Date(),
            date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        this.state = {
            date: date
        };
    }
    state={
        data:[]
    }
    async componentDidMount(){
        await this.props.form.resetFields()

        //表格内容赋值
        await this.setState({

            data:this.props.searchData4

        });
        console.log(this.state.data)
    }
    render(){
        return(
            <div className="container">
            <p>部门：<span style={{color:"#f4a344",paddingRight:50}}>亚信科技-CIT-OSC3</span>填报日期：<span style={{color:"#f4a344"}}>{this.state.date}</span></p>
            <Table columns={columns} dataSource={this.state.data} bordered scroll={{ y : 500}}  />
            </div>
        );
    }

}
const WrappedRegistrationForm = Form.create({ name: 'addTask' })(Detail5);
export default WrappedRegistrationForm;
