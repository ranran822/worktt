// 路由配置
import {Route, Switch} from 'react-router-dom';
import React, {Component} from 'react';

import TaskList from "../components/task/TaskList";
import TaskView from "../components/task/TaskView";
import TaskEdit from "../components/task/TaskEdit";
import WeekTask from "../components/weeklyTracking/WeekTask"
import TaskAdd from "../components/task/TaskAdd";
import aTaskList from "../components/annualTracking/aTaskList";
import mTaskList from "../components/monthlyTracking/mTaskList";
import aTaskView from "../components/annualTracking/aTaskView";
import aMyTask from "../components/annualTracking/aMyTask";
import aMyParticipationProjects from "../components/annualTracking/aMyParticipationProjects";
import mTaskView from "../components/monthlyTracking/mTaskView";
import mMyParticipationProjects from "../components/monthlyTracking/mMyParticipationProjects"
import mMyTask from "../components/monthlyTracking/mMyTask"
import PosiDuty from "../components/member/PosiDuty";
import MemView from "../components/member/MemView";
import AchievementIndicator from "../components/member/AchievementIndicator";
import MatrixTable from "../components/common/MatrixTable";
import MemList from "../components/member/MemList";
class SystemRoute extends Component {
    componentDidMount() {

    }

    render() {
        return (
                <Switch>
                    <Route exact path="/main/components/member/member1" component={MemView}/>
                    <Route exact path="/main/components/member/member2" component={MemList}/>
                    <Route exact path="/main/components/member/member4" component={AchievementIndicator}/>
                    <Route exact path="/main/components/member/member3" component={PosiDuty}/>
                    <Route exact path="/main/components/task/task1" component={TaskView}/>
                    <Route exact path="/main/components/task/task2" component={TaskList}/>
                    <Route exact path="/main/components/task/task3" component={TaskEdit}/>
                    <Route exact path="/main/components/task/task4" component={TaskAdd}/>
                    <Route exact path="/main/components/annual/annualTracking1" component={aTaskView}/>
                    <Route exact path="/main/components/annual/annualTracking2" component={aTaskList}/>
                    <Route exact path="/main/components/annual/annualTracking3" component={aMyTask}/>
                    <Route exact path="/main/components/annual/annualTracking4" component={aMyParticipationProjects}/>
                    <Route exact path="/main/components/month/monthlyTracking1" component={mTaskView}/>
                    <Route exact path="/main/components/month/monthlyTracking2" component={mTaskList}/>
                    <Route exact path="/main/components/month/monthlyTracking3" component={mMyTask}/>
                    <Route exact path="/main/components/month/monthlyTracking4" component={mMyParticipationProjects}/>
                    <Route exact path="/main/components/week/weeklyTracking1" component={WeekTask}/>
                    <Route exact path="/main/components/common/MatrixTable1" component={MatrixTable}/>
                </Switch>
        )
    }
}

export default SystemRoute;
