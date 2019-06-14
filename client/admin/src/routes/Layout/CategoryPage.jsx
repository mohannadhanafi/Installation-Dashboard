/* eslint-disable camelcase */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { Component } from 'react';
import {
  Card, Button, Radio, Col, Row, Slider, Divider, Checkbox,
} from 'antd';
import './style.css';
import axios from 'axios';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';
import { withRouter } from 'react-router-dom';
import Preview from './Preview';

const RadioGroup = Radio.Group;

class DragNDrop extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      loading: true,
      sliderValue: '',
      checkValue: '',
    };
  }

  componentDidMount() {
    axios.get('/api/v2/options').then((result) => {
      const { data } = result;
      const { category_layout, category_post_no, category_right } = data[0];
      this.setState(() => ({
        category_layout,
        loading: false,
        checkValue: category_right,
        sliderValue: category_post_no,
      }));
    });
  }

  handleSave = () => {
    const { category_layout, sliderValue, checkValue } = this.state;
    axios
      .post('/api/v2/options', {
        category_layout,
        category_right: checkValue,
        category_post_no: sliderValue,
      })
      .then((result) => {
        const {
          data: { message },
          statusText,
        } = result;
        if (result.status === 200) {
          NotificationManager.success(message, 'SUCCESS', 2000);
        } else {
          NotificationManager.error(message || statusText, 'ERROR', 2000);
        }
      });
  };

  radioChange = (e) => {
    this.setState({
      category_layout: e.target.value,
    });
  };

  sliderChange = (sliderValue) => {
    this.setState(() => ({ sliderValue }));
  };

  checkChange = (e) => {
    const { checked } = e.target;
    this.setState(() => ({ checkValue: checked }));
  };

  render() {
    const radioStyle = {
      display: 'block',
      height: '30px',
      lineHeight: '30px',
    };
    const {
      loading, category_layout, sliderValue, checkValue,
    } = this.state;
    return (
      <>
        <Card loading={loading}>
          {category_layout ? (
            <div className="gx-main-content gx-mb-4">
              <Row>
                <Col span={12}>
                  <RadioGroup
                    onChange={this.radioChange}
                    className="layouts-group"
                    defaultValue={category_layout}
                  >
                    <Radio value="1" style={radioStyle}>
                      Standard
                    </Radio>
                    <Radio value="2" style={radioStyle}>
                      List View
                    </Radio>
                  </RadioGroup>
                  <Divider />

                  <Row>
                    <Col span={12}>
                      <span>No. of posts in page</span>
                    </Col>
                    <Col span={12}>
                      <Slider
                        onAfterChange={this.sliderChange}
                        defaultValue={sliderValue}
                        max={20}
                      />
                    </Col>
                  </Row>
                  <Divider />
                  <Checkbox
                    onChange={this.checkChange}
                    defaultChecked={checkValue}
                  />
                  <span>Show right Section ?</span>
                </Col>
                <Col span={12}>
                  <Preview categoryLayout={category_layout} checkValue={checkValue} />

                </Col>
              </Row>
            </div>
          ) : null}
          <Button
            type="primary"
            className="layout-button"
            onClick={this.handleSave}
            style={{ float: 'right' }}
          >
            SAVE
          </Button>
          <NotificationContainer />
        </Card>
      </>
    );
  }
}

export default withRouter(DragNDrop);
