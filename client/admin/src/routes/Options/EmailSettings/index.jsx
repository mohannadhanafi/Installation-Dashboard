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
  Form, Input, Checkbox,
} from 'antd';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { connect } from 'react-redux/es';
import { setForm } from '../../../appRedux/actions/form';

const FormItem = Form.Item;

class Registration extends Component {
  state = {
    disable: false,
  };

  componentDidMount() {
    const { options } = this.props;
    if (options.length) {
      this.setState({ active: options[0].active });
    }
  }


  onChangeCheck = () => {
    this.setState({ active: !this.state.active });
    this.props.form.validateFieldsAndScroll((err, values) => {
      values.active = this.state.active;
      this.props.setForm(values);
    });
  };

  onChange =() => {
    this.props.form.validateFieldsAndScroll((err, values) => {
      this.props.setForm(values);
    });
  }


  render() {
    const { getFieldDecorator } = this.props.form;

    const { options } = this.props;
    const { disable } = this.state;
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

    return (
      <>
        {
  options.length ? (
    <Form onSubmit={this.handleSubmit} onChange={this.onChange}>


      <FormItem {...formItemLayout} label={<span>Mail</span>}>
        {getFieldDecorator('mail', {
          initialValue: options[0].mail,
          rules: [
            {
              type: 'email',
              message: 'The input is not valid E-mail!',
            },
          ],
        })(<Input />)}
      </FormItem>

      <FormItem {...formItemLayout} label="Password">
        {getFieldDecorator('password', {
          rules: [
            {
              // required: true,
              // message: 'Please input your password!',
            },

          ],
        })(<Input type="password" />)}
      </FormItem>
      <FormItem />
    </Form>
  ) : null}

        <NotificationContainer />
      </>
    );
  }
}

const RegistrationForm = Form.create()(Registration);
const mapStateToProps = (props) => {
  const { opations: options } = props.opations;
  return {
    options,
  };
};

export default connect(mapStateToProps, { setForm })(RegistrationForm);
