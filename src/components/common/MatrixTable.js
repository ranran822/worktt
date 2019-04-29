/* eslint-disable react/forbid-prop-types,global-require,jsx-a11y/anchor-is-valid */
import React from 'react';
import {Button, Form, Icon,Modal , Input, Radio, Table} from 'antd';
import axios from "axios";
import Detail1 from "./Detail1";
import Detail2 from "./Detail2";
import Detail3 from "./Detail3";
import Detail5 from "./Detail5";
const RadioGroup = Radio.Group;
class MatrixTable extends React.Component {
    state = {
        value: "ww",
         datal:[],
         datad:[],
        loading: false,
        visible: false,
        vis:false,
        viss:false,
        visss:false
    }
    handleOk = () => {
        this.setState({ loading: true });
        setTimeout(() => {
            this.setState({ loading: false, visible: false ,vis:false,viss:false,visss:false});
        }, 3000);
    }

    handleCancel = () => {
        this.setState({ visible: false,vis:false,viss:false,visss:false});
    }
    search=(value1,value2)=>{
        axios.get("/api/worktt/task_track/getTask_Track.action?period_type="+this.state.value+"&task_id="+value1+"&emp_id="+value2+"")
            .then((response)=>{
               console.log(response.data.listT);
                this.setState({
                    visible: true,
                    searchData1:response.data.listT,
                    task_name:response.data.task[0].task_name,
                    category:response.data.task[0].category,
                    emp_name:response.data.member[0].emp_name
                });
                console.log(this.state.searchData1)
                console.log(this.state.task_name)

               // console.log(value1,value2);
            })
            .catch(function(error){
                console.log(error);
            });
    }
    search2=(value,name)=>{
        this.props.form.validateFields((err,values)=>{
            if (!err) {
                axios.get("/api/worktt/task_track/getTask_TrackByEmp_id.action?period_type="+this.state.value+"&emp_id="+value+"&period_name="+values.period_name+"")
                    .then((response)=>{
                        console.log(response.data[0]);
                        this.setState({
                            vis: true,
                            searchData2: response.data[0],
                            period_name:values.period_name,
                            emp_name:name,
                        })
                    })
                    .catch(function(error){
                        console.log(error);
                    });
                    }
                    else{
                        alert(err);
                        console.log("tishiyu")
                    }

        })
    }

