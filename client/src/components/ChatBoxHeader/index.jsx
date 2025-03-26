import { useEffect, useState } from 'react';

import './style.scss';

const ChatBoxHeader = ({ contactInfo }) => {
  return (
    <div className="box-chat-header">
      <div className="avatar">
        <img src={contactInfo?.avatar} />
      </div>
      <div className="contact-name">{contactInfo?.name}</div>
    </div>
  );
};

export default ChatBoxHeader;
