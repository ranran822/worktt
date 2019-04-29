import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
import axios from "axios";
require("echarts/lib/chart/pie");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
require('echarts/lib/component/legend');
class StatePieEcharts extends Component {
    state={
        data:[],
    }
    // constructor(props){
    //     super(props)
    //
    // }
    componentWillMount() {
        axios.post('/api/worktt/task/countByStatus.action')
            .then((response)=>{
                let data=[];
                response.data.datas.map(
                    (item)=> data.push({value: item[1], name: item[0]})
                )
                // console.log(data)
                this.setState({data:data});
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main03'));
        // 绘制图表
        myChart.setOption({
            title : {
                text: '按状态统计',
                x:'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                orient: 'vertical',
                left: 'left',
                data: response.data.datas.status
            },
            series : [
                {
                    name: '状态',
                    type: 'pie',
                    color: ['#dd6b66','#759aa0','#e69d87','#8dc1a9','#ea7e53','#eedd78','#73a373','#73b9bc','#7289ab', '#91ca8c','#f49f42','#37A2DA', '#32C5E9', '#67E0E3', '#9FE6B8', '#FFDB5C','#ff9f7f', '#fb7293', '#E062AE', '#E690D1', '#e7bcf3', '#9d96f5', '#8378EA', '#96BFFF'],
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:data,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        });
            })
            .catch(function(error){
                console.log(error);
            });
    }
    render() {
        return (
            <div id="main02" style={{width: 510, height: 350, padding: 40}}/>
        );
    }
}
export default StatePieEcharts;
