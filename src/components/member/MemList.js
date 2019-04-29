/* eslint-disable react/forbid-prop-types,global-require */
import React from 'react';
import {Icon, Table} from 'antd';
import axios from "axios";
import moment from "moment";
const columns = [
    {
        title: 'No',
        dataIndex: 'no',
        render: (text, record, index) => `${index+1}`
    }, {
        title: '用户名',
        dataIndex: 'login_id',
    },{
        title: '员工编号',
        dataIndex: 'emp_id',
        key:'emp_id',
    },
    {
    title: '员工姓名',
    dataIndex: 'emp_name'
}, {
    title: '职位',
    dataIndex: 'position'
},
    {
    title: '入职日期',
    dataIndex: 'entry_date'
},
    {
    title: '手机',
    dataIndex: 'mobile'
}, {
    title: '邮箱',
    dataIndex: 'email'
    },
    {
        title: '编辑',
        width:100,
        dataIndex: 'edit',
        render: (text, record) => <div style={{fontWeight: 'bold', textAlign: 'center'}}>
            <a onClick={() => this.edit(record)}><Icon type="edit" theme="twoTone"/></a>
        </div>,
    },
    {
        title: '删除',
        width:100,
        dataIndex: 'tracking',
        render: (text, record)=> <a onClick={() => this.delete(record)}><Icon type="user-delete" /></a>,
    },

];


class MemList extends React.Component {

    state={
        data:[],aa:true
    }
    componentDidMount(){
        axios.post('/api/worktt/member/showMember.action')
            .then((response)=>{
                let data=[];
                response.data.datas.map(aa)

                function aa(item) {
                    item.entry_date = moment(item.entry_date).format("YYYY-MM-DD");
                    item.departure_date = moment(item.departure_date).format("YYYY-MM-DD");
                    data.push(item);
                }

                // console.log(data);
                this.setState({data:data,aa:false})
                // console.log(response);
                // this.setState({data:response.data.datas,aa:false});
            })
            .catch(function(error){
                console.log(error);
            });
    }
    render(){
        return(
            <div><Table bordered={true} columns={columns} dataSource={this.state.data} rowKey="emp_id"  aa={this.state.aa}/></div>
        );
    }

}
export default MemList;
