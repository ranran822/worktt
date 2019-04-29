// 系统左侧的menu
import React, {Component} from 'react';
import {Menu, Icon} from 'antd';
import PropTypes from 'prop-types'

const {SubMenu} = Menu;

class SiderMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {selectMenu: [window.location.hash.substr(1, window.location.hash.length)]};
    }
    render() {
        return <Menu defaultSelectedKeys={['0']} mode="inline" selectedKeys={this.state.selectMenu}>
                <SubMenu
                key="sub1"
                title={<span><Icon type="contacts" theme="twoTone" /><span>成员管理</span></span>}
            >
                <Menu.Item key="2" onClick={() => this.props.history.push('/main/components/member/member1')}><Icon type="idcard" theme="twoTone" />成员概览</Menu.Item>
                <Menu.Item key="3" onClick={() => this.props.history.push('/main/components/member/member2')}><Icon type="database" theme="twoTone" />成员列表</Menu.Item>
                <Menu.Item key="4" onClick={() => this.props.history.push('/main/components/member/member3')}><Icon type="database" theme="twoTone" />岗位职责</Menu.Item>
                <Menu.Item key="5" onClick={() => this.props.history.push('/main/components/member/member4')}><Icon type="database" theme="twoTone" />绩效指标</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub2"
                title={<span><Icon type="project" theme="twoTone" /><span>任务管理</span></span>}
            >
                <Menu.Item key="6" onClick={() => this.props.history.push('/main/components/task/task1')}><Icon type="pie-chart" theme="twoTone" />任务概览</Menu.Item>
                <Menu.Item key="7" onClick={() => this.props.history.push('/main/components/task/task2')}><Icon type="database" theme="twoTone" />任务列表</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub3"
                title={<span><Icon type="security-scan" theme="twoTone" /><span>年度跟踪</span></span>}
            >
                <Menu.Item key="8" onClick={() => this.props.history.push('/main/components/annual/annualTracking1')}><Icon type="fund" theme="twoTone" />任务概览</Menu.Item>
                <Menu.Item key="9" onClick={() => this.props.history.push('/main/components/annual/annualTracking2')}><Icon type="database" theme="twoTone" />任务列表</Menu.Item>
                <Menu.Item key="10" onClick={() => this.props.history.push('/main/components/annual/annualTracking3')}><Icon type="database" theme="twoTone" />我负责的任务</Menu.Item>
                <Menu.Item key="11" onClick={() => this.props.history.push('/main/components/annual/annualTracking4')}><Icon type="database" theme="twoTone" />我参与的项目</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub4"
                title={<span><Icon type="security-scan" theme="twoTone" /><span>月度跟踪</span></span>}
            >
                {/*<Menu.Item key="12" onClick={() => this.props.history.push('/main/components/month/monthlyTracking1')}><Icon type="database" theme="twoTone" />任务概览</Menu.Item>*/}
                <Menu.Item key="13" onClick={() => this.props.history.push('/main/components/month/monthlyTracking2')}><Icon type="database" theme="twoTone" />任务列表</Menu.Item>
                <Menu.Item key="14" onClick={() => this.props.history.push('/main/components/month/monthlyTracking3')}><Icon type="database" theme="twoTone" />我负责的任务</Menu.Item>
                <Menu.Item key="15" onClick={() => this.props.history.push('/main/components/month/monthlyTracking4')}><Icon type="database" theme="twoTone" />我参与的项目</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub5"
                title={<span><Icon type="security-scan" theme="twoTone" /><span>每周跟踪</span></span>}
            >
                <Menu.Item key="16" onClick={() => this.props.history.push('/main/components/week/weeklyTracking1') }><Icon type="database" theme="twoTone"/>任务列表</Menu.Item>
            </SubMenu>
            <SubMenu
                key="sub6"
                title={<span><Icon type="appstore" theme="twoTone" /><span>汇总展示</span></span>}
            >
                <Menu.Item key="17" onClick={() => this.props.history.push('/main/components/common/MatrixTable1') }><Icon type="database" theme="twoTone" />矩阵表</Menu.Item>
            </SubMenu>
        </Menu>
    }
}

SiderMenu.propTypes = {
    list: PropTypes.array
};

export default SiderMenu;
