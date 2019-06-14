/* eslint-disable react/prop-types */
/* eslint-disable no-return-assign */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-one-expression-per-line */
import React from 'react';
import axios from 'axios';
import {
  Card, Table,
} from 'antd';
import {
  NotificationContainer,
} from 'react-notifications';
import { Link } from 'react-router-dom';

class Dynamic extends React.Component {
  state = {
    data: [],
    columns: [],
    loading: false,
  };

  toggleLoading = () => {
    this.setState({ loading: !this.state.loading });
  };

  getData = () => {
    this.setState({ loading: true }, async () => {
      axios.get('/api/v2/categories/getAll').then((result) => {
        const { data } = result;
        const columns = [
          {
            title: 'categories',
            dataIndex: 'name',
            key: 'name',
            sorter: (a, b) => a.name.length - b.name.length,
          },
          {
            title: 'Action',
            key: 'action',
            dataIndex: 'action',
          },
        ];
        data.map((element) => {
          element.action = (
            <span>
              <Link to={`/admin/layouts/Home/${element.id}`} className="icon icon-feedback" />
            </span>
          );
          return element;
        });
        this.setState(() => ({ columns, data, loading: false }));
      });
    });
  }

  componentWillMount = () => {
    this.getData();
  };


  render() {
    const { data, columns } = this.state;
    return (
      <Card title="Layout Setting">
        <Table className="gx-table-responsive" {...this.state} columns={columns} dataSource={data} />
        <NotificationContainer />
      </Card>
    );
  }
}

export default Dynamic;
