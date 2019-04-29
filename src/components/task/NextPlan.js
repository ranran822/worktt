import React, {Component} from 'react';
import {Input, Select,Button,Form} from 'antd';
const Option = Select.Option;
const { TextArea } = Input;
class NextPlan extends Component {
    render(){
        const { getFieldDecorator } = this.props.form;
        return(
            <div style={{paddingTop:30}}>
                <Form layout="inline">
                    <legend>下期计划</legend>
                    <Form.Item  label="计划">
                        {getFieldDecorator('planning')(
                            <TextArea rows={8} style={{width:500}}/>
                        )}
                    </Form.Item>
                    <Form.Item  label="实际完成情况">
                        {getFieldDecorator('fact')(
                            <TextArea rows={8} style={{width:500}}/>
                        )}
                    </Form.Item>
                    <Form.Item  label="差异原因">
                        {getFieldDecorator('difference')(
                            <TextArea rows={8} style={{width:500}}/>
                        )}
                    </Form.Item>
                    <Form.Item  label="计划耗时">
                        {getFieldDecorator('time_plan')(
                            <Input type="text" style={{width:100}}  />
                        )}
                    </Form.Item>
                    <Form.Item  label="实际耗时">
                        {getFieldDecorator('time_fact')(
                            <Input type="text" style={{width:100}}  />
                        )}
                    </Form.Item>
                    <Form.Item >
                        <Button style={{marginLeft:50}}>保存</Button>
                    </Form.Item>
                </Form>
            </div>
        )
    }
}
const WrappedRegistrationForm = Form.create({ name: 'addTask' })(NextPlan);
export default WrappedRegistrationForm;
