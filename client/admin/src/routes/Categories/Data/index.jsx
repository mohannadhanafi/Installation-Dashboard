import React from 'react';
import { Col, Row } from 'antd';
import Dynamic from './Dynamic';

const DataTable = () => (
  <Row>
    <Col span={24}>
      <Dynamic />
    </Col>
  </Row>
);

export default DataTable;
