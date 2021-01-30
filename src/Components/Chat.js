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
  /*
  useEffect(() => {
    var messageArr = [];
    chat.forEach((each) => messageArr.push(""));
    setSendMessage(messageArr);
  }, [chat]);
*/
  useEffect(() => {
    client.current.configure({
      brokerURL: "ws://localhost:7979//mywebsockets",
      onConnect: () => {
        console.log("onConnect");
        //   var url = client.ws._transport.url;
        //   console.log("urll: " + url);

        client.current.subscribe(`/user/queue/chat`, (message) => {
          console.log("sent msg: " + message.body);
          setConv((prev) => prev + "\n" + message.body);
        });

        client.current.subscribe(
          `/app/getTopics/${customerProfile.customerId}`,
          (message) => {
            console.log("subd topics: " + message.body);
            setSubscribedTopics(JSON.parse(message.body));
          }
        );

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

  useEffect(() => {
    console.log(subscribedTopics);

    subscribedTopics.forEach((topicName, index) => {
      var publisherIdDash = topicName.replace("Publisher:", "");
      var publisher = publisherIdDash.substring(
        0,
        publisherIdDash.indexOf("-")
      );

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
  console.log(chat);
  console.log(sendMessage);
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
