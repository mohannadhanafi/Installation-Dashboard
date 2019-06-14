/* eslint-disable react/jsx-one-expression-per-line */
/* eslint-disable camelcase */

import React, { Component } from 'react';
import {
  Col, Row, Card, Button,

} from 'antd';
import './style.css';
import axios from 'axios';
import {
  NotificationManager,
  NotificationContainer,
} from 'react-notifications';
import { arrayMove, SortableContainer } from 'react-sortable-hoc';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import Modal from './Modal';

import ContactCell from './ContactCell/index.jsx';

const Contacts = SortableContainer(
  ({
    contacts, changeState, openModal, handleSave, onDelete,
  }) => (
    <Col span={24}>
      <ReactCSSTransitionGroup
        transitionName="example"

      >
        {contacts.map((contact, index) => (

          <ContactCell
            disabled={contact.name && contact.name === 'trending'}
            key={index}
            index={index}
            contact={contact}
            changeState={changeState}
            onDelete={onDelete}
          />
        ))}
      </ReactCSSTransitionGroup>
    </Col>
  ),
);

class DragNDrop extends Component {
  constructor() {
    super();
    this.state = {
      visible: false,
      contacts: [],
      layout_number: '',
      category: '',
      catId: '',
      layout_number: '',
      type: '',
      loading: true,
      first: '',
      second: '',
      third: '',

    };
  }

  componentWillMount() {
    axios.get('/api/v2/home/layouts').then((result) => {
      const { data: contacts } = result;
      this.setState(() => ({ contacts, loading: false }));
    });
  }

  onDelete = (element) => {
    const { id } = element;
    const { contacts } = this.state;
    contacts.map((e, index) => {
      if (e.id === id) {
        return contacts.splice(index, 1);
      }
    });
    axios.delete('/api/v2/home/layouts', { data: { id } }).then(() => {
      this.setState(() => ({ contacts }), () => {
        NotificationManager.success(null, 'Deleted', 1500);
      });
    });
  };

  onSortEnd = ({ oldIndex, newIndex }) => {
    const { contacts } = this.state;
    const newContacts = arrayMove(contacts, oldIndex, newIndex);
    newContacts.map((contact, index) => (contact.position = index));
    this.setState({
      contacts: newContacts,
    });
  };

  handleSave = () => {
    const { contacts } = this.state;
    axios.post('/api/v2/home/layouts', contacts).then(() => {
      NotificationManager.success(null, 'Updated', 1500);
    });
  };

  handleCancel = () => {
    this.setState(() => ({ visible: false }));
  };

  handleOk = () => {
    const {
      catId, layout_number, type, first, second, third,
    } = this.state;
    const { contacts } = this.state;
    let obj;
    if (type === 'category') {
      obj = {
        catId,
        layout_number,
        type,
      };
      if (catId) {
        axios.post('/api/v2/home/layout/create', { obj }).then((result) => {
          const { data } = result;
          contacts.push(data);
          this.setState({ contacts, visible: false }, () => {
            NotificationManager.success('Saved', null, 1500);
          });
        });
      } else {
        NotificationManager.error('Please Choose Category', null, 1500);
      }
    } else {
      obj = {
        type,
        threecats: [first, second, third],
      };
      if (first && second && third) {
        axios.post('/api/v2/home/layout/create', { obj }).then((result) => {
          const { data } = result;
          contacts.push(data);
          this.setState({ contacts, visible: false }, () => {
            NotificationManager.success(null, 'Saved', 1500);
          });
        });
      } else {
        NotificationManager.error(null, 'Please Choose Three Categories', 1500);
      }
    }
  };

  handleChange = (value) => {
    this.setState(() => ({ type: value }));
  };

  openModal = () => {
    this.setState(() => ({
      visible: true,
    }));
  };

  changeState = (id) => {
    const { contacts } = this.state;
    contacts.map((element) => {
      if (element.id === id) {
        return (element.show = !element.show);
      }
    });
    this.setState(() => ({ contacts }));
  };

  setCatId = (value) => {
    this.setState(() => ({ catId: value }));
  };

  setThreeName = (name, value) => {
    this.setState(() => ({ [name]: value }));
  }

  radioChange = (e) => {
    this.setState({
      layout_number: e.target.value,
    });
  };

  render() {
    const {
      contacts, visible, category, type, loading,
    } = this.state;
    return (
      <>
        <Card loading={loading}>
          <div className="gx-main-content gx-mb-4">
            <Button
              type="primary"
              className="layout-button"
              onClick={this.openModal}
              style={{ width: '30%', height: 40, margin: '0 auto' }}
            >
              {' '}
Create New Section in Home Page

            </Button>

            <Row>
              {contacts.length ? (
                <Contacts
                  contacts={contacts}
                  onSortEnd={this.onSortEnd}
                  useDragHandle
                  changeState={this.changeState}
                  openModal={this.openModal}
                  handleSave={this.handleSave}
                  onDelete={this.onDelete}
                />
              ) : null}
            </Row>
          </div>
          <Button type="primary" className="layout-button" onClick={this.handleSave} style={{ float: 'right' }}>SAVE</Button>

        </Card>
        <Modal
          visible={visible}
          handleCancel={this.handleCancel}
          onSubmit={this.handleOk}
          category={category}
          setCatId={this.setCatId}
          radioChange={this.radioChange}
          handleChange={this.handleChange}
          type={type}
          setThreeName={this.setThreeName}
        />
        <NotificationContainer />

      </>
    );
  }
}

export default DragNDrop;
