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
  Select,
} from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';

const FormItem = Form.Item;
const { Option } = Select;

class Registration extends Component {
  state = {
    categories: [],
    posts: [],
  };


  componentDidMount = async () => {
    const posts = await axios.get('/api/v2/noheading');
    const { data } = posts;
    this.setState({ posts: data });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { Hero: id } = values;
        axios.post('/api/v2/heading', { data: { id } }).then((result) => {
          const {
            data: { message },
          } = result;
          NotificationManager.success(message, 'SUCCESS', 2000);
          setTimeout(() => {
            this.props.history.push('/admin/hero/view');
          }, 3000);
        }).catch(async (error) => {
          const { data: { message }, statusText } = error.response;
          NotificationManager.error(message || statusText);
        });
      }
    });
  };


  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      posts,
    } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
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
      <Card className="gx-card" title="Add Post">
        <Form onSubmit={this.handleSubmit}>

          <FormItem {...formItemLayout} label={<span>Hero</span>}>
            {getFieldDecorator('Hero', {
              rules: [
                {
                  required: true,
                  message: 'Please input Hero name!',
                  whitespace: true,
                },
              ],
            })(
              <Select>
                {posts.length
                  && posts.map(post => (
                    <Option key={post.id} value={`${post.id}`}>
                      {post.title}
                    </Option>
                  ))}
              </Select>,
            )}
          </FormItem>
          <FormItem {...tailFormItemLayout}>
            <Button type="primary" htmlType="submit">
              Add Post
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
