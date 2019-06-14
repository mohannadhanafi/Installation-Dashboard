/* eslint-disable no-param-reassign */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import axios from 'axios';
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
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import './style.css';

const FormItem = Form.Item;
const { Option } = Select;

class Registration extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    loading: false,
    fileList: [],
    removedFile: [],
    fileName: '',
    previewImage: '',
    previewVisible: false,
    disable: false,
  };

  toggleLoading = () => {
    this.setState(() => ({ loading: !this.state.loading }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    const { fileList, removedFile, fileName } = this.state;
    this.props.form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        this.setState({ disable: true });
        if (fileList.length) {
          await this.toggleLoading();
          values.pic = fileName;
          axios.post('/api/v2/users', values).then(async (result) => {
            await this.toggleLoading();
            const { data: { message } } = result;
            NotificationManager.success(message, 'SUCCESS', 2000);
            setTimeout(() => {
              this.props.history.push('/admin/users/view');
              this.setState({ disable: false });
            }, 3000);
            if (removedFile.length) {
              removedFile.map(async (file) => {
                await axios.post('/api/v2/files/removeFile', { pic: file });
              });
            }
          }).catch(async (error) => {
            await this.toggleLoading();
            const { data: { message }, statusText } = error.response;
            NotificationManager.error(message || statusText, 'ERROR', 2000);
            setTimeout(() => {
              this.setState({ disable: false });
            }, 2000);
          });
        } else {
          NotificationManager.error('Please Choose an image !', 'ERROR', 2000);
          setTimeout(() => {
            this.setState({ disable: false });
          }, 2000);
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

  removeFile = (file) => {
    const { removedFile } = this.state;
    const {
      response: { fullName },
    } = file;
    removedFile.push(fullName);
    this.setState({ removedFile });
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
      previewVisible, previewImage, fileList, disable,
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
          span: 12,
          offset: 4,
        },
        sm: {
          span: 12,
          offset: 2,
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
      <Card className="gx-card" title="Add User">
        <Spin spinning={this.state.loading}>
          <Form onSubmit={this.handleSubmit} className="add-user">
            <Row justify="center">
              <Col span={18}>
                <FormItem {...formItemLayout} label={<span>First Name</span>}>
                  {getFieldDecorator('first', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter first name!',
                        whitespace: true,
                      },
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
                    rules: [
                      {
                        required: true,
                        message: 'Please enter last name!',
                        whitespace: true,
                      },
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
                    rules: [
                      {
                        required: true,
                        message: 'Please enter username!',
                        whitespace: true,
                      },
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
                    rules: [
                      {
                        type: 'email',
                        message: 'The input is not valid E-mail!',
                      },
                      {
                        required: true,
                        message: 'Please input your E-mail!',
                      },
                    ],
                  })(<Input id="email1" type="email" />)}
                </FormItem>
                <FormItem {...formItemLayout} label="Password">
                  {getFieldDecorator('password', {
                    rules: [
                      {
                        required: true,
                        message: 'Please enter the password!',
                      },
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
                        required: true,
                        message: 'Please confirm password!',
                      },
                      {
                        validator: this.compareToFirstPassword,
                      },
                    ],
                  })(<Input type="password" onBlur={this.handleConfirmBlur} />)}
                </FormItem>
                <FormItem {...formItemLayout} label={<span>Role</span>}>
                  {getFieldDecorator('rule', {
                    rules: [
                      {
                        required: true,
                        message: 'Please choose role type!',
                        whitespace: true,
                      },
                    ],
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
                  {getFieldDecorator('mobile')(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label={<span>Job Title</span>}>
                  {getFieldDecorator('jobtitle')(<Input />)}
                </FormItem>
                <FormItem {...formItemLayout} label={<span>Address</span>}>
                  {getFieldDecorator('address')(<Input />)}
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
                      src={previewImage}
                    />
                  </Modal>
                </FormItem>
              </Col>
            </Row>
            <FormItem {...tailFormItemLayout}>
              {disable ? (
                <Button disabled type="primary" htmlType="submit">
                Submit
                </Button>
              ) : (
                <Button type="primary" htmlType="submit">
                Submit
                </Button>
              )}
            </FormItem>
          </Form>
        </Spin>
        <NotificationContainer />
      </Card>
    );
  }
}

const RegistrationForm = Form.create()(Registration);
export default RegistrationForm;
