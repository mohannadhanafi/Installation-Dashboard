/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Card, Divider, Table, Popconfirm,
} from 'antd';
import {
  NotificationContainer,
  NotificationManager,
} from 'react-notifications';

class Dynamic extends React.Component {
  state = {
    data: [],
    columns: [],
  };

  delete = (id) => {
    axios.delete('/api/v2/pricingPlans', { data: { id } }).then((res) => {
      const {
        data: { message },
        statusText,
      } = res;
      if (res.status === 200) {
        NotificationManager.success(message, 'SUCCESS', 2000);
        setTimeout(() => {
          const { data } = this.state;
          const final = data.filter(element => element.id !== id);
          this.setState({ data: final });
        }, 500);
      } else {
        NotificationManager.error(message || statusText, 'ERROR', 2000);
      }
    });
  };

  componentWillMount = () => {
    axios.get('/api/v2/pricingPlans').then((result) => {
      const { data } = result;
      const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          sorter: (a, b) => a.title.props.children.length - b.title.props.children.length,
        },
        {
          title: 'Price',
          dataIndex: 'price',
          key: 'price',
        },
        {
          title: 'Interval',
          dataIndex: 'interval',
          key: 'interval',
        },
        {
          title: 'Primary',
          dataIndex: 'primary',
          key: 'primary',
        },
        {
          title: 'Action',
          key: 'action',
          dataIndex: 'action',
          width: 100,
        },
      ];
      this.setState({ columns });
      data.map((element) => {
        element.action = (
          <span>
            <Link
              to={`/admin/pricing/${element.id}`}
              className="icon icon-feedback"
            />
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this Plan ?"
              onConfirm={() => this.delete(element.id)}
              okText="Yes"
              cancelText="No"
            >
              <a className="gx-mb-3 icon icon-trash" href="/" />
            </Popconfirm>
          </span>
        );
        element.primary = element.primary ? (
          <i className="icon icon-check-circle-o primary-plan" />
        ) : (
          <i className="icon not-primary-plan icon-close-circle" />
        );
        element.title = (
          <Link to={`/admin/pricing/${element.id}`}>{element.title}</Link>
        );
        return element;
      });
      this.setState(() => ({ data }));
    });
  };

  render() {
    const { data, columns } = this.state;
    return (
      <Card title="Pricing Plans List">
        <Table
          className="gx-table-responsive"
          {...this.state}
          columns={columns}
          dataSource={data}
        />
        <NotificationContainer />
      </Card>
    );
  }
}

export default Dynamic;
