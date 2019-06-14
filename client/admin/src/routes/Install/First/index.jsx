/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable no-multiple-empty-lines */
import React, { Component } from 'react';
import './style.css';
import {
  AutoComplete,
  Button,
  Card,
  Cascader,
  Checkbox,
  Col,
  Form,
  Icon,
  Input,
  Row,
  Select,
  Tooltip,
  Radio,
} from 'antd';
import { connect } from 'react-redux';
import { setInstall } from '../../../appRedux/actions/install';

const RadioGroup = Radio.Group;

const FormItem = Form.Item;
const { Option } = Select;
class Registration extends Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
    type: '',
  };

  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        const { siteType } = values;
        localStorage.setItem('type', siteType);
        Promise.resolve(this.props.setInstall(values)).then(() => {
          this.props.next();
        });
      }
    });
  };

  onRadioChange = (e) => {
    this.setState({
      type: e.target.value,
    });
  }

  handleConfirmBlur = (e) => {
    const { value } = e.target;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };

  render() {
    const { getFieldDecorator } = this.props.form;
    const { values } = this.props;
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
      <Card className="gx-card fisrt-step">
        <Form onSubmit={this.handleSubmit}>
          <FormItem {...formItemLayout} label="NAME OF WEBSITE">
            {getFieldDecorator('name', {
              initialValue: values.name,
              rules: [
                {
                  required: true,
                  message: 'Please enter the name',
                },
              ],
            })(<Input id="name" />)}
          </FormItem>
          <FormItem {...formItemLayout} label="TYPE OF WEBSITE">
            {getFieldDecorator('siteType', {
              initialValue: values.name,
              rules: [
                {
                  required: true,
                  message: 'Please Choose type',
                },
              ],
            })(
              <RadioGroup size="small" style={{ float: 'left' }} onChange={this.onRadioChange} value={this.state.type}>
                <Radio value="informative">Information</Radio>
                <Radio value="news">News</Radio>

              </RadioGroup>,
            )}
          </FormItem>
          <Button
            type="primary"
            htmlType="submit"
            style={{ float: 'right', marginRight: 2 }}
          >Next
          </Button>
        </Form>
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
)(RegistrationForm);
