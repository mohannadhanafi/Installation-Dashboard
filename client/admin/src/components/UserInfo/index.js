/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable react/jsx-indent */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable react/destructuring-assignment */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-filename-extension */
import React, { Component } from 'react';
import axios from 'axios';
import {
  Avatar, Popover, Menu, Popconfirm,
} from 'antd';
import { withRouter } from 'react-router-dom';
import { NotificationContainer, NotificationManager } from 'react-notifications';
import { connect } from 'react-redux';
import { userSignOut } from '../../appRedux/actions/Auth';

class UserInfo extends Component {
  state = {
    name: '',
  };

  componentDidMount =async () => {
    const result = await axios('/api/v2/users/detailsUser');
    const { data } = result;
    const { first, pic } = data[0];
    this.setState({ first, pic });
  }

  logout = () => {
    this.props.userSignOut();
  }

  rebuild = () => {
    axios.get('/api/v2/rebuild').then(() => {
      NotificationManager.success('Done', 'SUCCESS', 2000);
      setTimeout(() => {
        window.location = '/admin/install';
      }, 1000);
    });
  }

  goPropfile = () => {
    const { id } = this.state;
    this.props.history.push('/admin/profile');
  }

  render() {
    const { first, pic } = this.state;
    const userMenuOptions = (
      <ul className="gx-user-popover">
        <li onClick={this.goPropfile}>Profile</li>
        <Menu.Divider />
        <Popconfirm
          title="This will remove everything, Are you sure ???"
          onConfirm={this.rebuild}
          okText="Yes"
          cancelText="No"
        >
        <li>rebuild</li>
        </Popconfirm>
        <li onClick={this.logout}>Log out</li>
      </ul>
    );


    return (
      <Popover
        overlayClassName="gx-popover-horizantal"
        placement="bottomRight"
        content={userMenuOptions}
        trigger="click"
      >
        <Avatar
          src={`/api/v2/files/getFile/${pic}`}
          className="gx-avatar gx-pointer"
          alt=""
        />
        <NotificationContainer />
      </Popover>
    );
  }
}

export default connect(null, { userSignOut })(withRouter(UserInfo));
