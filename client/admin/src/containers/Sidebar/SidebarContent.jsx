import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, notification, Icon } from 'antd';
import { Link } from 'react-router-dom';

import CustomScrollbars from 'util/CustomScrollbars';
import Auxiliary from 'util/Auxiliary';

import SidebarLogo from './SidebarLogo.jsx';

import AppsNavigation from './AppsNavigation.jsx';
import {
  NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR,
  NAV_STYLE_NO_HEADER_MINI_SIDEBAR,
  THEME_TYPE_LITE,
} from '../../constants/ThemeSetting';
import IntlMessages from '../../util/IntlMessages';

const { SubMenu } = Menu;

class SidebarContent extends Component {
  getNoHeaderClass = (navStyle) => {
    if (
      navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR
      || navStyle === NAV_STYLE_NO_HEADER_EXPANDED_SIDEBAR
    ) {
      return 'gx-no-header-notifications';
    }
    return '';
  };

  getNavStyleSubMenuClass = (navStyle) => {
    if (navStyle === NAV_STYLE_NO_HEADER_MINI_SIDEBAR) {
      return 'gx-no-header-submenu-popup';
    }
    return '';
  };


  render() {
    const {
      themeType, navStyle, pathname, role, authUser, type, tables,
    } = this.props;
    console.log(tables);
    const selectedKeys = pathname.substr(1);
    const defaultOpenKeys = selectedKeys.split('/')[1];
    return (
      <Auxiliary>
        <SidebarLogo />
        <div className="gx-sidebar-content">
          <CustomScrollbars className="gx-layout-sider-scrollbar">
            <Menu
              defaultOpenKeys={[defaultOpenKeys]}
              selectedKeys={[selectedKeys]}
              theme={themeType === THEME_TYPE_LITE ? 'lite' : 'dark'}
              mode="inline"
            >
              <Menu.Item key="main">
                <Link to="/admin/main">
                  <i className="icon icon-home" />
                  <IntlMessages id="sidebar.main" />
                </Link>
              </Menu.Item>
              {role === 'admin' ? (
                <SubMenu
                  key="users"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-user" />
                      <IntlMessages id="sidebar.users" />
                    </span>
)}
                >
                  <Menu.Item key="users/view">
                    <Link to="/admin/users/view">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.viewusers" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="users/adduser">
                    <Link to="/admin/users/adduser">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.adduser" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}

              {/* Informative SideBar */}

              {tables.includes('blogs') && tables.includes('informative') ? (
                <SubMenu
                  key="blogs"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-widgets" />
                      <IntlMessages id="sidebar.blogs" />
                    </span>
)}
                >
                  <Menu.Item key="blogs/viewblogs">
                    <Link to="/admin/blogs/viewblogs/all">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.blogs.view" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="blogs/pending">
                    <Link to="/admin/blogs/add">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.blogs.add" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="comments">
                    <Link to="/admin/comments/all">
                      <i className="icon icon-chat" />
                      <IntlMessages id="sidebar.comments" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
              {tables.includes('services') && tables.includes('informative') ? (
                <SubMenu
                  key="services"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-extensions" />
                      <IntlMessages id="sidebar.services" />
                    </span>
)}
                >
                  <Menu.Item key="services/viewServices">
                    <Link to="/admin/services/viewServices">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.viewServices" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="services/addService">
                    <Link to="/admin/services/addService">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.addService" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="services/settings">
                    <Link to="/admin/services/settings">
                      <i className="icon icon-setting" />
                      <IntlMessages id="sidebar.settings" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
              {tables.includes('hero') && tables.includes('informative') ? (
                <SubMenu
                  key="hero"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-slider" />
                      <IntlMessages id="sidebar.hero" />
                    </span>
)}
                >
                  <Menu.Item key="hero/view">
                    <Link to="/admin/hero/view">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.view" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="hero/add">
                    <Link to="/admin/hero/add">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.add" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
              {tables.includes('core') && tables.includes('informative') ? (
                <SubMenu
                  key="core"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>

                      <i className="icon icon-widgets" />
                      <IntlMessages id="sidebar.core" />
                    </span>
)}
                >
                  <Menu.Item key="core/viewcore">
                    <Link to="/admin/core/viewcore">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.viewcore" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="core/addcore">
                    <Link to="/admin/core/addcore">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.addcore" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
              {tables.includes('features') && tables.includes('informative') ? (
                <SubMenu
                  key="features"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.features" />
                    </span>
)}
                >
                  <Menu.Item key="features/view">
                    <Link to="/admin/features/view">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.features.view" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="features/add">
                    <Link to="/admin/features/add">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.features.add" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="features/settings">
                    <Link to="/admin/features/settings">
                      <i className="icon icon-setting" />
                      <IntlMessages id="sidebar.settings" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              )
                : null}
              {tables.includes('partners') && tables.includes('informative') ? (
                <SubMenu
                  key="patners"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      <i className="icon icon-wall" />
                      <IntlMessages id="sidebar.partners" />
                    </span>
)}
                >
                  <Menu.Item key="partners/view">
                    <Link to="/admin/partners/view">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.partners.view" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="partners/add">
                    <Link to="/admin/partners/add">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.partners.add" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="partners/settings">
                    <Link to="/admin/partners/settings">
                      <i className="icon icon-setting" />
                      <IntlMessages id="sidebar.settings" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}


              {tables.includes('pricingPlans') && tables.includes('informative') ? (
                <SubMenu
                  key="pricing"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      <i className="fas fa-dollar-sign" />
                      <IntlMessages id="sidebar.pricing" />
                    </span>
)}
                >
                  <SubMenu
                    key="categories"
                    className={this.getNavStyleSubMenuClass(navStyle)}
                    title={(
                      <span>
                        <i className="icon icon-widgets" />
                        <IntlMessages id="sidebar.pricing.categories" />
                      </span>
)}
                  >
                    <Menu.Item key="pricing/categories">
                      <Link to="/admin/pricing/categories">
                        <i className="icon icon-widgets" />
                        {' '}
                        <IntlMessages id="sidebar.pricing.categoriesView" />
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="pricing/categories/add">
                      <Link to="/admin/pricing/categories/add">
                        <i className="icon icon-add" />
                        {' '}
                        <IntlMessages id="sidebar.pricing.categoriesAdd" />
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                  <Menu.Item key="pricing/view">
                    <Link to="/admin/pricing/view">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.pricing.view" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="pricing/add">
                    <Link to="/admin/pricing/add">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.pricing.add" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="pricing/settings">
                    <Link to="/admin/pricing/settings">
                      <i className="icon icon-setting" />
                      <IntlMessages id="sidebar.settings" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
              {tables.includes('whyUs') && tables.includes('informative') ? (
                <Menu.Item key="whyUs">
                  <Link to="/admin/whyUs">
                    <i className="icon icon-widgets" />
                    <IntlMessages id="sidebar.whyUs" />
                  </Link>
                </Menu.Item>
              ) : null}
              {tables.includes('about') && tables.includes('informative') ? (
                <Menu.Item key="About">
                  <Link to="/admin/about">
                    <i className="icon icon-widgets" />
                    <IntlMessages id="sidebar.about" />
                  </Link>
                </Menu.Item>
              ) : null}
              {tables.includes('portfolio') && tables.includes('informative') ? (
                <SubMenu
                  key="portfolio"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-image" />
                      <IntlMessages id="sidebar.portfolio" />
                    </span>
)}
                >
                  <Menu.Item key="/portfolio">
                    <Link to="/admin/portfolio/view">
                      <i className="icon icon-chat" />
                      <IntlMessages id="sidebar.viewportfolio" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="/portfolio/add">
                    <Link to="/admin/portfolio/add">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.addportfolio" />
                    </Link>
                  </Menu.Item>
                  <SubMenu
                    key="portfolioCategory"
                    className={this.getNavStyleSubMenuClass(navStyle)}
                    title={(
                      <span>
                        {' '}
                        <i className="icon icon-image" />
                        <IntlMessages id="sidebar.portfolioCategory" />
                      </span>
)}
                  >
                    <Menu.Item key="/portfolioCategory">
                      <Link to="/admin/portfolioCategory/view">
                        <i className="icon icon-chat" />
                        <IntlMessages id="sidebar.viewportfolioCategory" />
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="/portfolioCategory/add">
                      <Link to="/admin/portfolioCategory/add">
                        <i className="icon icon-add" />
                        <IntlMessages id="sidebar.addportfolioCategory" />
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                </SubMenu>
              ) : null}
              {tables.includes('teams') && tables.includes('informative') ? (
                <SubMenu
                  key="teams"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-team" />
                      <IntlMessages id="sidebar.teams" />
                    </span>
)}
                >
                  <Menu.Item key="teams/view">
                    <Link to="/admin/teams/view">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.teams.view" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="teams/add">
                    <Link to="/admin/teams/add">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.teams.add" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="teams/settings">
                    <Link to="/admin/teams/settings">
                      <i className="icon icon-setting" />
                      <IntlMessages id="sidebar.settings" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
              <SubMenu
                key="statistics"
                className={this.getNavStyleSubMenuClass(navStyle)}
                title={(
                  <span>
                    {' '}
                    <i className="icon icon-chart-line" />
                    <IntlMessages id="sidebar.statistics" />
                  </span>
)}
              >
                <Menu.Item key="statistics/view">
                  <Link to="/admin/statistics/view">
                    <i className="icon icon-plain-list-divider" />
                    <IntlMessages id="sidebar.statistics.view" />
                  </Link>
                </Menu.Item>
                <Menu.Item key="statistics/add">
                  <Link to="/admin/statistics/add">
                    <i className="icon icon-add" />
                    <IntlMessages id="sidebar.statistics.add" />
                  </Link>
                </Menu.Item>
              </SubMenu>
              {tables.includes('testimonials') && tables.includes('informative') ? (
                <SubMenu
                  key="testimonials"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.testimonials" />
                    </span>
)}
                >
                  <Menu.Item key="testimonials/view">
                    <Link to="/admin/testimonials/view">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.testimonials.view" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="testimonials/add">
                    <Link to="/admin/testimonials/add">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.testimonials.add" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="testimonials/settings">
                    <Link to="/admin/testimonials/settings">
                      <i className="icon icon-setting" />
                      <IntlMessages id="sidebar.settings" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}


              {/* News SideBar */}

              {tables.includes('services') && tables.includes('news') ? (
                <SubMenu
                  key="services"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-widgets" />
                      <IntlMessages id="sidebar.services" />
                    </span>
)}
                >
                  <Menu.Item key="services/addService">
                    <Link to="/admin/services/addService">
                      <i className="icon icon-chat" />
                      <IntlMessages id="sidebar.addService" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="services/viewServices">
                    <Link to="/admin/services/viewServices">
                      <i className="icon icon-chat" />
                      <IntlMessages id="sidebar.viewServices" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
              {tables.includes('news') ? (
                <SubMenu
                  key="categories"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-apps" />
                      <IntlMessages id="sidebar.categories" />
                    </span>
    )}
                >
                  <Menu.Item key="Categories/Main">
                    <Link to="/admin/Categories/Main">
                      <i className="icon icon-product-list" />
                      <IntlMessages id="sidebar.mainCategories" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Categories/Add">
                    <Link to="/admin/Categories/Add">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.addCategory" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
              {tables.includes('news') ? (
                <Menu.Item key="comments">
                  <Link to="/admin/news/comments/all">
                    <i className="icon icon-chat" />
                    <IntlMessages id="sidebar.comments" />
                  </Link>
                </Menu.Item>
              ) : null}
              {tables.includes('news') ? (
                <SubMenu
                  key="posts"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      <i className="icon icon-product-list" />
                      <IntlMessages id="sidebar.posts" />
                    </span>
)}
                >

                  <Menu.Item key="Posts/viewPosts">
                    <Link to="/admin/Posts/viewPosts/all">
                      <i className="icon icon-table" />
                      <IntlMessages id="sidebar.posts.view" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Posts/pending">
                    <Link to="/admin/Posts/addPost">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.posts.add" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="Posts/addPost">
                    <Link to="/admin/Posts/viewPosts/notApproved">
                      <i className="icon icon-close-circle" />
                      <IntlMessages id="sidebar.posts.Pending" />
                    </Link>
                  </Menu.Item>
                  <SubMenu
                    key="hero"
                    className={this.getNavStyleSubMenuClass(navStyle)}
                    title={(
                      <span>
                        <i className="icon icon-product-list" />
                        <IntlMessages id="sidebar.hero" />
                      </span>
)}
                  >
                    <Menu.Item key="posts/hero/view">
                      <Link to="/admin/posts/hero/view">
                        <i className="icon icon-table" />
                        <IntlMessages id="sidebar.viewhero" />
                      </Link>
                    </Menu.Item>
                    <Menu.Item key="posts/hero/add">
                      <Link to="/admin/posts/hero/add">
                        <i className="icon icon-add" />
                        <IntlMessages id="sidebar.addhero" />
                      </Link>
                    </Menu.Item>
                  </SubMenu>
                </SubMenu>
              ) : null}
              {tables.includes('galleries') && tables.includes('news') ? (
                <Menu.Item key="Gallery">
                  <Link to="/admin/gallery">
                    <i className="icon icon-chat" />
                    <IntlMessages id="sidebar.gallery" />
                  </Link>
                </Menu.Item>
              ) : null}
              {tables.includes('news') ? (
                <Menu.Item key="layout">
                  <Link to="/admin/layout">
                    <i className="icon icon-product-list" />
                    <IntlMessages id="sidebar.layout" />
                  </Link>
                </Menu.Item>
              ) : null}
              {tables.includes('news') ? (
                <SubMenu
                  key="ads"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-apps" />
                      <IntlMessages id="sidebar.ads" />
                    </span>
)}
                >
                  <Menu.Item key="ads/add">
                    <Link to="/admin/ads/add">
                      <i className="icon icon-chat" />
                      <IntlMessages id="sidebar.addads" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="ads/view">
                    <Link to="/admin/ads/view">
                      <i className="icon icon-chat" />
                      <IntlMessages id="sidebar.viewads" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
              {tables.includes('testimonials') && tables.includes('news') ? (
                <SubMenu
                  key="testimonials"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.testimonials" />
                    </span>
)}
                >
                  <Menu.Item key="testimonials/view">
                    <Link to="/admin/testimonials/view">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.testimonials.view" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="testimonials/add">
                    <Link to="/admin/testimonials/add">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.testimonials.add" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="testimonials/settings">
                    <Link to="/admin/testimonials/settings">
                      <i className="icon icon-setting" />
                      <IntlMessages id="sidebar.settings" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
              {tables.includes('teams') && tables.includes('news') ? (
                <SubMenu
                  key="teams"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-team" />
                      <IntlMessages id="sidebar.teams" />
                    </span>
)}
                >
                  <Menu.Item key="teams/view">
                    <Link to="/admin/teams/view">
                      <i className="icon icon-plain-list-divider" />
                      <IntlMessages id="sidebar.teams.view" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="teams/add">
                    <Link to="/admin/teams/add">
                      <i className="icon icon-add" />
                      <IntlMessages id="sidebar.teams.add" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="teams/settings">
                    <Link to="/admin/teams/settings">
                      <i className="icon icon-setting" />
                      <IntlMessages id="sidebar.settings" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}

              {role === 'admin' ? (
                <SubMenu
                  key="settings"
                  className={this.getNavStyleSubMenuClass(navStyle)}
                  title={(
                    <span>
                      {' '}
                      <i className="icon icon-extra-components" />
                      <IntlMessages id="sidebar.options" />
                    </span>
)}
                >
                  <Menu.Item key="settings/contact">
                    <Link to="/admin/settings/contact">
                      <i className="icon icon-button" />
                      <IntlMessages id="sidebar.Contact" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="settings/newsletter">
                    <Link to="/admin/settings/newsletter">
                      <i className="icon icon-button" />
                      <IntlMessages id="sidebar.newsletter" />
                    </Link>
                  </Menu.Item>
                  <Menu.Item key="settings/settings">
                    <Link to="/admin/settings/settings">
                      <i className="icon icon-setting" />
                      <IntlMessages id="sidebar.settings" />
                    </Link>
                  </Menu.Item>
                </SubMenu>
              ) : null}
            </Menu>
          </CustomScrollbars>
        </div>
      </Auxiliary>
    );
  }
}

SidebarContent.propTypes = {};
const mapStateToProps = ({ settings, auth }) => {
  const {
    navStyle, themeType, locale, pathname, type,
  } = settings;
  const { role, authUser } = auth;
  return {
    navStyle,
    themeType,
    locale,
    pathname,
    role,
    authUser,
    type,
  };
};
export default connect(mapStateToProps)(SidebarContent);
