import {
    Table, Input, InputNumber, Popconfirm, Form,
} from 'antd';
import React from 'react';
import axios from "axios";
import moment from "moment";
const data = [];


const FormItem = Form.Item;
const EditableContext = React.createContext();

class EditableCell extends React.Component {
 componentDidMount(){
        axios.post('/api/worktt/member/showMember.action')
            .then((response)=>{
                response.data.datas.map(aa)
                function aa(item) {
                    item.entry_date = moment(item.entry_date).format("YYYY-MM-DD");
                    item.departure_date = moment(item.departure_date).format("YYYY-MM-DD");
                    data.push(item);
                }

                console.log(data);
                this.setState({data:data,aa:false})
                console.log(response);
                // this.setState({data:response.data.datas,aa:false});
            })
            .catch(function(error){
                console.log("1");
                console.log(error);
            });
    }
    getInput = () => {
        if (this.props.inputType === 'number') {
            return <InputNumber />;
        }
        return <Input />;
    };

    render() {
        const {
            editing,
            dataIndex,
            title,
            inputType,
            record,
            index,
            ...restProps
        } = this.props;
        return (
            <EditableContext.Consumer>
                {(form) => {
                    const { getFieldDecorator } = form;
                    return (
                        <td {...restProps}>
                            {editing ? (
                                <FormItem style={{ margin: 0 }}>
                                    {getFieldDecorator(dataIndex, {
                                        rules: [{
                                            required: true,
                                            message: `Please Input ${title}!`,
                                        }],
                                        initialValue: record[dataIndex],
                                    })(this.getInput())}
                                </FormItem>
                            ) : restProps.children}
                        </td>
                    );
                }}
            </EditableContext.Consumer>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.state = { data, editingKey: '' };
        this.columns = [
            {
                title: 'No',
                dataIndex: 'no',
                render: (text, record, index) => `${index+1}`
            }, {
                title: '用户名',
                dataIndex: 'login_id',
            },{
                title: '员工编号',
                dataIndex: 'emp_id',
                key:'emp_id',
            },
            {
                title: '员工姓名',
                dataIndex: 'emp_name'
            }, {
                title: '职位',
                dataIndex: 'position'
            },
            {
                title: '入职日期',
                dataIndex: 'entry_date'
            },
            {
                title: '手机',
                dataIndex: 'mobile'
            }, {
                title: '邮箱',
                dataIndex: 'email'
            },
            {
                title: 'operation',
                dataIndex: 'operation',
                render: (text, record) => {
                    const { editingKey } = this.state;
                    const editable = this.isEditing(record);
                    return (
                        <div>
                            {editable ? (
                                <span>
                  <EditableContext.Consumer>
                    {form => (
                        <a
                            href="javascript:;"
                            onClick={() => this.save(form, record.key)}
                            style={{ marginRight: 8 }}
                        >
                            Save
                        </a>
                    )}
                  </EditableContext.Consumer>
                  <Popconfirm
                      title="Sure to cancel?"
                      onConfirm={() => this.cancel(record.key)}
                  >
                    <a>Cancel</a>
                  </Popconfirm>
                </span>
                            ) : (
                                <a disabled={editingKey !== ''} onClick={() => this.edit(record.key)}>Edit</a>
                            )}
                        </div>
                    );
                },
            },
        ];
    }

    isEditing = record => record.key === this.state.editingKey;

    cancel = () => {
        this.setState({ editingKey: '' });
    };

    save(form, key) {
        form.validateFields((error, row) => {
            if (error) {
                return;
            }
            const newData = [...this.state.data];
            const index = newData.findIndex(item => key === item.key);
            if (index > -1) {
                const item = newData[index];
                newData.splice(index, 1, {
                    ...item,
                    ...row,
                });
                this.setState({ data: newData, editingKey: '' });
            } else {
                newData.push(row);
                this.setState({ data: newData, editingKey: '' });
            }
        });
    }

    edit(key) {
        this.setState({ editingKey: key });
    }

    render() {
        const components = {
            body: {
                cell: EditableCell,
            },
        };

        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    inputType: col.dataIndex === 'age' ? 'number' : 'text',
                    dataIndex: col.dataIndex,
                    title: col.title,
                    editing: this.isEditing(record),
                }),
            };
        });

        return (
            <EditableContext.Provider value={this.props.form}>
                <Table
                    components={components}
                    bordered
                    dataSource={this.state.data}
                    columns={columns}
                    rowClassName="editable-row"
                    pagination={{
                        onChange: this.cancel,
                    }}
                />
            </EditableContext.Provider>
        );
    }
}

const EditableFormTable = Form.create()(EditableTable);

export default EditableFormTable;















