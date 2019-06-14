/* eslint-disable camelcase */
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
  Button, Card, Form, Select, Spin, Popconfirm, Modal, Radio,
} from 'antd';
import axios from 'axios';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import './style.css';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const { Option } = Select;

class Registration extends Component {
  state = {
    loading: false,
    layout: '',
    categories: [],
    position: '',
    category_id: '',
    visible: false,
  };

  componentDidMount = async () => {
    this.setState({ loading: true }, async () => {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      const result = await axios('/api/v2/layout/singlePage', {
        params: { id },
      });
      const { data } = result;
      const { layout_name: layout, position, category_id } = data[0];
      this.setState({ loading: false }, async () => {
        this.setState({
          layout,
          position,
          category_id,
          radioChange: layout,

        });
      });
    });
  };

  showModal = () => {
    this.setState({
      visible: true,
    });
  };

  handleOk = (e) => {
    const { radioChange } = this.state;


    this.setState({ visible: false, layout: radioChange });
  };

  handleCancel = () => {
    this.setState({ visible: false });
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  radioChange = (e) => {
    const { value } = e.target;
    this.setState(() => ({ radioChange: value }));
  };

  handleSubmit = async (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      const {
        match: {
          params: { id },
        },
      } = this.props;
      if (!err) {
        const { layout } = this.state;
        values.category_id = id;
        values.layout_name = layout;
        axios
          .post('/api/v2/layout/update', { data: values })
          .then((result) => {
            const {
              data: { message },
              statusText,
              status,
            } = result;
            if (status === 200) {
              this.setState({ loading: false }, () => {
                NotificationManager.success(message, 'SUCCESS', 2000);
                setTimeout(() => {
                  this.props.history.push('/admin/layouts/Home/view');
                }, 3000);
              });
            } else {
              this.setState({ loading: false }, () => {
                NotificationManager.error(message || statusText, 'ERROR', 2000);
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
      }
    });
  };

  render() {
    const { layout, position, visible } = this.state;
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
      <Card className="gx-card" title="Category Details">
        <Spin spinning={this.state.loading}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label={<span>Layout</span>}>
              {getFieldDecorator('button', { initialValue: `${layout}` })(
                <Button type="primary" onClick={this.showModal}>
                  Open Modal To Choose Layout
                </Button>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label={<span>position</span>}>
              {getFieldDecorator('position', { initialValue: `${position}` })(
                <Select placeholder="Select position">
                  <Option value="0" style={{ color: 'red' }}>
                    DONT SHOW IN HOME PAGE
                  </Option>
                  <Option value="1">First</Option>
                  <Option value="2">Second</Option>
                  <Option value="3">Third</Option>
                  <Option value="4">Fourth</Option>
                  <Option value="5">Fifth</Option>
                  <Option value="6">Sixth</Option>
                </Select>,
              )}
            </FormItem>
            <FormItem {...tailFormItemLayout}>
              <Popconfirm
                title="If there is a any category in this position it will be removed, Are you sure ?"
                onConfirm={this.handleSubmit}
                okText="Yes"
                cancelText="No"
              >
                <Button type="primary" htmlType="submit">
                  Update
                </Button>
              </Popconfirm>
            </FormItem>
          </Form>
          <Modal
            visible={visible}
            title="Layouts List"
            onOk={this.handleOk}
            onCancel={this.handleCancel}
            footer={[
              <Button key="back" onClick={this.handleCancel}>
                Cancel
              </Button>,
              <Button key="submit" type="primary" onClick={this.handleOk}>
                Submit
              </Button>,
            ]}
          >
            <div>

              <RadioGroup
                onChange={this.radioChange}
                className="layouts-group"
                defaultValue={`${layout}`}
              >
                <RadioButton value="1" className="image__wrap">
                  <img
                    className="layout-image"
                    alt=""
                    src={require('../../../../assets/images/layouts/first.JPG')}
                  />{' '}
                  <p className="img__description">Click To Choose</p>
                </RadioButton>
                <RadioButton value="2" className="image__wrap">
                  <img
                    className="layout-image"
                    alt=""
                    src={require('../../../../assets/images/layouts/second.JPG')}
                  />{' '}
                  <p className="img__description">Horizontal Slider</p>
                </RadioButton>
                <RadioButton value="3" className="image__wrap">
                  <img
                    className="layout-image"
                    alt=""
                    src={require('../../../../assets/images/layouts/third.JPG')}
                  />{' '}
                  <p className="img__description">Click To Choose</p>
                </RadioButton>
                <RadioButton value="4" className="image__wrap">
                  <img
                    className="layout-image"
                    alt=""
                    src={require('../../../../assets/images/layouts/fourth.JPG')}
                  />{' '}
                  <p className="img__description">Click To Choose</p>
                </RadioButton>
                <RadioButton value="5" className="image__wrap">
                  <img
                    className="layout-image"
                    alt=""
                    src={require('../../../../assets/images/layouts/fifth.JPG')}
                  />{' '}
                  <p className="img__description">Slider</p>
                </RadioButton>
                <RadioButton value="6" className="image__wrap">
                  <img
                    className="layout-image"
                    alt=""
                    src={require('../../../../assets/images/layouts/sixth.JPG')}
                  />{' '}
                  <p className="img__description">Click To Choose</p>
                </RadioButton>
              </RadioGroup>
            </div>
          </Modal>
        </Spin>
        <NotificationContainer />
      </Card>
    );
  }
}

const RegistrationForm = Form.create()(Registration);
export default RegistrationForm;
