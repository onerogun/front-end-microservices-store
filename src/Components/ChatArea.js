import React, { useState, useEffect, useContext, useRef } from "react";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import { ChatContext } from "../Contexts/ChatContext";

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

  if (!chat || chat.length < 1) {
    return null;
  }

  return (
    <div
      className="container-fluid bg-light mt-2 overflow-auto position-relative"
      style={{
        width: "30rem",
        "max-width": "30rem",
        height: "30rem",
        "max-height": "30rem",
      }}
    >
               
      <div className="row">
        <div className="col-12">
          <div className="row">
            <div className="col">
              {chat[chatIndex].message.length >= chat[chatIndex].youSent.length
                ? chat[chatIndex].message.map((msg, index) => {
                    return (
                      <div key={index}>
                        {msg && msg.length > 0 ? (
                          <p className="text-start">{msg}</p>
                        ) : null}
                        {chat[chatIndex].youSent[index] &&
                        chat[chatIndex].youSent[index].length > 0 ? (
                          <p className="text-end">
                            {chat[chatIndex].youSent[index]}
                          </p>
                        ) : null}
                      </div>
                    );
                  })
                : chat[chatIndex].youSent.map((yusent, index) => {
                    return (
                      <div key={index}>
                        {yusent && yusent.length > 0 ? (
                          <p className="text-end">{yusent}</p>
                        ) : null}
                        {chat[chatIndex].message[index] &&
                        chat[chatIndex].message[index].length > 0 ? (
                          <p className="text-start">
                            {chat[chatIndex].message[index]}
                          </p>
                        ) : null}
                      </div>
                    );
                  })}
            </div>
          </div>
          <div
            style={{ position: "absolute", bottom: 5, width: "95%" }}
            className="row"
          >
            <div className="col-9">
              <input
                className="form-control"
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
            </div>
            <div className="col-3">
              <button
                className="btn btn-primary"
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
