import React from 'react';
import {Collapse } from 'antd';
import axios from "axios";
const Panel = Collapse.Panel;
class PosiDuty extends React.Component {
    state={
        data:[]
    }
    componentDidMount(){
        axios.post('/api/worktt/duty/showDuty.action')
            .then((response)=>{
                let data=[];
                response.data.datas.map(
                    (item)=>
                        data.push(<Panel header={item.position}>
                            <p>{item.responsibility}</p>
                        </Panel>)
                )
                console.log(data)
                this.setState({data:data});

            })
            .catch(function(error){
                console.log(error);
            });
    }
    render(){

        function callback(key) {
            console.log(key);
        }
        return(
            <div><Collapse defaultActiveKey={['0']} onChange={callback}>
                {this.state.data}
            </Collapse>
            </div>
        );
    }

}
export default PosiDuty;
