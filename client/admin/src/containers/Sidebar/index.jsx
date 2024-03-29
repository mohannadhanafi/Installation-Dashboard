import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Drawer, Layout } from 'antd';
import axios from 'axios';
import { toggleCollapsedSideNav, updateWindowWidth } from 'appRedux/actions/Setting';
import SidebarContent from './SidebarContent.jsx';
import { getNotifications } from '../../appRedux/actions/Notifications';
import {
  NAV_STYLE_DRAWER,
  NAV_STYLE_FIXED,
  NAV_STYLE_MINI_SIDEBAR,
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  TAB_SIZE,
  THEME_TYPE_LITE,
} from '../../constants/ThemeSetting';

const { Sider } = Layout;

export class Sidebar extends Component {
  state = { tables: [] }

  onToggleCollapsedNav = () => {
    this.props.toggleCollapsedSideNav(!this.props.navCollapsed);
  };

  componentWillMount() {
    window.addEventListener('resize', () => {
      this.props.updateWindowWidth(window.innerWidth);
    });
    axios.get('/api/v2/install/tables').then((result) => {
      const { data } = result;
      const tables = [];
      data.map(element => tables.push(element.tablename));
      this.setState(() => ({ tables }));
    });
  }

  render() {
    const {
      themeType, navCollapsed, width, navStyle, notificationsNumber,
    } = this.props;
    const { tables } = this.state;
    let drawerStyle = 'gx-collapsed-sidebar';

    if (navStyle === NAV_STYLE_FIXED) {
      drawerStyle = '';
    } else if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      drawerStyle = 'gx-mini-sidebar gx-mini-custom-sidebar';
    } else if (navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) {
      drawerStyle = 'gx-custom-sidebar';
    } else if (navStyle === NAV_STYLE_MINI_SIDEBAR) {
      drawerStyle = 'gx-mini-sidebar';
    } else if (navStyle === NAV_STYLE_DRAWER) {
      drawerStyle = 'gx-collapsed-sidebar';
    }
    if ((navStyle === NAV_STYLE_FIXED || navStyle === NAV_STYLE_MINI_SIDEBAR
        || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR) && width < TAB_SIZE) {
      drawerStyle = 'gx-collapsed-sidebar';
    }
    return (
      <Sider
        className={`gx-app-sidebar ${drawerStyle} ${themeType !== THEME_TYPE_LITE ? 'gx-layout-sider-dark' : null}`}
        trigger={null}
        collapsed={(width < TAB_SIZE ? false : navStyle === NAV_STYLE_MINI_SIDEBAR || navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR)}
        theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
        collapsible
      >
        {
          navStyle === NAV_STYLE_DRAWER || width < TAB_SIZE
            ? (
              <Drawer
                className={`gx-drawer-sidebar ${themeType !== THEME_TYPE_LITE ? 'gx-drawer-sidebar-dark' : null}`}
                placement="left"
                closable={false}
                onClose={this.onToggleCollapsedNav.bind(this)}
                visible={navCollapsed}
              >
                {tables.length ? <SidebarContent tables={tables} notificationsNumber={notificationsNumber} /> : null}
              </Drawer>
            )
            : tables.length ? <SidebarContent tables={tables} notificationsNumber={notificationsNumber} /> : null
        }
      </Sider>
    );
  }
}

const mapStateToProps = ({ settings, notifications }) => {
  const {
    themeType, navStyle, navCollapsed, width, locale,
  } = settings;
  const { notificationsNumber } = notifications;
  return {
    themeType, navStyle, navCollapsed, width, locale, notificationsNumber,
  };
};
export default connect(mapStateToProps, { toggleCollapsedSideNav, updateWindowWidth, getNotifications })(Sidebar);
