import React, { Component } from 'react';
import { Tabs } from 'antd';
import HomePage from './HomePage';
import CategoryPage from './CategoryPage';

const { TabPane } = Tabs;

export default class index extends Component {
    state = {}

    render() {
      return (
        <Tabs defaultActiveKey="1">
          <TabPane tab="Home Page" key="1" style={{ color: 'red' }}>
            <HomePage />
          </TabPane>
          <TabPane tab="Category Page" key="2">
            <CategoryPage />
          </TabPane>
        </Tabs>
      );
    }
}
