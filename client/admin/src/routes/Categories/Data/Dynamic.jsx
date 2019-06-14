/* eslint-disable no-param-reassign */
/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
import React from 'react';
import axios from 'axios';
import {
  Card, Divider, Table, Popconfirm, Tag, Input, Button, Icon,
} from 'antd';
import { Link } from 'react-router-dom';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';

class Dynamic extends React.Component {
  state = {
    data: [],
    columns: [],
    searchText: '',
    items: [],
  };

  delete = (id) => {
    axios.delete('/api/v2/categories', { data: { id } }).then((res) => {
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

  componentDidMount = async () => {
    const result = await axios('/api/v2/categories');
    const { data } = result;
    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
        ...this.getColumnSearchProps('name'),
        sorter: (a, b) => a.name.props.children.length - b.name.props.children.length,
      },
      {
        title: 'seo Name',
        dataIndex: 'seo',
        key: 'seo_name',
        ...this.getColumnSearchProps('seo'),

        sorter: (a, b) => a.seo.length - b.seo.length,
      },
      {
        title: 'Parent Category',
        dataIndex: 'parent_name',
        key: 'Parent Category',
        sorter: (a, b) => a.parent - b.parent,
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
          <Link to={`/admin/Categories/${element.id}`} className="icon icon-feedback" />
          <Divider type="vertical" />
          <Popconfirm
            title="Are you sure delete this task?"
            onConfirm={() => this.delete(element.id)}
            okText="Yes"
            cancelText="No"
          >
            <a className="gx-mb-3 icon icon-trash" href="/" />
          </Popconfirm>
        </span>
      );
      element.name = (
        <Link to={`/admin/Categories/${element.id}`}>{element.name}</Link>
      );
      element.parent_name = element.parent_name ? (
        <Tag color="green">{element.parent_name}</Tag>
      ) : (
        <Tag color="blue">Main Category</Tag>
      );
      return element;
    });
    this.setState(() => ({ data, items: data }));
  };

  getColumnSearchProps = dataIndex => ({
    filterDropdown: ({
      setSelectedKeys, selectedKeys, confirm, clearFilters,
    }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={(node) => { this.searchInput = node; }}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => this.handleSearch(selectedKeys, confirm)}
          style={{ width: 188, marginBottom: 8, display: 'block' }}
        />
        <Button
          type="primary"
          onClick={() => this.handleSearch(selectedKeys, confirm)}
          icon="search"
          size="small"
          style={{ width: 90, marginRight: 8 }}
        >
          Search
        </Button>
        <Button
          onClick={() => this.handleReset(clearFilters)}
          size="small"
          style={{ width: 90 }}
        >
          Reset
        </Button>
      </div>
    ),
    filterIcon: filtered => <Icon type="search" style={{ backgroundColor: filtered ? '#cccccc' : undefined, color: filtered ? 'black' : undefined }} />,
    onFilter: (value, record) => {
      if (typeof record[dataIndex] === 'object') {
        return record[dataIndex].props.children
          .toString()
          .toLowerCase()
          .includes(value.toLowerCase());
      }

      return record[dataIndex]
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase());
    },
    onFilterDropdownVisibleChange: (visible) => {
      if (visible) {
        setTimeout(() => this.searchInput.select());
      }
    },
  })

  handleSearch = (selectedKeys, confirm) => {
    confirm();
    this.setState({ searchText: selectedKeys[0] });
  }

  handleReset = (clearFilters) => {
    clearFilters();
    this.setState({ searchText: '' });
  }

  onChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
    const { data } = this.state;
    let list = data;
    list = list.filter(
      item => item.name.props.children.toLowerCase().indexOf(value.toLowerCase()) !== -1,
    );

    if (list.length !== 0) {
      this.setState({ items: list });
    } else {
      this.setState({ items: null });
    }
  };

  render() {
    const { columns, data, items } = this.state;
    return (
      <Card title="Categories">
      <Input.Search style={{ width: '30%' }} onChange={this.onChange} placeholder="Search By Name" />
        <Table
          className="gx-table-responsive"
          {...this.state}
          columns={columns}
          dataSource={items}
        />
        <NotificationContainer />
      </Card>
    );
  }
}

export default Dynamic;
