/* eslint-disable no-lone-blocks */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import {
  Button,
  Card,
  Form,
  Icon,
  Input,
  Select,
  Spin,
  Upload,
  Modal,
  Row,
  Col,
} from 'antd';
import axios from 'axios';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import './style.css';

const FormItem = Form.Item;
const { Option } = Select;
const { TextArea } = Input;

class Registration extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    name: '',
    email: '',
    rule: '',
    previewVisible: false,
    previewImage: '',
    fileList: [],
    inputVisible: false,
    fileName: '',
    pic: '',
    removedFile: [],
    bio: '',
    disable: false,
  };

  componentDidMount = async () => {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    const result = await axios(`/api/v2/users/${id}`, { params: { id } });
    const { data } = result;
    const {
      email, rule, pic, bio, password, mobile, address, first, last, jobtitle, username,
    } = data;
    const fileList = [];
    if (pic !== '') {
      await axios.get(`/api/v2/files/getFile/${pic}`).then(() => {
        fileList.push({
          uid: '-1',
          name: 'image.png',
          status: 'done',
          url: `/api/v2/files/getFile/${pic}`,
        });
      }).catch((error) => {
      });
    }
    this.setState({
      email, rule, pic, fileList, bio, password, mobile, address, first, last, jobtitle, username,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {
        fileList, removedFile, fileName,
      } = this.state;
      if (!err) {
        this.setState({ disable: true });
        const {
          match: {
            params: { id },
          },
        } = this.props;
        if (fileName !== '') {
          values.pic = fileName;
        }
        if (fileList.length) {
          axios
            .post('/api/v2/users/update', {
              data: values,
              params: { id },
            })
            .then((result) => {
              const {
                data: { message },
                statusText,
              } = result;
              if (result.status === 200) {
                this.setState({ loading: false }, () => {
                  NotificationManager.success(message, 'SUCCESS', 2000);
                  setTimeout(() => {
                    this.setState({ disable: false });
                    this.props.history.push('/admin/users/view');
                  }, 3000);
                  if (removedFile.length) {
                    removedFile.map(async (file) => {
                      await axios.post('/api/v2/files/removeFile', { pic: file });
                    });
                  }
                });
              } else {
                NotificationManager.error(message || statusText, 'ERROR', 2000);
              }
            }).catch((error) => {
              const { data: { message }, statusText } = error.response;
              NotificationManager.error(message || statusText, 'ERROR', 2000);
            });
        } else {
          NotificationManager.error('Please Choose an image !', 'ERROR', 2000);
        }
      }
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(
        domain => `${value}${domain}`,
      );
    }
    this.setState({ autoCompleteResult });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  removeFile = async (file) => {
    const { removedFile } = this.state;
    const { url } = file;
    if (url) {
      const urlSplit = url.split('/');
      const fileName = urlSplit[urlSplit.length - 1];
      removedFile.push(fileName);
    } else {
      const { response: { fullName } } = file;

      removedFile.push(fullName);
    }
    this.setState({ removedFile });
  };

  handleChange = ({ file, fileList }) => {
    this.setState({ fileList });
    const { status } = file;
    if (status === 'done') {
      const {
        response: { fullName },
      } = file;
      this.setState({ fileName: fullName });
    }
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      disable, email, rule, previewVisible, fileList, pic, password, mobile, address, first, last, jobtitle, username,
    } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 16 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 16 },
        sm: { span: 12 },
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
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Card className="gx-card" title="Edit User">
        {/* <Spin spinning={this.state.loading}> */}
        <Form onSubmit={this.handleSubmit} className="add-user">
          <Row justify="center">
            <Col span={18}>
              <FormItem {...formItemLayout} label={<span>First Name</span>}>
                {getFieldDecorator('first', {
                  initialValue: first,
                  rules: [

                    {
                      max: 50,
                      message: 'the name must be less than 50',
                      whitespace: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<span>Last Name</span>}>
                {getFieldDecorator('last', {
                  initialValue: last,
                  rules: [

                    {
                      max: 50,
                      message: 'the lastname must be less than 50',
                      whitespace: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<span>Username</span>}>
                {getFieldDecorator('username', {
                  initialValue: username,

                  rules: [

                    {
                      max: 50,
                      message: 'the username must be less than 50',
                      whitespace: true,
                    },
                  ],
                })(<Input />)}
              </FormItem>

              <FormItem {...formItemLayout} label="E-mail">
                {getFieldDecorator('email', {
                  initialValue: email,
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },

                  ],
                })(<Input id="email1" type="email" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Password">
                {getFieldDecorator('password', {

                  rules: [

                    {
                      validator: this.validateToNextPassword,
                    },
                    {
                      pattern: '^(?=.*[A-Za-z])(?=.*\\d)[A-Za-z\\d]{4,}$',
                      message:
                      'Passowrd must have at least one Numeric and one Character and length must be more than 4',
                    },
                  ],
                })(<Input type="password" />)}
              </FormItem>
              <FormItem {...formItemLayout} label="Confirm Password">
                {getFieldDecorator('confirm', {
                  rules: [

                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<span>Role</span>}>
                {getFieldDecorator('rule', {
                  initialValue: rule,
                })(
                  <Select defaultValue="admin">
                    <Option value="admin">Admin</Option>
                    <Option value="Data Entery">Data Entery</Option>
                  </Select>,
                )}
              </FormItem>

              <FormItem
                {...formItemLayout}
                label={<span>Mobile Number</span>}
            >
                {getFieldDecorator('mobile', {
                  initialValue: mobile,
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<span>Job Title</span>}>
                {getFieldDecorator('jobtitle', {
                  initialValue: jobtitle,
                })(<Input />)}
              </FormItem>
              <FormItem {...formItemLayout} label={<span>Address</span>}>
                {getFieldDecorator('address', {
                  initialValue: address,
                })(<Input />)}
              </FormItem>
              <FormItem />

            </Col>
            <Col span={6} className="addUser-image">
              {' '}
              <FormItem {...formItemLayout} label="">
                <Upload
                  action="/api/v2/files/uploadFile"
                  listType="picture-card"
                  fileList={fileList}
                  onPreview={this.handlePreview}
                  onChange={this.handleChange}
                  withCredentials
                  onRemove={this.removeFile}
              >
                  {fileList.length === 1 ? null : uploadButton}
                </Upload>
                <Modal
                  visible={previewVisible}
                  footer={null}
                  onCancel={this.handleCancel}
              >
                  <img
                    alt="example"
                    style={{ width: '100%' }}
                    src={`/api/v2/files/getFile/${pic}`}
                />
                </Modal>
              </FormItem>
            </Col>
          </Row>
          <FormItem {...tailFormItemLayout}>
            {disable ? (
              <Button disabled type="primary" htmlType="submit">
                Save
              </Button>
            ) : (
              <Button type="primary" htmlType="submit">
                Save
              </Button>
            )}
          </FormItem>
        </Form>
        <NotificationContainer />
      </Card>
    );
  }
}

const RegistrationForm = Form.create()(Registration);
export default RegistrationForm;
