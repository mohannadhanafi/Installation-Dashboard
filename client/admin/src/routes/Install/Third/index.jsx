/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import './style.css';
import { withRouter } from 'react-router-dom';

import {
  Button,
  Card,
  Checkbox,
  Col,
  Form,
  Input,
  Modal,
  Spin,
  Row,
} from 'antd';
import { connect } from 'react-redux';
import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { setInstall } from '../../../appRedux/actions/install';

const FormItem = Form.Item;
const { confirm } = Modal;

class Registration extends Component {
  state = {
    confirmDirty: false,
    loading: false,
    autoCompleteResult: [],
    tabel: [
      { name: 'Blogs', value: 'blogs' },
      { name: 'Services', value: 'services' },
      { name: 'Hero', value: 'hero' },
      { name: 'Core', value: 'core' },
      { name: 'Features', value: 'features' },
      { name: 'Partners', value: 'partners' },
      { name: 'Potfolio', value: 'portfolio' },
      { name: 'Team', value: 'teams' },
      { name: 'Why Us', value: 'whyUs' },
      { name: 'About', value: 'about' },
      { name: 'Testimonials', value: 'testimonials' },
      { name: 'Pricing Plans', value: 'pricingPlans' },
    ],
    newsTable: [
      // { name: 'Ads', value: 'ads' },
      // { name: 'Posts', value: 'posts' },
      { name: 'Services', value: 'services' },
      // { name: 'Categories', value: 'categories' },
      // { name: 'Layout', value: 'layouts' },
      // { name: 'Comments', value: 'comments' },
      { name: 'Galleries', value: 'galleries' },
      { name: 'Testimonials', value: 'testimonials' },
      { name: 'Teams', value: 'teams' },
    ],
    checkedValues: [],
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { checkedValues } = this.state;
        values.tables = checkedValues;
        Promise.resolve(this.props.setInstall(values)).then(() => {
          const data = this.props.values;
          const loading = () => {
            this.setState(() => ({ loading: true }));
          };
          const disloading = () => {
            this.setState(() => ({ loading: false }));
          };
          const redirect = () => {
            window.location = '/admin/main';
            // this.props.history.push('/admin/main');
          };
          confirm({
            title: 'Are you sure?',
            content:
              'When clicked the OK button, the installation process will start .. ',
            onOk() {
              loading();
              setTimeout(() => {
                axios
                  .post('/api/v2/install', data)
                  .then((result) => {
                    Promise.resolve(disloading()).then(() => {
                      const {
                        data: { message },
                      } = result;
                      NotificationManager.success(message, 'SUCCESS', 2000);
                    });
                    setTimeout(() => {
                      redirect();
                    }, 3000);
                  })
                  .catch(async (error) => {
                    Promise.resolve(disloading()).then(() => {
                      const {
                        data: { message },
                        statusText,
                      } = error.response;
                      NotificationManager.error(
                        message || statusText,
                        'ERROR',
                        2000,
                      );
                    });
                  });
              }, 2000);
            },
            onCancel() {},
          });
        });
      }
    });
  };

  onChange = (checkedValues) => {
    this.setState(() => ({ checkedValues }));
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { tabel, loading, newsTable } = this.state;
    const type = localStorage.getItem('type');
    const formItemLayout = {
      labelCol: {
        xs: { span: 6 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 4 },
        sm: { span: 4 },
      },
    };

    return (
      <Card className="gx-card fisrt-step">
        <Spin spinning={loading}>
          <Form onSubmit={this.handleSubmit}>
            <FormItem {...formItemLayout} label="Section">
              {getFieldDecorator('tabel')(
                <Row style={{ textAlign: 'left' }}>
                  <Checkbox.Group onChange={this.onChange}>
                    {type === 'informative' ? (
                      tabel
                      && tabel.map(element => (
                        <Col>
                          {' '}
                          <Checkbox value={element.value}>
                            {element.name}
                          </Checkbox>
                        </Col>
                      ))
                    ) : (
                      newsTable
                      && newsTable.map(element => (
                        <Col>
                          {' '}
                          <Checkbox value={element.value}>
                            {element.name}
                          </Checkbox>
                        </Col>
                      ))
                    )}
                  </Checkbox.Group>
                </Row>,
              )}
            </FormItem>
            <Button
              type="primary"
              htmlType="submit"
              style={{ float: 'right', marginRight: 2 }}
            >
              Next
            </Button>
            <Button
              style={{ float: 'right', marginRight: 12 }}
              onClick={() => this.props.prev()}
            >
              Previous
            </Button>
          </Form>
        </Spin>
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
)(withRouter(RegistrationForm));
