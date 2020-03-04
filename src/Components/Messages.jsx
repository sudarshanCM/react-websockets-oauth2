import React from "react";

import ScrollToBottom from "react-scroll-to-bottom";

import Message from "./Message";

import "../css/Messages.css";

const Messages = ({ messages, name, oldMessages }) => (
  <ScrollToBottom className="messages">
    <>
      {oldMessages.map(message => (
        <Message message={message} name={name}/>
      ))}
    </>
    {messages.map((message, i) => (
      <div key={i}>
        <Message message={message} name={name} />
      </div>
    ))}
  </ScrollToBottom>
);

export default Messages;
