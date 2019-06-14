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
  Tooltip,
  Upload,
  Spin,
  Modal,
  DatePicker,
} from 'antd';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import 'rc-color-picker/assets/index.css';
import countries from '../countries';

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;

class Registration extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    editorState: EditorState.createEmpty(),
    previewVisible: false,
    previewImage: '',
    fileList: [],
    categories: [],
    tags: [],
    inputVisible: false,
    inputValue: '',
    fileName: '',
    loading: false,
    color: '#000',
    parents: [],
    removedFile: [],
    type: 'vertical',
    linkType: '',
    posts: [],
    page: [],
  };

  componentDidMount = async () => {
    this.setState({ loading: true }, async () => {
      const {
        match: {
          params: { id },
        },
      } = this.props;

      const result = await axios(`/api/v2/ads/${id}`);
      const { data } = result;

      const {
        title, media, page, language, country, link, linkType, type, category, posts,
      } = data;

      this.setState({ loading: false }, async () => {
        const fileList = [];
        await axios.get(`/api/v2/files/getFile/${media}`).then((result) => {
          fileList.push({
            uid: '-1',
            name: 'image.png',
            status: 'done',
            url: `/api/v2/files/getFile/${media}`,
          });
        }).catch((error) => {

        });
        this.setState({
          title,
          media,
          fileList,
          page,
          language,
          country,
          link,
          linkType,
          type,
          category,
          post: posts,
        });
        axios.get('/api/v2/categories').then((result) => {
          const { data } = result;
          this.setState({ categories: data, loading: false });
        }).then(() => {
          this.getCatPosts(category);
        });
      });
    });
  }

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  changeColour = ({ color }) => {
    this.setState({ color });
  };

  handleClose = (removedTag) => {
    const tags = this.state.tags.filter(tag => tag !== removedTag);
    this.setState({ tags });
  };

  showInput = () => {
    this.setState({ inputVisible: true }, () => this.input.focus());
  };

  handleInputChange = (e) => {
    this.setState({ inputValue: e.target.value });
  };


  onBlur(evt) {
    console.log('onBlur event called with event info: ', evt);
  }

  afterPaste(evt) {
    console.log('afterPaste event called with event info: ', evt);
  }

  handleInputConfirm = () => {
    const { state } = this;
    const { inputValue } = state;
    let { tags } = state;
    if (inputValue && tags.indexOf(inputValue) === -1) {
      tags = [...tags, inputValue];
    }

    this.setState({
      tags,
      inputVisible: false,
      inputValue: '',
    });
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handleSubmit = async (e) => {
    const { removedFile } = this.state;

    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          match: {
            params: { id },
          },
        } = this.props;
        const { fileList, fileName, media } = this.state;
        if (fileList.length !== 0) {
          const { type } = fileList[0];
          values.media = media;
          values.mediaType = type;
          axios.post('/api/v2/ads/update', { values, params: { id } }).then((result) => {
            if (removedFile.length) {
              removedFile.map(async (file) => {
                await axios.post('/api/v2/files/removeFile', { pic: file });
              });
            }
            const {
              data: { message },
              statusText,
              status,
            } = result;
            if (status === 200) {
              this.setState({ loading: false }, () => {
                NotificationManager.success(message, 'SUCCESS', 2000);
                setTimeout(() => {
                  this.props.history.push('/admin/ads/view');
                }, 3000);
              });
            } else {
              this.setState({ loading: false }, () => {
                NotificationManager.error(message || statusText, 'ERROR', 2000);
              });
            }
          }).catch((error) => {
            this.setState({ loading: false }, () => {
              const {
                data: { message },
                statusText,
              } = error.response;
              NotificationManager.error(message || statusText, 'ERROR', 2000);
            });
          });
        } else {
          NotificationManager.error('Please Choose a new image !', 'ERROR', 2000);
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
      this.setState({ media: fullName });
    }
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

  saveInputRef = input => (this.input = input);

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  onEditorStateChange = (editorState) => {
    this.setState({
      editorState,
    });
  };

  typeChange = (value) => {
    this.setState(() => ({ type: value }));
  }

  linkTypeChange = (value) => {
    this.setState(() => ({ linkType: value }));
  }


  getCatPosts = (value) => {
    axios(
      `/api/v2/CatWithPosts/${value}`,
    )
      .then((result) => {
        const { data: { result: { rows } } } = result;
        this.setState(() => ({ posts: rows }));
      });
  }

  render() {
    const {
      type, linkType, categories, posts, title, page, category, link, language, country, post,
    } = this.state;
    const { getFieldDecorator } = this.props.form;
    const {
      previewVisible, fileList, previewImage,
    } = this.state;
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
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Card className="gx-card" title="Ads Details">
        <Spin spinning={this.state.loading}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label={<span>Title</span>}>
              {getFieldDecorator('title', {
                initialValue: title,
                rules: [
                  {
                    required: true,
                    message: 'Please Enter Name of ads',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>Page</span>}>

              {getFieldDecorator('page', { initialValue: page || null })(
                <Select placeholder="Select Page" mode="multiple">
                  <Option value="home">Home Page</Option>
                  <Option value="category">Category Page</Option>
                  <Option value="article">Article Page</Option>
                  <Option value="contact">Contact Page</Option>
                  <Option value="about">About Page</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={(
                <span>Type &nbsp;
                  <Tooltip title="Horizontal type accept only image file">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
)}>
              {getFieldDecorator('type', {
                initialValue: type,
                rules: [
                  {
                    required: true,
                    message: 'Please Select Type !',
                    whitespace: true,
                  },
                ],
              })(
                <Select placeholder="Select Type" onChange={this.typeChange}>
                  <Option value="vertical" selected>Vertical</Option>
                  <Option value="horizontal">Horizontal</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem
              {...formItemLayout}
              label={<span>Upload Media</span>}
          >
              <>
                <Upload
                  accept={type === 'horizontal' ? 'image/*' : 'image/*,video/*'}
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
            ,
            </FormItem>
            <FormItem {...formItemLayout} label={<span>language</span>}>
              {getFieldDecorator('language', {
                initialValue: language,
                rules: [
                  {
                    required: true,
                    message: 'Please Select language !',
                    whitespace: true,
                  },
                ],
              })(
                <Select placeholder="Select language">
                  <Option value="English">English</Option>
                  <Option value="Arabic">العربية</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>country</span>}>
              {getFieldDecorator('country', {
                initialValue: country,
                rules: [
                  {
                    required: true,
                    message: 'Please Select country !',
                    whitespace: true,
                  },
                ],
              })(
                <Select placeholder="Select country">
                  {countries.map(item => (
                    <Option value={item.name}>{item.name}</Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>Date</span>}>
              {getFieldDecorator('date')(
                <RangePicker
                  className="gx-mb-3 gx-w-100"
                  onChange={this.onChangeDate}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>Link type</span>}>
              {getFieldDecorator('linkType', {
                initialValue: linkType,
                rules: [
                  {
                    required: true,
                    message: 'Please Select language !',
                    whitespace: true,
                  },
                ],
              })(
                <Select placeholder="Select language" onChange={this.linkTypeChange}>
                  <Option value="IN">IN</Option>
                  <Option value="OUT">OUT</Option>
                </Select>,
              )}
            </FormItem>
            {linkType === 'OUT' ? (
              <FormItem {...formItemLayout} label={<span>Link</span>}>
                {getFieldDecorator('link', {
                  initialValue: link,
                  rules: [
                    {
                      required: true,
                      message: 'Please Enter Name of ads',
                      whitespace: true,
                    },
                  ],
                })(<Input addonBefore="https://" defaultValue="google.com" />)}
              </FormItem>
            ) : (
              <>
                <FormItem {...formItemLayout} label={<span>Category</span>}>
                  {getFieldDecorator('category', {
                    initialValue: category,
                    rules: [
                      {
                        required: true,
                        message: 'Please choose category name!',
                        whitespace: true,
                      },
                    ],
                  })(
                    <Select onChange={this.getCatPosts}>
                      {categories.length
                && categories.map(cat => (
                  <Option key={cat.id} value={`${cat.seo}`}>
                    {cat.name}
                  </Option>
                ))}
                    </Select>,
                  )}
                </FormItem>
                <FormItem {...formItemLayout} label={<span>Post</span>}>
                  {getFieldDecorator('posts', {
                    initialValue: post,
                    rules: [
                      {
                        whitespace: true,
                      },
                    ],
                  })(
                    <Select>
                      <Option style={{ color: 'red' }} key={null} value=""> NO POST </Option>
                      {posts && posts.length
                          && posts.map(post => (
                            <Option key={post.id} value={`${post.seo}`}>
                              {post.title}
                            </Option>
                          ))}
                    </Select>,
                  )}
                </FormItem>
              </>
            )
}
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>
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
