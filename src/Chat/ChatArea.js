import React, { useState, useEffect, useContext, useRef } from "react";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import { ChatContext } from "../Contexts/ChatContext";
import "./chatarea.css";

export const ChatArea = () => {
  const [
    connected,
    subscribedTopics,
    chat,
    setChat,
    client,
    arr,
    setConnected,
    chatIndex,
    setChatIndex,
  ] = useContext(ChatContext);

  const [
    customerProfile,
    userProfile,
    setCustomerProfile,
    setUserProfile,
  ] = useContext(CustomerProfileContext);

  const clickHandler = (subscriber, message) => {
    client.current.publish({
      destination: "/app/chat",
      body: JSON.stringify({
        content: message,
        publisher: customerProfile.customerId,
        subscriber: subscriber,
      }),
    });
  };

  useEffect(() => {
    console.log("chat changedd");
    console.log(chat);
  }, [chat]);

  /**
   * Auto scroll to bottom when message content change
   */
  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chat[chatIndex].message, chat[chatIndex].youSent]);

  if (!chat || chat.length < 1) {
    return null;
  }

  return (
    <div class="container-fluid body_cnt">
      <div className="card card_msg">
        <div className="card-body msg_card_body">
          {chat[chatIndex].message.map((msg, index) => {
            return (
              <div key={index}>
                {msg && msg.length > 0 ? (
                  <div className="d-flex justify-content-start mb-2">
                    <div className="msg_container">{msg}</div>
                  </div>
                ) : null}
                {chat[chatIndex].youSent[index] &&
                chat[chatIndex].youSent[index].length > 0 ? (
                  <div className="d-flex justify-content-end mb-2">
                    <div className="msg_container_send">
                      {chat[chatIndex].youSent[index]}
                    </div>
                  </div>
                ) : null}
              </div>
            );
          })}
          <div ref={messagesEndRef} />
        </div>
        <div className="card-footer crd-footer">
          <div class="input-group">
            <input
              className="form-control type_msg"
              type="text"
              value={chat[chatIndex].sendMessage}
              onChange={(e) => {
                arr.current[chatIndex].sendMessage = e.target.value;
                setChat([...arr.current]);
              }}
              onKeyUp={(e) => {
                if (e.key == "Enter") {
                  clickHandler(
                    chat[chatIndex].publisher,
                    chat[chatIndex].sendMessage
                  );
                  arr.current[chatIndex].sendMessage = "";
                  setChat([...arr.current]);
                }
              }}
            ></input>

            <div className="input-group-append">
              <button
                className="btn btn-primary btn_height"
                onClick={(e) => {
                  clickHandler(
                    chat[chatIndex].publisher,
                    chat[chatIndex].sendMessage
                  );
                  arr.current[chatIndex].sendMessage = "";
                  setChat([...arr.current]);
                }}
              >
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
