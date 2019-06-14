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
import {
  Button, Card, Form, Input, Icon, Upload, Modal, Checkbox,
} from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import TextArea from 'antd/lib/input/TextArea';
import uuid from 'uuid';

const FormItem = Form.Item;

class Registration extends Component {
  state = {
    footer_description: '',
    mobile: '',
    email: '',
    logo: '',
    copyrighrs: '',
    previewVisible: false,
    previewImage: '',
    fileList: [],
    inputVisible: false,
    fileName: '',
    pic: 'noPic.jpg',
    removedFile: [],
    features: [],
  };

  componentDidMount() {
    const {
      match: {
        params: { id },
      },
    } = this.props;
    axios(`/api/v2/pricingPlans/${id}`).then(async (result) => {
      const { data } = result;
      const {
        image,
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
        ...data,
        fileList,
      });
    }).catch((error) => {
      const {
        data: { message: errorMessage },
        statusText: errorText,
      } = error.response;
      NotificationManager.error(errorMessage || errorText, 'ERROR', 2000);
      setTimeout(() => {
        this.props.history.push('/admin/pricing/view');
      }, 2000);
    });
  }


  handleSubmit = (e) => {
    e.preventDefault();
    const {
      match: {
        params: { id },
      },
    } = this.props;
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const {
          removedFile, fileName,
        } = this.state;
        if (fileName !== '') {
          values.image = fileName;
        }
        axios
          .post(`/api/v2/pricingPlans/update/${id}`, values)
          .then((result) => {
            const {
              data: { message },
              statusText,
            } = result;
            if (result.status === 200) {
              NotificationManager.success(message, 'SUCCESS', 2000);
              setTimeout(() => {
                this.props.history.push('/admin/pricing/view');
              }, 3000);
              if (removedFile.length) {
                removedFile.map(async (file) => {
                  await axios.post('/api/v2/files/removeFile', { pic: file });
                });
              }
            } else {
              NotificationManager.error(message || statusText, 'ERROR', 2000);
            }
          })
          .catch((error) => {
            this.setState({ loading: false }, () => {
              const {
                data: { message: errorMessage },
                statusText: statusMessage,
              } = error.response;
              NotificationManager.error(errorMessage || statusMessage, 'ERROR', 2000);
            });
          });
      }
    });
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
      const {
        response: { fullName },
      } = file;

      removedFile.push(fullName);
    }
    this.setState({ removedFile });
  };

  handleChange = ({ file, fileList }) => {
    const isJPG = file.type === 'image/svg';
    const isPNG = file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    this.setState({ fileList });
    const { status } = file;
    if (fileList.length) {
      if (!isJPG && !isPNG) {
        NotificationManager.error(
          'You can only upload image files!',
          'ERROR',
          2000,
        );
        this.setState({ fileList: [] });
      } else if (!isLt2M) {
        NotificationManager.error('Image must smaller than 2MB!', 'ERROR', 2000);
        this.setState({ fileList: [] });
      } else
      if (status === 'done') {
        const {
          response: { fullName },
        } = file;
        this.setState({ fileName: fullName });
      }
    }
  };

  onChangeCheck = () => {
    this.setState({ primary: !this.state.primary });
  };

  remove = (k) => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    const { features } = this.state;
    const filterFeatures = features.filter((value, index) => index !== k);
    this.setState(() => ({ features: filterFeatures }));
    form.setFieldsValue({
      keys: keys.filter(key => key !== k),
    });
  }

  add = () => {
    const { form } = this.props;
    const keys = form.getFieldValue('keys');
    let nextKeys;
    const lastElement = keys[keys.length - 1];
    if (!isNaN(lastElement)) {
      nextKeys = keys.concat(lastElement + 1);
      form.setFieldsValue({
        keys: nextKeys,
      });
    } else {
      nextKeys = keys.concat(0);
      form.setFieldsValue({
        keys: nextKeys,
      });
    }
  }

  render() {
    const { getFieldDecorator, getFieldValue } = this.props.form;
    const {
      fileList, previewVisible, pic, title, description, price, interval, cta, features, primary,
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
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
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
    const initValues = [];

    if (features) {
      features.map((value, index) => initValues.push(index));
    } getFieldDecorator('keys', { initialValue: initValues });
    const keys = getFieldValue('keys');
    const formItems = keys.map((k, index) => (
      <FormItem
        {...formItemLayout}
        label={index === 0 ? 'Features' : ' '}
        required={false}
        key={keys[index]}
      >
        {getFieldDecorator(`features[${keys[index]}]`, {
          initialValue: features[index],
          validateTrigger: ['onChange', 'onBlur'],
          rules: [{
            required: true,
            whitespace: true,
            message: 'Please input feature or delete this field.',
          }],
        })(
          <Input placeholder="Feature" style={{ width: '40%', marginRight: 8 }} />,
        )}
        {keys.length > 0 ? (
          <Icon
            className="dynamic-delete-button"
            type="minus-circle-o"
            onClick={() => this.remove(k)}
            />
        ) : null}
      </FormItem>
    ));
    return (
      <Card className="gx-card" title={`Update Pricing Plan - ${title}`}>
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Image">
            <Upload
              action="/api/v2/files/uploadFile"
              listType="picture-card"
              fileList={fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              withCredentials
              onRemove={this.removeFile}
              accept=".png,.svg"
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
          <FormItem {...formItemLayout} label={<span>Title</span>}>
            {getFieldDecorator('title', {
              initialValue: title,
              rules: [
                {
                  required: true,
                  message: 'Please enter the title !',
                },
                {
                  max: 30,
                  message: 'Max is 30 Letter',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Description</span>}>
            {getFieldDecorator('description', {
              initialValue: description,

              rules: [
                {
                  max: 150,
                  message: 'Max is 150 Letter',
                },
              ],
            })(<TextArea rows={4} />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Price - Currency</span>}>
            {getFieldDecorator('price', {
              initialValue: price,
              rules: [
                {
                  required: true,
                  message: 'Please enter the price !',
                },
                {
                  max: 15,
                  message: 'Max is 15 Letter',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Interval</span>}>
            {getFieldDecorator('interval', {
              initialValue: interval,
              rules: [
                {
                  required: true,
                  message: 'Please enter the interval !',
                },
                {
                  max: 15,
                  message: 'Max is 15 Letter',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Call To Action</span>}>
            {getFieldDecorator('cta', {
              initialValue: cta,
              rules: [
                {
                  max: 15,
                  message: 'Max is 15 Letter',
                },
              ],
            })(<Input />)}
          </FormItem>
          <FormItem {...formItemLayout} label={<span>Primary</span>}>
            {getFieldDecorator('primary')(<Checkbox checked={primary} onChange={this.onChangeCheck}>Mark As Primary Plan ?</Checkbox>)}
          </FormItem>
          {formItems}
          <FormItem {...formItemLayout} label={<span>{formItems.length < 1 ? 'Features' : ''}</span>}>
            <Button type="dashed" onClick={this.add} style={{ width: '40%' }}>
              <Icon type="plus" /> Add New Feature
            </Button>
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Save
            </Button>
          </FormItem>
        </Form>
        <NotificationContainer />
      </Card>
    );
  }
}

const RegistrationForm = Form.create()(Registration);
export default RegistrationForm;
