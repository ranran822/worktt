import React, { Component } from 'react';
import echarts from 'echarts/lib/echarts';
require('echarts/lib/chart/bar');
require('echarts/lib/chart/line');
require("echarts/lib/component/toolbox");
require('echarts/lib/component/tooltip');
require('echarts/lib/component/title');
class ClassLineBarEcharts extends Component {
    componentDidMount() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('main01'));
        myChart.setOption({
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'cross',
                    crossStyle: {
                        color: '#999'
                    }
                }
            },
            toolbox: {
                feature: {
                    dataView: {show: true, readOnly: false},
                    magicType: {show: true, type: ['line', 'bar']},
                    restore: {show: true},
                    saveAsImage: {show: true}
                }
            },
            legend: {
                data:['部门管理','日常运维','项目工作','部门间协作','项目跟踪']
            },
            xAxis: [
                {
                    type: 'category',
                    data: ['1月','2月','3月','4月','5月','6月','7月','8月','9月','10月','11月','12月'],
                    axisPointer: {
                        type: 'shadow'
                    }
                }
            ],
            yAxis: [
                {
                    type: 'value',
                    name: '跟踪人数',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} 个'
                    }
                },
                {
                    type: 'value',
                    name: '任务数',
                    min: 0,
                    max: 25,
                    interval: 5,
                    axisLabel: {
                        formatter: '{value} 个'
                    }
                }
            ],
            series: [
                {
                    name:'部门管理',
                    type:'bar',
                    data:[2, 4, 4, 5, 10, 6, 13, 12, 12, 20, 6, 3]
                },
                {
                    name:'日常运维',
                    type:'bar',
                    data:[6, 9, 9, 6, 8, 7, 15, 22, 7, 18, 6, 2]
                },
                {
                    name:'项目工作',
                    type:'bar',
                    data:[2, 6, 3, 5, 3, 10, 10, 23, 3, 16, 12, 6]
                },
                {
                    name:'部门间协作',
                    type:'bar',
                    data:[2, 5, 3, 4, 5, 10, 5, 14, 23, 16, 12, 6]
                },
                {
                    name:'跟踪人数',
                    type:'line',
                    yAxisIndex: 1,
                    data:[2, 12, 13, 15, 16, 10, 20, 23, 20, 16, 10, 16]
                }
            ]
        });
    }
    render() {
        return (
            <div id="main01" style={{width: 950, height: 500,}}/>
        );
    }
}
export default ClassLineBarEcharts;
