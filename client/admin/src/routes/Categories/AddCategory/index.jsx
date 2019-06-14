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
  Tag,
  Modal,
} from 'antd';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';

const FormItem = Form.Item;
const { Option } = Select;

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
  };

  componentDidMount() {
    this.setState({ loading: true }, () => {
      axios.get('/api/v2/categories').then((result) => {
        const { data } = result;
        this.setState({ categories: data, loading: false });
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
    e.preventDefault();
    const { fileList, removedFile } = this.state;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { fileName, tags, color } = this.state;
        if (fileList.length) {
          this.setState({ loading: true }, () => {
            values.pic = fileName;
            values.tags = tags;
            values.colour = color;
            axios
              .post('/api/v2/categories', values)
              .then((result) => {
                const {
                  data: { message },
                } = result;
                this.setState({ loading: false }, () => {
                  NotificationManager.success(message, 'SUCCESS', 2000);
                  setTimeout(() => {
                    this.props.history.push('/admin/categories/Main');
                  }, 3000);
                });
                if (removedFile.length) {
                  removedFile.map(async (file) => {
                    await axios.post('/api/v2/files/removeFile', { pic: file });
                  });
                }
              })
              .catch((error) => {
                this.setState({ loading: false }, () => {
                  const {
                    data: { message },
                    statusText,
                  } = error.response;
                  NotificationManager.error(message || statusText, 'ERROR', 2000);
                });
              });
          });
        } else {
          NotificationManager.error('Please Choose an image !', 'ERROR', 2000);
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
      this.setState({ fileName: fullName });
    }
  };

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  removeFile = (file) => {
    const { removedFile } = this.state;
    const { response: { fullName } } = file;
    removedFile.push(fullName);
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

  render() {
    const { getFieldDecorator } = this.props.form;

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
    const {
      previewVisible, previewImage, fileList, categories,
    } = this.state;
    const {
      tags, inputVisible, inputValue, color,
    } = this.state;
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <Card className="gx-card" title="Add Category">
        <Spin spinning={this.state.loading}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem
              {...formItemLayout}
              label={(
                <span>
                  Name&nbsp;
                  <Tooltip title="Nama of Category, such as Sport">
                    <Icon type="question-circle-o" />
                  </Tooltip>
                </span>
)}
            >
              {getFieldDecorator('name', {
                rules: [
                  {
                    required: true,
                    message: 'Please Enter Name of Category',
                    whitespace: true,
                  }, {
                    max: 20,
                    message: 'Max Letters for name is 20',
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="Name Of Category" />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>parent category</span>}>
              {getFieldDecorator('parent', {
                rules: [
                  {
                    required: true,
                    message: 'Please Choose Category Parent!',
                    whitespace: true,
                  },
                ],
              })(
                <Select placeholder="Select Parent Of Category">
                  <Option value="0" style={{ color: 'red' }}>
                    Main Category
                  </Option>
                  {categories.length
                    && categories.map(cat => (cat.parent === 0 ? (
                      <Option value={`${cat.id}`}>{cat.name}</Option>
                    ) : null))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Seo Name">
              {getFieldDecorator('seo', {
                rules: [
                  {
                    required: true,
                    message: 'Please Enter Seo Name',
                    whitespace: true,
                  },
                  {
                    max: 20,
                    message: 'Max Letters for Seo is 20',
                    whitespace: true,
                  },
                ],
              })(<Input placeholder="Name Of Category" />)}
            </FormItem>
            <FormItem {...formItemLayout} label="Choose Colour">
              {getFieldDecorator('colour', {})(
                <ColorPicker color={color} onChange={this.changeColour}>
                  <Input
                    className="colour-picker"
                    style={{
                      cursor: 'pointer !important',
                      backgroundColor: color,
                      width: '50px',
                    }}
                  />
                </ColorPicker>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Brief Description">
              {getFieldDecorator('description', {
                rules: [
                  {
                    required: true,
                    message: 'Please Enter Description',
                    whitespace: true,
                  },
                  {
                    max: 260,
                    message: 'Max Letters for Description is 260',
                    whitespace: true,
                  },
                ],
              })(
                <Input.TextArea
                  placeholder="Enter a brief dexcription for this category"
                  autosize={{ minRows: 2, maxRows: 6 }}
                />,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Photo Of Category">
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
                <img
                  alt="example"
                  style={{ width: '100%' }}
                  src={previewImage}
                />
              </Modal>
            </FormItem>
            <FormItem {...formItemLayout} label="Meta tags">
              <div>
                {tags.map((tag, index) => {
                  const isLongTag = tag.length > 20;
                  const tagElem = (
                    <Tag
                      key={tag}
                      closable
                      afterClose={() => this.handleClose(tag)}
                    >
                      {isLongTag ? `${tag.slice(0, 20)}...` : tag}
                    </Tag>
                  );
                  return isLongTag ? (
                    <Tooltip title={tag} key={tag}>
                      {tagElem}
                    </Tooltip>
                  ) : (
                    tagElem
                  );
                })}
                {inputVisible && (
                  <Input
                    ref={this.saveInputRef}
                    type="text"
                    size="small"
                    style={{ width: 78 }}
                    value={inputValue}
                    onChange={this.handleInputChange}
                    onBlur={this.handleInputConfirm}
                    onPressEnter={this.handleInputConfirm}
                  />
                )}
                {!inputVisible && (
                  <Tag
                    onClick={this.showInput}
                    style={{ background: '#fff', borderStyle: 'dashed' }}
                  >
                    <Icon type="plus" /> New Tag
                  </Tag>
                )}
              </div>
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit">
                Add Category
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
