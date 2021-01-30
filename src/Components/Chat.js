import React, { useState, useEffect, useContext, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { CustomerProfileContext } from "../Contexts/CustomerProfileContext";

export const Chat = (props) => {
  var client = useRef(new Client());
  const [conv, setConv] = useState("");
  const [connnected, setConnected] = useState(false);
  const [subscribedTopics, setSubscribedTopics] = useState([]);
  const [
    customerProfile,
    userProfile,
    setCustomerProfile,
    setUserProfile,
  ] = useContext(CustomerProfileContext);

  const [chat, setChat] = useState([]);
  const [sendMessage, setSendMessage] = useState([]);

  /**
   * first open websocket and subscribe to certain endpoints
   */
  useEffect(() => {
    client.current.configure({
      brokerURL: "ws://localhost:7979//mywebsockets",
      onConnect: () => {
        /**
         * After connection accomplished,
         * this first subscribe is to get back each sent message
         */
        client.current.subscribe(`/user/queue/chat`, (message) => {
          console.log("sent msg: " + message.body);
          setConv((prev) => prev + "\n" + message.body);
        });

        /**
         * get list of previously subscribed topics
         * and set in state
         */
        client.current.subscribe(
          `/app/getTopics/${customerProfile.customerId}`,
          (message) => {
            console.log("subd topics: " + message.body);
            setSubscribedTopics(JSON.parse(message.body));
          }
        );

        /**
         * when a new topic opened, it is sent here and state updated
         * then view is updated
         */
        client.current.subscribe(
          `/queue/${customerProfile.customerId}`,
          (message) => {
            console.log("new topic added: " + JSON.stringify(message.body));
            setSubscribedTopics(JSON.parse(message.body));
          }
        );
        setConnected(true);
      },
    });
  }, [customerProfile]);

  const arr = useRef([]);

  /**
   * When list of subscribed topics change, create new array for topics
   * and details
   */
  useEffect(() => {
    /**
     * extract publisher and use it to open a new topic when replying
     */
    subscribedTopics.forEach((topicName, index) => {
      var publisherIdDash = topicName.replace("Publisher:", "");
      var publisher = publisherIdDash.substring(
        0,
        publisherIdDash.indexOf("-")
      );
      /**
       * message is for incoming messages, sendMessage is for messages that will
       * be sent by subscriber
       */
      arr.current.push({
        topic: topicName,
        publisher: publisher,
        message: "",
        sendMessage: "",
      });

      client.current.subscribe(`/queue/${topicName}`, (message) => {
        arr.current[index].message =
          arr.current[index].message + "\n" + message.body;

        console.log(arr.current);
        setChat([...arr.current]);
      });
    });
  }, [subscribedTopics]);

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
    setConnected(false);
  };

  const clickJoin = () => {
    client.current.activate();
  };

  return (
    <div>
      {chat.map((eachChat, index) => {
        return (
          <div className="row" key={index}>
            <div className="col-5">
              <div className="list-group">
                <button
                  type="button"
                  className="list-group-item list-group-item-action"
                  aria-current="true"
                >
                  {eachChat.publisher}
                </button>
              </div>
            </div>
            <div className="col-5">
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
          </div>
        );
      })}
      <header className="App-header">
        <p>{conv}</p>
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
        <p>{conv}</p>
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
