/* eslint-disable react/forbid-prop-types,global-require */
import React from 'react';
import { Card  } from 'antd';
import axios from "axios";
const { Meta } = Card;
const pic = require('../../assets/images/pic.png');
class MemList extends React.Component {
    state={
        data:[]
    }
    componentDidMount(){
        axios.post('/api/worktt/member/showMember.action')
            .then((response)=>{
                let data=[];
                response.data.datas.map(
                    (item)=>
                        data.push(<Card
                            hoverable
                            style={{width: 280, margin: 20}}
                            cover={<img alt="example" src={pic}/>}
                        >
                            <Meta
                                title={item.emp_name}
                                description={item.introduce}
                            />
                        </Card>)
                )
                // console.log(data)
                this.setState({data:data});
            })
            .catch(function(error){
                console.log(error);
            });
    }
    render(){
        return(
            <div className="row" style={{padding:20}}>
                {this.state.data}
            </div>
        );
    }

}
export default MemList;
