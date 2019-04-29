import React, { Component } from 'react';
import './slider.less';
import LoginForm from "./login/LoginForm";
class App extends Component {
  render() {
    return (
            <div className="back">
                <LoginForm/>
            </div>
    );
  }
}

export default App;
