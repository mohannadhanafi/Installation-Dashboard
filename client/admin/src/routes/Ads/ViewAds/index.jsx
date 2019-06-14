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
  Divider,
  Table,
  Popconfirm, Tag,
} from 'antd';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';


class Dynamic extends React.Component {
  state = {
    data: [],
    columns: [],
  };

  delete = (id) => {
    axios.delete('/api/v2/ads', { data: { id } }).then((res) => {
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
        }, 1000);
      } else {
        NotificationManager.error(message || statusText);
      }
    });
  };

  componentWillMount = () => {
    axios.get('/api/v2/ads').then((result) => {
      const { data } = result;
      const columns = [
        {
          title: 'Title',
          dataIndex: 'title',
          key: 'title',
          width: 300,
          sorter: (a, b) => a.title.props.children[0].length - b.title.props.children[0].length,
        },
        {
          title: 'language',
          dataIndex: 'language',
          key: 'language',
          sorter: (a, b) => a.language - b.language,
        },
        {
          title: 'country',
          dataIndex: 'country',
          key: 'country',
          sorter: (a, b) => a.country - b.country,
        },

        {
          title: 'pages',
          dataIndex: 'pages',
          key: 'pages',
        },
        {
          title: 'Action',
          key: 'action',
          dataIndex: 'action',
          width: 150,
        },
      ];
      this.setState({ columns });
      data.map((element) => {
        element.action = (
          <span>
            <Link to={`/admin/ads/${element.id}`} className="icon icon-feedback" />
            <Divider type="vertical" />
            <Popconfirm
              title="Are you sure delete this task?"
              onConfirm={() => this.delete(element.id)}
              okText="Yes"
              cancelText="No"
            >
              <a className="icon icon-trash" href="/" />

            </Popconfirm>
          </span>
        );
        element.title = (
          <Link to={`/ads/${element.id}`}>{element.title.substring(0, 50)} ... </Link>
        );
        element.pages = (
          element.page.map(page => <Tag color="blue">{page}</Tag>)
        );
        return element;
      });
      this.setState(() => ({ data }));
    });
  };

  render() {
    const { data, columns } = this.state;
    return (
      <Card title="Ads. List">
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
