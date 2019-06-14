import React from 'react';
import { Avatar, Checkbox } from 'antd';

import moment from 'moment';
import labels from '../../../data/labels';

const MailListItem = ({
  mail, onMailSelect, onMailChecked, onStartSelect, onImportantSelect,
}) => (
  <div style={{ background: mail.read ? '' : '#e0dddd' }} className="gx-module-list-item gx-mail-cell">
    <div className="gx-module-list-icon">
      <Checkbox
        color="primary"
        className="gx-icon-btn"
        checked={mail.selected}
        onClick={(event) => {
          event.stopPropagation();
          onMailChecked(mail);
        }}
        value="SelectMail"
      />
      <div onClick={() => {
        onStartSelect(mail);
      }}
      >
        {mail && mail.starred
          ? <i className="gx-icon-btn icon icon-star" />
          : <i className="gx-icon-btn icon icon-star-o" />
          }

      </div>
      <div onClick={() => {
        onImportantSelect(mail);
      }}
      >
        {mail && mail.important
          ? <i className="icon icon-important gx-icon-btn" />
          : <i className="icon icon-important-o gx-icon-btn" />
                  }

      </div>
      <div className="gx-ml-2">
        <Avatar className="gx-avatar gx-bg-blue gx-size-40">
          {' '}
          {mail && mail.name && mail.name.charAt(0).toUpperCase()}
        </Avatar>

      </div>
    </div>

    <div
      className="gx-mail-list-info"
      onClick={() => {
        onMailSelect(mail);
      }}
    >

      <div className="gx-module-list-content">
        <div className="gx-mail-user-des">

          <span className="gx-sender-name">{mail.name}</span>

          <span className="gx-toolbar-separator">&nbsp;</span>

          <span className="gx-d-inline-block gx-text-truncate gx-send-subject">{mail.subject}</span>

          {mail.hasAttachments

            && <i className="icon icon-attachment" />}

          <div className="gx-time">{moment(mail.createdAt).calendar()}</div>

        </div>


        <div className="gx-message">
          <p className="gx-text-truncate">
            {' '}
            {mail.message}
          </p>

        </div>

      </div>

    </div>

  </div>
);

export default MailListItem;
