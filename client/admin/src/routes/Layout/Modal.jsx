/* eslint-disable react/jsx-one-expression-per-line */
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
  Col, Row, Card, Button, Form, Select, Spin, Popconfirm, Modal, Radio,

} from 'antd';
import './style.css';
import axios from 'axios';

const RadioButton = Radio.Button;
const RadioGroup = Radio.Group;
const { Option } = Select;

const FormItem = Form.Item;

class Modall extends Component {
  state ={
    categories: [], type: '', threeCats: [], catName: '',
  }

  componentDidMount() {
    axios.get('/api/v2/categories').then((result) => {
      const { data } = result;
      this.setState(() => ({ categories: data }));
    });
  }

  // handleChange = (value) => {
  //   this.setState(() => ({ type: value }));
  // }


  threeCats = (threeCats) => {
    this.setState(() => ({ threeCats }));
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const {
      visible, handleCancel, onSubmit, category, setCatId, radioChange, handleChange, type, setThreeName,
    } = this.props;
    const { categories, threeCats } = this.state;
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
    return (
      <Modal
        visible={visible}
        title="Layouts List"
        onOk={onSubmit}
        onCancel={handleCancel}
        footer={[
          <Button key="back" onClick={handleCancel}>

            Cancel
          </Button>,
          <Button key="submit" type="primary" onClick={onSubmit}>

            Submit
          </Button>,
        ]}
      >


        <FormItem {...formItemLayout} label={<span>Type</span>}>
          {getFieldDecorator('Hero')(
            <Select defaultValue="category" style={{ width: '100%' }} onChange={handleChange}>
              <Option value="category">Specific Category</Option>
              <Option value="three">Three Columns</Option>
            </Select>,
          )}
        </FormItem>
        {type === 'category' ? (
          <div className="layout-buttons">
            <FormItem {...formItemLayout} label="Cat. Name">
              {getFieldDecorator('catId')(
                <Select defaultValue="category" style={{ width: '100%' }} onChange={setCatId}>
                  {categories.map(category => (
                    <Option value={category.id}>{category.name}</Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <RadioGroup
              onChange={radioChange}
              className="layouts-group"
          >
              <RadioButton value="5" className="image__wrap">
                <img
                  className="layout-image"
                  alt=""
                  src={require('./layouts/5.JPG')}
              />
                {' '}
                <p className="img__description">Click To Choose</p>
              </RadioButton>
              <RadioButton value="6" className="image__wrap">
                <img
                  className="layout-image"
                  alt=""
                  src={require('./layouts/6.JPG')}
              />
                {' '}
                <p className="img__description">Horizontal Slider</p>
              </RadioButton>
              <RadioButton value="2" className="image__wrap">
                <img
                  className="layout-image"
                  alt=""
                  src={require('./layouts/2.JPG')}
              />
                {' '}
                <p className="img__description">Click To Choose</p>
              </RadioButton>
              <RadioButton value="8" className="image__wrap">
                <img
                  className="layout-image"
                  alt=""
                  src={require('./layouts/8.JPG')}
              />
                {' '}
                <p className="img__description">Click To Choose</p>
              </RadioButton>
              <RadioButton value="7" className="image__wrap">
                <img
                  className="layout-image"
                  alt=""
                  src={require('./layouts/7.JPG')}
              />
                {' '}
                <p className="img__description">Slider</p>
              </RadioButton>
              <RadioButton value="2" className="image__wrap">
                <img
                  className="layout-image"
                  alt=""
                  src={require('./layouts/2.JPG')}
              />
                {' '}
                <p className="img__description">Click To Choose</p>
              </RadioButton>
              <RadioButton value="7" className="image__wrap">
                <img
                  className="layout-image"
                  alt=""
                  src={require('./layouts/7.JPG')}
              />
                {' '}
                <p className="img__description">Click To Choose</p>
              </RadioButton>
              <RadioButton value="8" className="image__wrap">
                <img
                  className="layout-image"
                  alt=""
                  src={require('./layouts/4.JPG')}
              />
                {' '}
                <p className="img__description">Click To Choose</p>
              </RadioButton>
            </RadioGroup>
          </div>
        )
          : null}
        {type === 'three' ? (
          <>
            <FormItem {...formItemLayout} label="First Cat">
              {getFieldDecorator('first')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="First Category"
                  onChange={value => setThreeName('first', value)}
                >
                  {categories.map(category => (
                    <Option value={category.id}>{category.name}</Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Second Cat">
              {getFieldDecorator('second')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="Second Category"
                  onChange={value => setThreeName('second', value)}

                        >
                  {categories.map(category => (
                    <Option value={category.id}>{category.name}</Option>
                  ))}
                </Select>,
              )}
            </FormItem>
            <FormItem {...formItemLayout} label="Third Cat">
              {getFieldDecorator('third')(
                <Select
                  style={{ width: '100%' }}
                  placeholder="Third Category"
                  onChange={value => setThreeName('third', value)}

                                >
                  {categories.map(category => (
                    <Option value={category.id}>{category.name}</Option>
                  ))}
                </Select>,
              )}
              <img
                className="layout-image-threeC"
                alt=""
                src={require('./layouts/threeC.jpg')}
              />
            </FormItem>
          </>
        ) : null}

      </Modal>
    );
  }
}
const FormModal = Form.create()(Modall);
export default FormModal;
