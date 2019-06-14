/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import axios from 'axios';
import ReactHtmlParser from 'react-html-parser';
import { Link } from 'react-router-dom';
import {
  Card,
  Table,
  Popconfirm,
} from 'antd';
import { NotificationContainer, NotificationManager } from 'react-notifications';

const expandedRowRender = record => ReactHtmlParser(record.description);

class Dynamic extends React.Component {
  state = {
    expandedRowRender,
    data: [],
    columns: [],
  };

  delete = (id) => {
    axios.post('/api/v2/removeheading', { data: { id } }).then((res) => {
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
        }, 3000);
      } else {
        NotificationManager.error(message || statusText, 'ERROR', 2000);
      }
    });
  };

  componentWillMount = () => {
    axios.get('/api/v2/heading').then((result) => {
      const { data } = result;
      const columns = [
        {
          title: 'Name',
          dataIndex: 'title',
          key: 'name',
          sorter: (a, b) => a.title.props.children.length - b.title.props.children.length,
        },
        {
          title: 'Action',
          key: 'action',
          dataIndex: 'action',
          width: 360,
        },
      ];
      this.setState({ columns });
      data.map((element) => {
        element.action = (
          <span>
            <Popconfirm
              title="Are you sure remove this post from hero section?"
              onConfirm={() => this.delete(element.id)}
              okText="Yes"
              cancelText="No"
            >
              <a className="gx-mb-3 icon icon-trash" href="/" />
            </Popconfirm>
          </span>
        );
        element.title = (
          <Link to={`/admin/posts/${element.id}`}>{element.title}</Link>
        );
        return element;
      });
      this.setState(() => ({ data }));
    });
  };

  render() {
    const { data, columns } = this.state;
    return (
      <Card title="Hero Section Posts">
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
