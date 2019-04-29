import
{
    Form, Input, Select, Button, DatePicker,message
} from 'antd';
import * as React from "react";
import axios from "axios";
const { TextArea } = Input;
const { Option } = Select;
class SignupForm extends React.Component {
    state = {
        confirmDirty: false,
        autoCompleteResult: [],
        loading:false,
    };

    handleSubmit = (e) => {
        e.preventDefault();
        this.props.form.validateFieldsAndScroll(async(err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                console.log(values);
                await this.setState({
                    emp_id:values.emp_id,
                    login_id:values.login_id,
                    passwd:values.passwd,
                    emp_name:values.emp_name,
                    position:values.position,
                    responsibility:values.responsibility,
                    mobile:values.mobile,
                    email:values.email,
                    entry_date:values.entry_date,
                    introduce:values.introduce,
                    // departure_date:values.departure_date,
                });
                axios.post('/api/worktt/member/register.action',this.state)
                    .then((response)=>{
                        console.log(response);
                        if (!(response.data.result = true)) {
                            alert("注册失败！")
                            window.location.href = ('http://localhost:3000/signup');
                        } else {
                            alert("注册成功！请登录!");
                            window.location.href = ('http://localhost:3000/login');
                        }

                    })
                    .catch(function(error){
                        console.log(error);
                    });
            }
            else{
                console.log("tishiyu")
            }
        });
    }
    inputOnBlur = (e) => {
        e.preventDefault();
        console.log('qq');
        this.props.form.validateFields((err, values) => {
            axios.get("/api/worktt/member/ajaxValidate.action?login_id=" + values.login_id + "")
                .then((response) => {
                    console.log(response);
                    if (response.data === 1) {
                        this.props.form.resetFields();
                        message.error('用户名已经存在，请重新输入！', 5);

                    } else {
                        // alert("用户名可以使用");
                        console.log('a');
                    }
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
    }
    handleConfirmBlur = (e) => {
        const value = e.target.value;
        this.setState({ confirmDirty: this.state.confirmDirty || !!value });
    }
    compareToFirstPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && value !== form.getFieldValue('passwd')) {
            callback('输入的两次密码不一致!');
        } else {
            callback();
    }
    }
    validateToNextPassword = (rule, value, callback) => {
        const form = this.props.form;
        if (value && this.state.confirmDirty) {
            form.validateFields(['confirm'], { force: true });
        }
        callback();
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        const formItemLayout = {
            labelCol: {
                xs: { span: 24 },
                sm: { span: 8 },
            },
            wrapperCol: {
                xs: { span: 24 },
                sm: { span: 16 },
            },
        };
        const tailFormItemLayout = {
            wrapperCol: {
                xs: {
                    span: 24,
                    offset: 0,
                },
                sm: {
                    span: 16,
                    offset: 8,
                },
            },
        };
        const prefixSelector = getFieldDecorator('prefix', {
            initialValue: '86',
        })(
            <Select style={{ width: 70 }}>
                <Option value="86">+86</Option>
                <Option value="87">+87</Option>
            </Select>
        );
        return (
            <div className="back">
                <div className="container" style={{width:500}}>
                   <Form {...formItemLayout} onSubmit={this.handleSubmit}>
                          <Form.Item label="用户名">
                    {getFieldDecorator('login_id', {
                        rules: [{ required: true, message: '请输入您的用户名!' }],
                    })(
                        <Input onBlur={this.inputOnBlur}  />
                    )}
                </Form.Item>
                       <Form.Item
                           label="密码"
                       >
                           {getFieldDecorator('passwd', {
                               rules: [{
                                   required: true, message: '请输入您的密码!',
                               }, {
                                   validator: this.validateToNextPassword,
                               }],
                           })(
                               <Input type="password" />
                           )}
                       </Form.Item>
                       <Form.Item
                           label="确认密码"
                       >
                           {getFieldDecorator('confirm', {
                               rules: [{
                                   required: true, message: '请确认您的密码!',
                               }, {
                                   validator: this.compareToFirstPassword,
                               }],
                           })(
                               <Input type="password" onBlur={this.handleConfirmBlur} />
                           )}
                       </Form.Item>
                       <Form.Item label="员工编号">
                           {getFieldDecorator('emp_id', {
                               rules: [{ required: true, message: '请输入您的员工编号!' }],
                           })(
                               <Input />
                           )}
                       </Form.Item>
                          <Form.Item label="员工姓名">
                    {getFieldDecorator('emp_name', {
                        rules: [{ required: true, message: '请输入您的员工姓名!' }],
                    })(
                        <Input />
                    )}
                </Form.Item>
                          <Form.Item
                        label="电子邮箱"
                    >
                        {getFieldDecorator('email', {
                            rules: [{
                                type: 'email', message: '输入的邮箱地址无效!',
                            }, {
                                required: true, message: '请输入您的邮箱!',
                            }],
                        })(
                            <Input />
                        )}
                    </Form.Item>

                          <Form.Item
                        label="手机号"
                    >
                        {getFieldDecorator('mobile', {
                            rules: [{ required: true, message: '请输入您的手机号!' }],
                        })(
                            <Input addonBefore={prefixSelector} style={{ width: '100%' }} />
                        )}
                    </Form.Item>
                          <Form.Item
                        label="职位"
                    >
                              {getFieldDecorator('position')(
                                  <Select>
                                      <Option value="前端开发">前端开发</Option>
                                      <Option value="后台开发">后台开发</Option>
                                      <Option value="数据分析">数据分析</Option>
                                      <Option value="数据安全">数据安全</Option>
                                      <Option value="测试">测试</Option>
                                      <Option value="部门经理">部门经理</Option>
                                      <Option value="实习生">实习生</Option>
                                  </Select>
                              )}
                    </Form.Item>
                          {/*<Form.Item*/}
                        {/*label="岗位职责"*/}
                    {/*>*/}
                              {/*{getFieldDecorator('responsibility')(*/}
                                  {/*<Select>*/}
                                      {/*<Option value="111">111</Option>*/}
                                  {/*</Select>*/}
                              {/*)}*/}
                    {/*</Form.Item>*/}
                          <Form.Item
                        label="入职日期"
                    >
                              {getFieldDecorator('entry_date')(
                                  <DatePicker />
                              )}
                    </Form.Item>
                          {/*<Form.Item*/}
                        {/*label="离职日期"*/}
                    {/*>*/}
                              {/*{getFieldDecorator('departure_date')(*/}
                                  {/*<DatePicker />*/}
                              {/*)}*/}
                    {/*</Form.Item>*/}
                    <Form.Item
                    label="介绍一下自己吧"
                    >
                        {getFieldDecorator('introduce')(
                            <TextArea rows={4} />
                        )}
                    </Form.Item>
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary" htmlType="submit">Register</Button>
                    </Form.Item>
                </Form>
               </div>
            </div>
        );
    }
}
const WrappedRegistrationForm = Form.create({ name: 'register' })(SignupForm);

export default WrappedRegistrationForm;
