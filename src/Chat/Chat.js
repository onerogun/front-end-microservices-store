import React, { useState, useEffect, useContext, useRef } from "react";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";
import { ChatArea } from "./ChatArea";
import { ChatContext } from "../Contexts/ChatContext";

export const Chat = (props) => {
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
  console.log("cusid: " + customerProfile.customerId);
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

  const handleDisconnect = () => {
    client.current.deactivate();
    arr.current = [];
    setChat([]);
    setChatIndex(-1);
    setConnected(false);
  };

  const clickJoin = () => {
    client.current.activate();
  };

  const [sendToUser, setSendToUser] = useState(0);

  useEffect(() => {
    if (props.match.params.sendTo) {
      setSendToUser(props.match.params.sendTo);
    }
  }, [props.match.params.sendTo]);

  console.log(chat);
  console.log(chatIndex);
  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-3 col-md-10">
          <div className="row">
            <div className="col-12">
              {chat.length > 0
                ? chat.map((eachChat, index) => {
                    return (
                      <div className="row" key={index}>
                        <div className="col-12">
                          <div className="list-group">
                            <button
                              type="button"
                              className={
                                chatIndex === index
                                  ? "list-group-item list-group-item-action active"
                                  : "list-group-item list-group-item-action"
                              }
                              aria-current="true"
                              onClick={(e) => setChatIndex(index)}
                            >
                              Message from: {eachChat.publisher}
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                : null}
            </div>
          </div>

          <div className="row">
            <div className="col-12">
              <hr />
              {connected ? (
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleDisconnect(e)}
                >
                  Disconnect Websocket
                </button>
              ) : (
                <button
                  className="btn btn-primary"
                  onClick={(e) => clickJoin(e)}
                >
                  Connect Websocket
                </button>
              )}

              <div className="row mt-2">
                <div className="col-12">
                  <div className="input-group mb-3">
                    <input
                      id="user"
                      className="form-control"
                      type="text"
                      placeholder="User"
                      value={sendToUser}
                      onChange={(e) => setSendToUser(e.target.value)}
                    />
                    <button
                      type="button"
                      className="btn btn-outline-primary"
                      aria-current="true"
                      disabled={connected ? false : true}
                      onClick={(e) => clickHandler(sendToUser, "")}
                    >
                      Start Chat
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="col-lg-6 col-md-10 my-auto mx-auto">
          {chatIndex > -1 ? <ChatArea /> : null}
        </div>
      </div>
    </div>
  );
};

/*
 return (
    <div>
      {chat.map((eachChat, index) => {
        return (
          <div key={index}>
            <p>{eachChat.message}</p>
            <input
              type="text"
              value={eachChat.sendMessage}
              onChange={(e) => {
                arr.current[index].sendMessage = e.target.value;
                setChat([...arr.current]);
              }}
            ></input>
            <button
              disabled={connnected ? false : true}
              onClick={(e) =>
                clickHandler(eachChat.publisher, eachChat.sendMessage)
              }
            >
              Send to {eachChat.publisher}
            </button>
          </div>
        );
      })}
      <header className="App-header">
        <p>{youSent}</p>
        <p>
          <button onClick={(e) => clickJoin(e)}>Join</button>
          <button
            disabled={connnected ? false : true}
            onClick={(e) => clickHandler(props.match.params.sendTo, "hi")}
          >
            Send to {props.match.params.sendTo}
          </button>

          <button onClick={(e) => handleDisconnect(e)}>Disconnect</button>
        </p>
      </header>
    </div>
  );
};

*/
