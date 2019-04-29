import {Card, Form, Table} from 'antd';
import React from 'react';
import axios from "axios";
const renderContent = (value, row, index) => {
    const obj = {
        children: value,
        props: {},
    };
    const a=`${index % 2}`
    if(a===0){
        obj.props.colSpan = 0;
    }
    return obj;
};

class Detail4 extends React.Component {
    state={
        data1:[],
        data2:[]
    }
    async componentDidMount(){
        await this.props.form.resetFields();
        let data1=[]
        let data2=[]
        //表头赋值
        data1.push(
            {
                title: '参与人员',
                colSpan: 2,
                dataIndex: 'emp_name',
                fixed: 'left',
                render: (value, row, index) => {
                    let obj = {
                        children: value,
                        props: {
                            rowSpan: index % 2===0 ?2:0
                        },
                    };
                    for(let i=0;i<index.length;i+=2){
                        if(index===i){
                            obj.props.rowSpan = 2;
                        }
                        if(index===(i+1)){
                            obj.props.rowSpan = 0;
                        }

                    }

                    return obj;
                },
            },
            {
                title: '内容',
                colSpan: 0,
                dataIndex: 'nr',
                fixed: 'left',

            }

        )
        console.log(data1)
        this.props.searchData31.map(
            (item)=> data1.push({
                title:item[Object.getOwnPropertyNames(item)],

                fixed: 'left',
                dataIndex:Object.getOwnPropertyNames(item)
            })
        )
        //表格内容赋值
        for(let i=0;i<this.props.searchData32.length;i++){
            data2.push(this.props.searchData32[i]);

        }

        await this.setState({
            column:data1,
            data:data2

        });
        console.log(this.state.column)
    }
    render(){
        return(
            <Table columns={this.state.column} dataSource={this.state.data} bordered/>
        );
    }

}
const WrappedRegistrationForm = Form.create({ name: 'addTask' })(Detail4);
export default WrappedRegistrationForm;
