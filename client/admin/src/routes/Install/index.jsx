import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import {
  Button, Card, message, Steps, Icon, Popover, Spin,
} from 'antd';
import axios from 'axios';
import Second from './Second';
import Third from './Third';
import First from './First';

import './style.css';

const { Step } = Steps;

class SwitchStep extends Component {
  state = {
    current: 0,
    steps: [
      {
        title: "Let's Start",
        icon: 'profile',
      },
      {
        title: 'Initialize',
        content: <Second />,
        icon: 'profile',
      },
      {
        title: 'Choose Sections',
        content: <Third />,
        icon: 'smile-o',
      },
    ],
    loading: true,
  };

  componentWillMount() {
    axios.get('/api/v2/install').then((result) => {
      const {
        data: { check },
      } = result;
      if (check) {
        this.setState(() => ({ loading: false, check }));
      } else {
        window.location = '/admin';
        // this.props.history.push('/admin');
      }
    });
  }

  next = () => {
    const current = this.state.current + 1;
    this.setState({ current });
  };

  prev = () => {
    const newLocal = this.state;
    const current = newLocal.current - 1;
    this.setState({ current });
  };

  render() {
    const { current, steps } = this.state;
    return (
      <div className="installation-div">
        <div>
          <Spin spinning={this.state.loading}>
            <Card
              className="gx-card installation-body"
              title="Installation Wizard"
            >
              <Steps
                current={current}
                style={{ width: '70%', margin: '0 auto' }}
              >
                {steps.map(item => (
                  <Step key={item.title} title={item.title} />
                ))}
              </Steps>
              <div className="steps-content">
                {current === 0 ? (
                  <First next={this.next} />
                ) : current === 1 ? (
                  <Second next={this.next} prev={this.prev} />
                ) : (
                  <Third next={this.next} prev={this.prev} />
                )}
              </div>
            </Card>
          </Spin>
        </div>
      </div>
    );
  }
}

export default withRouter(SwitchStep);
