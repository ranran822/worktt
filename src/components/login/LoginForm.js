import {
    Form, Icon, Input, Button, Checkbox,
} from 'antd';
import '../slider.less';
import * as React from "react";
import {Link} from "react-router-dom";
import axios from "axios";
class LoginForm extends React.Component {
    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFields((err, values) => {

            if (!err) {
                axios.get("/api/worktt/member/login.action?login_id="+values.login_id+"&passwd="+values.passwd+"")
                   // JSON.parse(result)
                    .then((response)=>{
                        console.log(response);
                        if(response.data.result==='登录成功'){
                          // this.props.history.push("/main");
                            window.sessionStorage.setItem('user',response.data.datas.login_id);
                            window.sessionStorage.setItem('emp_id',response.data.datas.emp_id);
                            console.log("登陆id",window.sessionStorage.getItem('emp_id'))
                            window.location.href=('http://localhost:3000/main');
                        }else if(response.data.result==='密码不正确'){
                            alert("密码不正确，请重新输入");
                        }else if(response.data.result==='用户名不存在'){
                            alert("用户不存在，请重新输入");
                        }
                    })
                    .catch(function(error){
                        console.log(error);
                    });
            }
        });
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <div><div >
                </div>
            <Form onSubmit={this.handleSubmit} className="login-form" style={{width:500,paddingTop:200,marginLeft:350}}>
                <Form.Item style={{marginBottom:10}}>
                    {getFieldDecorator('login_id', {
                        rules: [{ required: true, message: '请输入您的用户名!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="登录名" />
                    )}
                </Form.Item>
                <Form.Item style={{marginBottom:10}}>
                    {getFieldDecorator('passwd', {
                        rules: [{ required: true, message: '请输入您的密码!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="密码" />
                    )}
                </Form.Item>
                <Form.Item>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住密码</Checkbox>
                    )}
                    {/*<a className="login-form-forgot" href="">忘记密码？</a>*/}
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        确认登录
                    </Button>
                    选择 <Link to="../signup">注册</Link>
                </Form.Item>
            </Form>
            </div>
        );
    }
}

const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(LoginForm);

export default WrappedNormalLoginForm;