    search3=(value)=>{
        this.props.form.validateFields((err,values)=>{
            if (!err) {
                axios.get("/api/worktt/task_track/getTask_TrackByTask_id.action?period_type="+this.state.value+"&task_id="+value+"")
                    .then((response)=>{
                        console.log(response.data[0]);
                        console.log(response.data[1]);
                        this.setState({
                             viss: true,
                             searchData31: response.data[0],
                            task_name:response.data[1][0].task_name,
                            category:response.data[1][0].category,
                            searchData32:response.data[2]

                            // period_name:values.period_name,
                            // emp_name:name,
                        })
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            }
            else{
                alert(err);
                console.log("tishiyu")
            }

        })
    }
    search4=()=>{
        this.props.form.validateFields((err,values)=>{
            if (!err) {
                axios.get("/api/worktt/task_track/TaskSum.action?period_type="+this.state.value+"&period_name="+values.period_name+"")
                    .then((response)=>{
                        console.log(response.data[0]);
                        this.setState({
                            visss: true,
                            searchData4:response.data[0]

                        })
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            }
            else{
                alert(err);
                console.log("tishiyu")
            }

        })
    }
    select=(response)=>{
        let datal=[];
        let datad=[];
        // let dataf=[];
        datal.push(
            {
                title: 'No.', width: 50, dataIndex: 'no', key: 'no', fixed: 'left',textAlign:'center',
                render: (text, record, index) => `${index+1}`
            },
            {
                title: '任务名称', width: 150, dataIndex: 'task_name',  fixed: 'left',textAlign:'center',
            },
            {
                title: '负责人', width: 100, dataIndex: 'owner', fixed: 'left',textAlign:'center',
            }
        )
        response.data[1].map(
            (item)=> datal.push(
                {
                    title:<div>
                        <a  style={{color:"#f4a344"}}  onClick={() => this.search2(Object.getOwnPropertyNames(item),item[Object.getOwnPropertyNames(item)])}>
                            {item[Object.getOwnPropertyNames(item)]}
                        </a>
                    </div>,
                    fixed: 'left',
                    dataIndex:Object.getOwnPropertyNames(item),
                    editable:true,
                    render: (val, record) =>
                        <a style={{color:"#f4a344"}}
                           onClick={() => this.search(record.task_id,Object.getOwnPropertyNames(item))}>
                            {val}
                        </a>,

                })
        )
        datal.push(
            {
                title: <div><a  style={{color:"#f4a344"}}  onClick={() => this.search4()}>
                    任务汇总
                </a></div> ,
                width: 100, dataIndex: 'taskCount',  fixed: 'left',
                render: (val, record) =>
                    <a style={{color:"#f4a344"}}
                       onClick={() => this.search3(record.task_id)}>
                        {val}
                    </a>,
            }
        )
        console.log(response.data);
        console.log(datal);
        for(let i=0;i<response.data[0].length;i++){
            datad.push(response.data[0][i]);

        }
        // dataf.push(response.data[3][0])
        console.log(datad);
        this.setState({datal:datal,datad:datad,period_name:response.data[2]});

    }
    submit = () => {
        this.props.form.validateFields((err,values)=>{
            if (!err) {
                axios.get("/api/worktt/task_track/getTimeFactBySelect.action?period_type="+this.state.value+"&period_name="+values.period_name+"")
                    .then((response)=>{
                        this.select(response);
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            }
            else{
                alert(err);
                console.log("tishiyu")
            }

        })

    }
    onChange = (e) => {
        console.log('radio checked', e.target.value);
        this.setState({
            value: e.target.value,
        });
    }
    componentWillMount(){
        axios.post('/api/worktt/task_track/getTimeFact.action')
            .then((response)=>{
                this.select(response);
            })
            .catch(function(error){
                console.log(error);
            });
    }
    render(){
        const { getFieldDecorator } = this.props.form;
        const data = [];
        return(
            <div style={{padding:20}}>
                <Form layout="inline">
                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                        <Radio value={"yy"}>
                            <Form.Item label="按年统计">
                                {getFieldDecorator('period_name')(
                                    <Input style={{ width: 100 }}/>
                                )}
                             </Form.Item>
                         </Radio>
                        <Radio value={"mm"}>
                                <Form.Item label="按月统计">
                                {getFieldDecorator('period_name')(
                                    <Input style={{ width: 100 }}/>
                                )}
                                </Form.Item>
                         </Radio>
                         <Radio value={"ww"}>
                                <Form.Item label="按周统计">
                                    {getFieldDecorator('period_name',{initialValue:this.state.period_name})(
                                        <Input style={{ width: 100 }}/>
                                    )}
                                 </Form.Item>
                        </Radio>
                          <Form.Item >
                                 <Button type="primary" shape="circle" onClick={this.submit} >Go!</Button>
                          </Form.Item>
                     </RadioGroup>
                </Form>
                <Table rowKey="no" columns={this.state.datal} dataSource={this.state.datad} bordered={true} style={{paddingTop:10,align:'center'}} />
                {/*<Table  columns={this.state.datal} dataSource={this.state.dataf}  />*/}
                {/*点击表中工时内容弹出框*/}
                <Modal width={1100}
                       footer={null}
                       title={
                           [
                               <div>
                                   <h4> <span style={{color:"#f4a344"}}>{this.state.emp_name}</span>&nbsp;任务明细表</h4>
                                   <span style={{fontSize:16}}>——&nbsp;<span style={{color:"#f4a344"}}>{this.state.task_name}({this.state.category})</span></span>
                               </div>

                           ]
                       }
                       visible={this.state.visible}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                > {this.state.visible?
                    <Detail1 searchData1={this.state.searchData1}/>:''}
                </Modal>
                {/*点击表头员工姓名弹出框*/}
                <Modal width={1100}
                       footer={null}
                       title={
                           [
                               <div>
                                   <h4> 本期&nbsp;<span style={{color:"#f4a344"}}>({this.state.period_name})</span>&nbsp;任务明细表</h4>
                                   <span style={{fontSize:16,padding:0}}>——&nbsp;<span style={{color:"#f4a344"}}>{this.state.emp_name}</span></span>
                               </div>

                           ]
                       }
                       visible={this.state.vis}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                > {this.state.vis?
                    <Detail2 searchData2={this.state.searchData2}/>:''}
                </Modal>
                {/*点击右侧汇总值弹出框*/}
                <Modal width={1100}
                       footer={null}
                       title={
                           [
                               <div>
                                   <h4> 工作任务开展一览表</h4>
                                   <span style={{fontSize:16,padding:0}}>——&nbsp;<span style={{color:"#f4a344"}}>{this.state.task_name}({this.state.category})</span></span>
                               </div>

                           ]
                       }
                       visible={this.state.viss}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                > {this.state.viss?
                    <Detail3 searchData31={this.state.searchData31} searchData32={this.state.searchData32}/>:''}
                </Modal>
                {/*点击右上角任务汇总弹出框*/}
                <Modal width={1200}
                       footer={null}
                       height={1000}
                       title={
                           [
                               <div style={{textAlign: 'center'}}>
                                   <h4>亚信科技-CIT-OSC3周工作汇报</h4>
                               </div>

                           ]
                       }
                       visible={this.state.visss}
                       onOk={this.handleOk}
                       onCancel={this.handleCancel}
                > {this.state.visss?
                    <Detail5 searchData4={this.state.searchData4}/>:''}
                </Modal>

            </div>
        );
    }

}

const WrappedRegistrationForm = Form.create({ name: 'getAllTask_Track' })(MatrixTable);

export default WrappedRegistrationForm;

