/* eslint-disable camelcase */
/* eslint-disable react/sort-comp */
/* eslint-disable no-console */
/* eslint-disable class-methods-use-this */
/* eslint-disable no-cond-assign */
/* eslint-disable no-param-reassign */
/* eslint-disable no-constant-condition */
/* eslint-disable linebreak-style */
/* eslint-disable react/jsx-closing-bracket-location */
/* eslint-disable linebreak-style */
/* eslint-disable react/no-access-state-in-setstate */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable linebreak-style */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  Button,
  Card,
  Form,
  Input,
  Select,
  Tooltip,
  Upload,
  Modal,
  Icon,
} from 'antd';
import axios from 'axios';
import uuid from 'uuid';

import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import { Editor } from '@tinymce/tinymce-react';


const FormItem = Form.Item;
const { TextArea } = Input;

class Registration extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    fileList: [],
    previewVisible: false,
    previewImage: '',
    tags: [],
    inputVisible: false,
    categories: [],
    fileName: '',
    content: '',
    removedFile: [],
    heroLength: '',
    inputValue: '',
    breaking: false,
    image: '',
  };


  componentDidMount = async () => {
    const { match: { params: { id } } } = this.props;
    const result = await axios.get(`/api/v2/categories/get/${id}`);
    const { data } = result;
    const {
      sub_title, title, cta, description: desc, image, body: content,
    } = data;
    const fileList = [];
    if (image !== '') {
      await axios
        .get(`/api/v2/files/getFile/${image}`)
        .then(result => fileList.push({
          uid: uuid(),
          name: 'image.png',
          status: 'done',
          url: `/api/v2/files/getFile/${image}`,
        }))
        .catch((error) => {});
    }
    this.setState({

      sub_title, title, cta, desc, image, fileList, content,
    });
  }

  handleCancel = () => this.setState({ previewVisible: false });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { match: { params: { id } } } = this.props;
        const {
          fileList, removedFile, fileName, content,
        } = this.state;
        if (fileName !== '') {
          values.image = fileName;
        }
        if (fileList.length) {
          values.body = content;
          axios
            .post(`/api/v2/categories/update/${id}`, values)
            .then((result) => {
              const {
                data: { message },
              } = result;
              NotificationManager.success(message, 'SUCCESS', 2000);
              setTimeout(() => {
                this.props.history.push('/admin/categories/view');
              }, 3000);
              if (removedFile.length) {
                removedFile.map(async (file) => {
                  await axios.post('/api/v2/files/removeFile', { pic: file });
                });
              }
            })
            .catch(async (error) => {
              const {
                data: { message },
                statusText,
              } = error.response;
              NotificationManager.error(message || statusText, 'ERROR', 2000);
            });
        } else {
          NotificationManager.error('Please Choose an image !', 'ERROR', 2000);
        }
      }
    });
  };


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

handleEditorChange = (e) => {
  const content = e.target.getContent();
  this.setState(() => ({ content }));
};

render() {
  const {
    sub_title, title, cta, desc, image, content,
  } = this.state;
  const { getFieldDecorator } = this.props.form;
  const {
    previewVisible,
    fileList,
    previewImage,
  } = this.state;
  const uploadButton = (
    <div>
      <Icon type="plus" />
      <div className="ant-upload-text">Upload</div>
    </div>
  );
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
  return (
    <Card className="gx-card" title="Edit Category Details">
      <Form onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label={<span>Image</span>}
          >
          <>
            <Upload
              action="/api/v2/files/uploadFile"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
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
                src={`/api/v2/files/getFile/${image}`}
                />
            </Modal>
          </>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
                Title
            </span>
)}
          >
          {getFieldDecorator('title', {
            initialValue: title,
            rules: [
              {
                required: true,
                message: 'Please input your Sub Title!',
                whitespace: true,
              },
              {
                max: 20,
                message: 'Max length is 20 letter!',
                whitespace: true,
              },
            ],
          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
                Sub Title
            </span>
)}
          >
          {getFieldDecorator('sub_title', {
            initialValue: sub_title,
            rules: [
              {
                required: true,
                message: 'Please input your Sub Title!',
                whitespace: true,
              },
              {
                max: 100,
                message: 'Max length is 100 letter!',
                whitespace: true,
              },
            ],

          })(<Input />)}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label={(
            <span>
                Call To Action
            </span>
)}
          >
          {getFieldDecorator('cta', {
            initialValue: cta,
          })(<Input />)}
        </FormItem>
        <FormItem {...formItemLayout} label={<span>Body</span>}>
          {' '}
          {content.length ? (
            <Editor
              initialValue={content}
              init={{
                images_upload_url: '/api/v2/files/uploadFile',
                images_upload_base_path: '/api/v2/files/uploadFile',
                image_caption: true,
                images_upload_handler: (blobInfo, success, failure) => {
                  const formData = new FormData();
                  formData.append('file', blobInfo.blob());
                  axios
                    .post('/api/v2/files/uploadFile', formData)
                    .then((result) => {
                      const {
                        data: { fullName },
                      } = result;
                      success(`/api/v2/files/getFile/${fullName}`);
                    })
                    .catch((error) => {
                      failure('error !');
                    });
                },
                height: 500,
                image_title: true,
                automatic_uploads: true,
                file_picker_types: 'file image media',
                images_upload_credentials: true,
                plugins:
                  'print preview fullpage powerpaste searchreplace autolink directionality advcode visualblocks visualchars fullscreen image link media mediaembed template codesample table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount tinymcespellchecker a11ychecker imagetools textpattern help formatpainter permanentpen pageembed mentions linkchecker',
                toolbar:
                  'formatselect | bold italic strikethrough forecolor backcolor permanentpen formatpainter | link image media pageembed | alignleft aligncenter alignright alignjustify  | numlist bullist outdent indent | removeformat | addcomment',
              }}
              onChange={this.handleEditorChange}
            />
          ) : null}
        </FormItem>

        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
              Update Category
          </Button>
        </FormItem>
      </Form>
      <NotificationContainer />
    </Card>
  );
}
}
const mapStateToProps = ({ auth }) => {
  const { authUser, url, role } = auth;
  return {
    authUser,
    url,
    role,
  };
};

const RegistrationForm = Form.create()(Registration);
export default connect(mapStateToProps)(RegistrationForm);
