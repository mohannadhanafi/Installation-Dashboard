/* eslint-disable react/jsx-indent */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import './style.css';
import {
  AutoComplete,
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Select,
  Upload,
  Modal,
} from 'antd';
import axios from 'axios';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import { connect } from 'react-redux';

import { setInstall } from '../../../appRedux/actions/install';

const FormItem = Form.Item;

class Registration extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    previewVisible: false,
    previewImage: '',
    fileList: [],
    fileName: '',
    removedFile: [],
    loading: false,
  };

  componentWillMount() {
    const { pic } = this.props.values;
    const { fileList } = this.state;
    if (pic) {
      axios
        .get(`/api/v2/files/getFile/${pic}`)
        .then((result) => {
          fileList.push({
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: `/api/v2/files/getFile/${pic}`,
          });
          this.setState(() => ({ fileList }));
        });
    }
  }

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { fileList, removedFile, fileName } = this.state;
        if (fileList.length) {
          this.setState({ loading: true }, () => {
            values.pic = fileName;
            if (removedFile.length) {
              removedFile.map(async (file) => {
                axios.post('/api/v2/files/removeFile', { pic: file }).then(() => {
                  Promise.resolve(this.props.setInstall(values)).then(async () => {
                    this.props.next();
                  });
                });
              });
            }
            Promise.resolve(this.props.setInstall(values)).then(async () => {
              this.props.next();
            });
          });
        } else {
          NotificationManager.error('Please Choose an image !', 'ERROR', 2000);
        }
      }
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

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

  removeFile = async (file) => {
    const { removedFile } = this.state;
    const { url } = file;
    if (url) {
      const urlSplit = url.split('/');
      const fileName = urlSplit[urlSplit.length - 1];
      removedFile.push(fileName);
    } else {
      const {
        response: { fullName },
      } = file;

      removedFile.push(fullName);
    }
    this.setState({ removedFile });
  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { previewVisible, previewImage, fileList } = this.state;
    const { getFieldDecorator } = this.props.form;
    const { values } = this.props;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 18 },
      },
    };
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Card className="gx-card fisrt-step">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="WEBSITE LOGO">
            <Upload
              action="/api/v2/files/uploadFile"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              withCredentials
              onRemove={this.removeFile}
            >
              {fileList.length >= 1 ? null : uploadButton}
            </Upload>
            <Modal
              visible={previewVisible}
              footer={null}
              onCancel={this.handleCancel}
            >
              <img alt="example" style={{ width: '100%' }} src={previewImage} />
            </Modal>
          </FormItem>
          {/* <FormItem {...formItemLayout} label="VISION">
            {getFieldDecorator('vision', {
              initialValue: values.vision,
              rules: [
                {
                  max: 300,
                  message: 'max is 300 letter',
                },
                {
                  required: true,
                  message: 'Please enter the vision',
                },
              ],
            })(<Input id="vision" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="MISSION">
            {getFieldDecorator('mission', {
              initialValue: values.mission,

              rules: [
                {
                  max: 300,
                  message: 'max is 300 letter',
                },
                {
                  required: true,
                  message: 'Please enter the mission',
                },
              ],
            })(<Input id="mission" />)}
          </FormItem> */}
          {/* <FormItem {...formItemLayout} label="DESCRIPTION">
            {getFieldDecorator('description', {
              initialValue: values.description,

              rules: [
                {
                  max: 300,
                  message: 'max is 300 letter',
                },
                {
                  required: true,
                  message: 'Please enter the description',
                },
              ],
            })(<Input id="description" />)}
          </FormItem> */}
          <FormItem {...formItemLayout} label="ADRESS">
            {getFieldDecorator('adress', {
              initialValue: values.adress,

              rules: [
                {
                  max: 300,
                  message: 'max is 300 letter',
                },
                {
                  required: true,
                  message: 'Please enter the adress',
                },
              ],
            })(<Input id="adress" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="EMAIL">
            {getFieldDecorator('email', {
              initialValue: values.email,

              rules: [
                {
                  type: 'email',
                  message: 'Not valid email adress',
                },
                {
                  max: 300,
                  message: 'max is 300 letter',
                },
                {
                  required: true,
                  message: 'Please enter the email',
                },
              ],
            })(<Input id="email" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="PASSWORD">
            {getFieldDecorator('password', {
              initialValue: values.password,

              rules: [
                {
                  max: 300,
                  message: 'max is 300 letter',
                },
                {
                  required: true,
                  message: 'Please enter the password',
                },
              ],
            })(<Input id="password" type="password" />)}
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ float: 'right', marginRight: 2 }}
          >Next
          </Button>
          <Button
            style={{ float: 'right', marginRight: 12 }}
            onClick={() => this.props.prev()}
          >


            Previous
          </Button>
        </Form>
        <NotificationContainer />
      </Card>
    );
  }
}
const mapStateToProps = ({ install }) => {
  const { values } = install;
  return { values };
};
const RegistrationForm = Form.create()(Registration);
export default connect(
  mapStateToProps,
  { setInstall },
)(RegistrationForm);
