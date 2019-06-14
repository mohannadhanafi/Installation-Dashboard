/* eslint-disable no-nested-ternary */
/* eslint-disable no-param-reassign */
/* eslint-disable no-return-assign */
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
import { EditorState } from 'draft-js';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import ColorPicker from 'rc-color-picker';
import 'rc-color-picker/assets/index.css';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';

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
    color: '',
    name: '',
    parent: '',
    pic: '',
    seo: '',
    description: '',
    removedFile: [],
  };

  componentDidMount = async () => {
    this.setState({ loading: true }, async () => {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      if (id && Number.isInteger(parseInt(id, 10))) {
        axios(`/api/v2/categories/${id}`)
          .then(async (result) => {
            const { data } = result;
            const {
              name, parent, pic, seo, colour, description, tags,
            } = data;
            const allCategories = await axios.get('/api/v2/categories');
            this.setState({ loading: false }, async () => {
              const { data: categories } = allCategories;

              const categoriesValues = categories.filter(
                cat => cat.id !== parseInt(id, 10),
              );

              const fileList = [];
              await axios
                .get(`/api/v2/files/getFile/${pic}`)
                .then((result) => {
                  fileList.push({
                    uid: '-1',
                    name: 'image.png',
                    status: 'done',
                    url: `/api/v2/files/getFile/${pic}`,
                  });
                })
                .catch((error) => {});
              this.setState({
                categories: categoriesValues,
                name,
                parent,
                pic,
                seo,
                color: colour,
                description,
                tags,
                fileList,
              });
            });
          })
          .catch((error) => {
            const {
              data: { message: errorMessage },
              statusText: errorText,
            } = error.response;
            NotificationManager.error(errorMessage || errorText, 'ERROR', 2000);
            setTimeout(() => {
              this.props.history.push('/admin/Categories/Main');
            }, 2000);
          });
      } else {
        this.props.history.push('/admin/Categories/Main');
      }
    });
  };

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
    const { removedFile } = this.state;
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          match: {
            params: { id },
          },
        } = this.props;
        const { fileList, tags, fullName } = this.state;
        if (fileList.length) {
          if (values.colour) {
            const { color } = values.colour;
            values.colour = color;
          }
          values.pic = fullName;
          values.tags = tags;

          this.setState(() => ({ loading: true }));
          axios
            .post('/api/v2/categories/update', {
              data: values,
              params: { id },
            })
            .then((result) => {
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
                    this.props.history.push('/admin/Categories/Main');
                  }, 3000);
                });
              } else {
                this.setState({ loading: false }, () => {
                  NotificationManager.error(
                    message || statusText,
                    'ERROR',
                    2000,
                  );
                });
              }
            })
            .catch((error) => {
              this.setState({ loading: false }, () => {
                const {
                  data: { message },
                  statusText,
                } = error.response;
                NotificationManager.error(message || statusText, 'ERRRO', 2000);
              });
            });
        } else {
          NotificationManager.error(
            'Please Choose a new image !',
            'ERROR',
            2000,
          );
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
      this.setState({ fullName });
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
      const {
        response: { fullName },
      } = file;

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
    const {
      tags,
      inputVisible,
      inputValue,
      name,
      seo,
      previewVisible,
      fileList,
      categories,
      color,
      description,
      parent,
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
        <div className="ant-upload-text">Upload</div>
      </div>
    );

    return (
      <Card className="gx-card" title="Category Details">
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
                initialValue: name,
                rules: [
                  {
                    max: 20,
                    message: 'Max Letters for Name is 20',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>Parent category</span>}>
              {getFieldDecorator('parent')(
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
            <FormItem
              {...formItemLayout}
              label={<span>Current Parent category</span>}
            >
              {parent === 0 ? (
                <span style={{ color: 'red' }}>Main Category</span>
              ) : (
                categories
                && categories.map(value => (value.id === parent ? <span style={{ color: 'red' }}>{value.name}</span> : null))
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Seo Name">
              {getFieldDecorator('seo', {
                initialValue: seo,
                rules: [
                  {
                    max: 20,
                    message: 'Max Letters for Seo is 20',
                    whitespace: true,
                  },
                ],
              })(<Input />)}
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
                initialValue: description,
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
                  src={`/api/v2/files/getFile/${pic}`}
                />
              </Modal>
            </FormItem>
            <FormItem {...formItemLayout} label="Meta tags">
              <div>
                {tags.map((tag) => {
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
                Update
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
