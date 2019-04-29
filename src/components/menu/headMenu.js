import React from 'react';
import {Link} from 'react-router-dom';
import {Breadcrumb, Icon} from 'antd';
import PropTypes from "prop-types"


//具体导航的名称
const breadcrumbNameMap = {
    '/main/components':'首页',
    '/main/components/member':'成员管理',
    '/main/components/member/member1':'成员概览',
    '/main/components/member/member2':'成员列表',
    '/main/components/member/member3':'岗位职责',
    '/main/components/member/member4':'绩效指标',
    '/main/components/task':'任务管理',
    '/main/components/task/task1':'任务概览' ,
    '/main/components/task/task2':'任务列表' ,
    '/main/components/task/task3':'任务跟踪',
    '/main/components/task/task4':'任务编辑',
    '/main/components/annual':'年度跟踪',
    '/main/components/annual/annualTracking1':'任务概览',
    '/main/components/annual/annualTracking2':'任务列表',
    '/main/components/annual/annualTracking3':'我负责的任务',
    '/main/components/annual/annualTracking4':'我参与的项目',
    '/main/components/month':'月度跟踪',
    '/main/components/month/monthlyTracking1':'任务概览',
    '/main/components/month/monthlyTracking2':'任务列表',
    '/main/components/month/monthlyTracking3':'我负责的任务',
    '/main/components/month/monthlyTracking4':'我参与的项目',
    '/main/components/week':'每周跟踪',
    '/main/components/week/weeklyTracking1':'任务列表',
    '/main/components/common':'汇总展示',
    '/main/components/common/MatrixTable1':'矩阵表',
}
class HeadMenu extends React.Component {
    static contextTypes = {
        router:PropTypes.object
    }
    constructor(props,context) {
        super(props,context);
        this.state={
            pathSnippets: null,
            extraBreadcrumbItems: null,
        }
    }
    getPath = () => {
        //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
        //对路径进行切分，存放到this.state.pathSnippets中
        this.state.pathSnippets = this.context.router.history.location.pathname.split('/').filter(i => i);
        //将切分的路径读出来，形成面包屑，存放到this.state.extraBreadcrumbItems
        this.state.extraBreadcrumbItems = this.state.pathSnippets.map((_, index) => {
            let url = `/${this.state.pathSnippets.slice(0, index + 1).join('/')}`;
            return (
                <Breadcrumb.Item key={url}>
                    <Link to={url}>
                        {breadcrumbNameMap[url]}
                    </Link>
                </Breadcrumb.Item>
            );
        });
    }
    componentWillMount() {
        this.getPath();
    }
    componentWillReceiveProps(){
        this.getPath();
    }
    render() {
        return<Breadcrumb style={{paddingLeft:20}}><Icon type="home" />{this.state.extraBreadcrumbItems}</Breadcrumb>;
    }
}
export default HeadMenu;
