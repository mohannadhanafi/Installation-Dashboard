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
import moment from 'moment';
import {
  Button,
  Card,
  Form,
  Input,
  Upload,
  Modal,
  Icon,
  DatePicker,
  Select,
} from 'antd';
import uuid from 'uuid';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { Editor } from '@tinymce/tinymce-react';

const { Option } = Select;

const FormItem = Form.Item;

class Registration extends Component {
  state = {
    content: '',
    fileList: [],
    previewVisible: false,
    previewImage: '',
    categories: [],
    fileName: '',
    removedFile: [],
    services: [],
    finalResult: '',
    disable: false,
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        this.setState({ disable: true });
        const {
          icon, content, removedFile, fileList, fileName,
        } = this.state;
        if (fileName !== '') {
          values.image = fileName;
        }
        values.body = content;
        const {
          match: {
            params: { id },
          },
        } = this.props;
        if (fileList.length) {
          axios
            .post(`/api/v2/portfolio/update/${id}`, values)
            .then((result) => {
              const {
                data: { message },
              } = result;
              NotificationManager.success(message, 'SUCCESS', 2000);
              setTimeout(() => {
                this.props.history.push('/admin/portfolio/view');
                this.setState({ disable: false });
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
              setTimeout(() => {
                this.setState({ disable: false });
              }, 2000);
            });
        } else {
          NotificationManager.error(
            'Please Choose image !',
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

  componentWillMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    axios.get(`/api/v2/portfolio/${id}`).then(async (resultPortfolio) => {
      const { image, body } = resultPortfolio.data;
      const finalResult = resultPortfolio.data;
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
          .catch((error) => { this.props.history.push('/admin'); });
      }
      this.setState(() => ({ finalResult, fileList, content: body }));
      axios.get('/api/v2/services').then((result) => {
        const { data } = result;
        this.setState(() => ({ services: data }));
      });
    }).catch((error) => { this.props.history.push('/admin'); });
  }

  handleEditorChange = (e) => {
    const content = e.target.getContent();
    this.setState(() => ({ content }));
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
      const {
        response: { fullName },
      } = file;

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

  componentDidMount() {
    axios.get('/api/v2/portfolio/portfolioCategory').then((result) => {
      const { data } = result;
      this.setState({ categories: data });
    });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      previewVisible, fileList, previewImage, services, content, finalResult: {
        title, date, categoty_id, location, client,
      }, disable, categories,
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
      <Card className="gx-card" title="Update Portfolio">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label={<span>Image</span>}>
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
                  src={previewImage}
                />
              </Modal>
            </>
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Title</span>}>
            {getFieldDecorator('title', {
              initialValue: title,
              rules: [
                {
                  required: true,
                  message: 'Please input the title!',
                  whitespace: true,
                },
                {
                  max: 30,
                  message: 'Max is 30 letter',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Category</span>}>
            {getFieldDecorator('categoty_id', {
              initialValue: categoty_id || null,
            })(
              <Select>
                {categories.length && categories.map(category => (
                  <option value={category.id}>{category.name}</option>
                ))}
              </Select>,
            )}
          </FormItem>
          {/* <FormItem {...formItemLayout} label={<span>Service</span>}>
            {getFieldDecorator('service_id', {
              initialValue: `${service_id}`,
              rules: [
                {
                  required: true,
                  message: 'Please choose service !',
                  whitespace: true,
                },
              ],
            })(
              <Select>
                {services.length && services.map(service => (
                  <Option value={`${service.id}`}>{service.title}</Option>
                ))}

              </Select>,
            )}
          </FormItem> */}
          <FormItem {...formItemLayout} label={<span>Date</span>}>
            {getFieldDecorator('date', { initialValue: date ? moment(date) : null })(<DatePicker />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Client</span>}>
            {getFieldDecorator('client', {
              initialValue: client,
              rules: [
                {
                  max: 30,
                  message: 'Max is 30 Letter !',
                  whitespace: true,
                },
              ],
            })(<Input type="text" />)}
          </FormItem>

          <FormItem {...formItemLayout} label={<span>Location</span>}>
            {getFieldDecorator('location', {
              initialValue: location,
              rules: [
                {
                  max: 40,
                  message: 'Max is 40 Letter !',
                  whitespace: true,
                },
              ],
            })(<Input type="text" />)}
          </FormItem>
          {content ? (
            <FormItem {...formItemLayout} label={<span>Body</span>}>
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
            </FormItem>
          ) : null}
          <FormItem {...tailFormItemLayout}>
            {!disable
              ? (
                <Button type="primary" htmlType="submit">
              Save
                </Button>
              )
              : (
                <Button type="primary" disabled htmlType="submit">
         Save
                </Button>
              ) }
          </FormItem>
        </Form>
        <NotificationContainer />
      </Card>
    );
  }
}

const RegistrationForm = Form.create()(Registration);
export default RegistrationForm;
