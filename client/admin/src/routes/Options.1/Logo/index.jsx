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
  Button,
  Card,
  Form,
  Upload,
  Modal,
  Icon,
  Input,
} from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const FormItem = Form.Item;

class Registration extends Component {
  state = {
    coloured_logo: '',
    white_logo: '',
    favicon: '',
    previewVisible: false,
    previewImage: '',
    coloured: [],
    white: [],
    faviconList: [],
    inputVisible: false,
    colouredName: '',
    whiteName: '',
    faviconListName: '',
    pic: 'noPic.jpg',
    picFooter: 'noPic.jpg',
    picfavicon: 'noPic.png',
    removedFile: [],
    removedFileFooter: [],
    disable: false,

  };


componentDidMount = async () => {
  const res = await axios.get('/api/v2/options');
  const { data } = res;
  const {
    coloured_logo: pic,
    white_logo: picFooter, favicon: picfavicon,
  } = data[0];
  const coloured = [];
  const white = [];
  const faviconList = [];
  await axios.get(`/api/v2/files/getFile/${pic}`).then(() => {
    coloured.push({
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: `/api/v2/files/getFile/${pic}`,
    });
  }).catch((error) => {
  });
  await axios.get(`/api/v2/files/getFile/${picFooter}`).then(() => {
    white.push({
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: `/api/v2/files/getFile/${picFooter}`,
    });
  }).catch((error) => {
  });
  await axios.get(`/api/v2/files/getFav/${picfavicon}`).then(() => {
    faviconList.push({
      uid: '-1',
      name: 'image.png',
      status: 'done',
      url: `/api/v2/files/getFav/${picfavicon}`,
    });
  }).catch((error) => {
  });
  this.setState({
    pic, coloured, picFooter, white, picfavicon, faviconList,
  });
}

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {
        coloured, colouredName, whiteName, removedFile, faviconListName,
      } = this.state;
      this.setState({ disable: true });
      if (!err) {
        if (colouredName !== '') {
          values.coloured_logo = colouredName;
        }
        if (whiteName !== '') {
          values.white_logo = whiteName;
        }
        if (faviconListName !== '') {
          values.favicon = faviconListName;
        }
        if (coloured.length) {
          axios.post('/api/v2/options', values).then((result) => {
            const {
              data: { message },
              statusText,
            } = result;
            if (result.status === 200) {
              NotificationManager.success(message, 'SUCCESS', 2000);
              setTimeout(() => {
                this.props.history.push('/admin/Setting/logo');
                this.setState({ disable: false });
              }, 3000);
              if (removedFile.length) {
                removedFile.map(async (file) => {
                  await axios.post('/api/v2/files/removeFile', { pic: file });
                });
              }
            } else {
              NotificationManager.error(message || statusText, 'ERROR', 2000);
              setTimeout(() => {
                this.setState({ disable: false });
              }, 2000);
            }
          }).catch((error) => {
            const { response: { data: { message } } } = error;
            NotificationManager.error(message, 'ERROR', 2000);
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


  handleChange = ({ file, fileList }, type) => {
    const isJPG = file.type === 'image/svg';
    const isPNG = file.type === 'image/png';
    const isLt2M = file.size / 1024 / 1024 < 2;
    this.setState(() => ({ [type]: fileList }));
    if (fileList.length) {
      if (!isJPG && !isPNG) {
        NotificationManager.error(
          'You can only upload image files!',
          'ERROR',
          2000,
        );
        this.setState(() => ({ [type]: [] }));
      } else if (!isLt2M) {
        NotificationManager.error('Image must smaller than 2MB!', 'ERROR', 2000);
      } else {
        this.setState(() => ({ [type]: fileList }));
        const { status } = file;
        if (status === 'done') {
          if (type === 'faviconList') {
            const { response } = file;
            const name = `${[type]}Name`;
            this.setState(() => ({ [name]: response }));
          } else {
            const {
              response: { fullName },
            } = file;
            const name = `${[type]}Name`;
            this.setState(() => ({ [name]: fullName }));
          }
        }
      }
    }
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      coloured, previewVisible, picFooter, pic, disable, white, previewImage, faviconList,
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
      <Card className="gx-card" title="Edit Logo">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="Coloured Logo">
            <Upload
              action="/api/v2/files/uploadFile"
              listType="picture-card"
              fileList={coloured}
              onPreview={this.handlePreview}
              onChange={file => this.handleChange(file, 'coloured')}
              withCredentials
              onRemove={this.removeFile}
              accept=".png,.svg"

              >
              {coloured.length >= 1 ? null : uploadButton}
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
          <FormItem {...formItemLayout} label="White Logo">
            <Upload
              action="/api/v2/files/uploadFile"
              listType="picture-card"
              fileList={white}
              onPreview={this.handlePreview}
              onChange={file => this.handleChange(file, 'white')}
              withCredentials
              onRemove={this.removeFile}
              accept=".png,.svg"

              >
              {white.length >= 1 ? null : uploadButton}
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

          <FormItem {...formItemLayout} label="Favicon">
            <Upload
              action="/api/v2/files/uploadFav"
              listType="picture-card"
              fileList={faviconList}
              onPreview={this.handlePreview}
              onChange={file => this.handleChange(file, 'faviconList')}
              withCredentials
              onRemove={this.removeFile}
              accept=".png,.svg"

              >
              {faviconList.length >= 1 ? null : uploadButton}
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
