import React from "react";

import "../css/Message.css";

import ReactEmoji from "react-emoji";

const Message = ({ message: { text, user }, name}) => {
  let isSentByCurrentUser = false;
  let previousMessage = false;
  console.log("S", user, "S", name);
  const trimmedName = name.trim().toLowerCase();

  if (user === trimmedName) {
    isSentByCurrentUser = true;
  }
  console.log("text ", text);
  // console.log("enna",oldMessages[0].sender,"s",name)
  // if(user!=trimmedName){
  //   previousMessage=true;
  // }

  return (
    <>
      <>
        {user === trimmedName ? (
          <div className="messageContainer justifyEnd">
            <p className="sentText pr-10">{trimmedName}</p>
            <div className="messageBox backgroundBlue">
              <p className="messageText colorWhite">
                {ReactEmoji.emojify(text)}
              </p>
            </div>
          </div>
        ) : (
          <div className="messageContainer justifyStart">
            <div className="messageBox backgroundLight">
              <p className="messageText colorDark">
                {ReactEmoji.emojify(text)}
              </p>
            </div>
            <p className="sentText pl-10 ">{user}</p>
          </div>
        )}
      </>
    </>
  );
};

export default Message;
