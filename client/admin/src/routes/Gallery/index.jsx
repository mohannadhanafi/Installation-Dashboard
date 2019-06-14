/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-param-reassign */
/* eslint-disable react/prop-types */
import React, { Component } from 'react';
import {
  Button,
  Card,
  Form,
  Icon,
  Upload,
  Spin,
  Modal,
  message as messageNotification,
} from 'antd';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import uuid from 'uuid';

const FormItem = Form.Item;

class EditPartner extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    editorState: EditorState.createEmpty(),
    previewVisible: false,
    previewImage: '',
    fileList: [],
    inputVisible: false,
    inputValue: '',
    fileName: '',
    loading: false,
    name: '',
    pic: '',
    content: '',
    deletedFile: [],
  };

  componentDidMount = async () => {
    const result = await axios('/api/v2/gallery');
    const { data } = result;
    const { pic } = data[0];
    const fileList = [];

    pic.map((value) => {
      fileList.push({
        uid: uuid(),
        name: 'image.png',
        status: 'done',
        url: `/api/v2/files/getFile/${value}`,
      });
      return fileList;
    });
    this.setState({
      pic, fileList,
    });
    console.log(fileList, pic);
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  removeFile = async (file) => {
    const { deletedFile } = this.state;
    const { url } = file;
    if (url) {
      const urlSplit = url.split('/');
      const fileName = urlSplit[urlSplit.length - 1];
      deletedFile.push(fileName);
    } else {
      const {
        response: { fullName },
      } = file;

      deletedFile.push(fullName);
    }
    this.setState({ deletedFile });
  };


  handleSubmit = (e) => {
    e.preventDefault();
    const { deletedFile, fileList } = this.state;
    const files = [];
    fileList.map((file) => {
      const { url } = file;
      if (url) {
        const urlSplit = url.split('/');
        const fileName = urlSplit[urlSplit.length - 1];
        files.push(fileName);
      } else {
        const {
          response: { fullName },
        } = file;

        files.push(fullName);
        return files;
      }
    });
    this.props.form.validateFieldsAndScroll((error, values) => {
      if (!error) {
        const {
          match: {
            params: { id },
          },
        } = this.props;
        values.pic = files;
        if (files.length) {
          axios.post('/api/v2/gallery', {
            data: values,
            params: { id },
          }).then((result) => {
            const {
              data: { message },
              statusText,
              status,
            } = result;
            if (status === 200) {
              if (deletedFile.length) {
                deletedFile.map(async (file) => {
                  await axios.post('/api/v2/files/removeFile', { pic: file });
                });
              }
              this.setState({ loading: false }, () => {
                NotificationManager.success(message, 'SUCCESS', 2000);
                setTimeout(() => {
                  this.props.history.push('/admin/gallery');
                  this.setState({ disable: false });
                }, 3000);
              });
            } else {
              this.setState({ loading: false }, () => {
                messageNotification.error(message || statusText);
              });
            }
          });
        } else {
          NotificationManager.error(
            'Please Choose an image !',
            'ERROR',
            2000,
          );
          setTimeout(() => {
            this.setState({ disable: false });
          }, 2000);
        }
      }
    });
  };

  handleChange = ({ file, fileList }) => {
    this.setState({ fileList });
    const { status } = file;
    if (status === 'done') {
      const {
        response: { fullName },
      } = file;
      this.setState({ pic: fullName });
    }
  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 10 },
      },
      wrapperCol: {
        xs: { span: 20 },
        sm: { span: 12 },
      },
    };
    const {
      inputVisible,
      inputValue,
      previewVisible,
      fileList,
      pic,
    } = this.state;

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
        <div className="ant-upload-text">Upload an image</div>
      </div>
    );

    return (
      <Card className="gx-card" title="Gallery">
        <Spin spinning={this.state.loading}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Gallery">
              <Upload
                action="/api/v2/files/uploadFile"
                listType="picture-card"
                fileList={fileList}
                onPreview={this.handlePreview}
                onChange={this.handleChange}
                withCredentials
                onRemove={this.removeFile}
              >
                {fileList.length >= 6 ? null : uploadButton}
              </Upload>
              <Modal
                visible={previewVisible}
                footer={null}
                onCancel={this.handleCancel}
              >
                <img
                  alt="feature icon/img"
                  style={{ width: '100%' }}
                  src={`/api/v2/files/getFile/${pic}`}
                />
              </Modal>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">Save</Button>
            </FormItem>
          </Form>
        </Spin>
        <NotificationContainer />
      </Card>
    );
  }
}

const EditPartnerForm = Form.create()(EditPartner);
export default EditPartnerForm;
