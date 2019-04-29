import React from 'react';
import {Route} from 'react-router-dom';
import App from './components/App';
import LoginForm from './components/login/LoginForm';
import MenuFrame from './components/main/MenuFrame';
import SignupForm from "./components/signup/SignupForm";


export default(
    <div>
        <Route exact path="/" component={ App }/>
        <Route path="/signup" component={ SignupForm }/>
        <Route path="/login" component={ LoginForm }/>
        <Route path="/main" component={ MenuFrame }/>
    </div>
)
