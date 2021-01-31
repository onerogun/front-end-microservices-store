import React, { useState, useEffect, useContext, useRef } from "react";
import { Client } from "@stomp/stompjs";
import { CustomerProfileContext } from "./CustomerProfileContext";

export const ChatContext = React.createContext();

export const ChatProvider = (props) => {
  const client = useRef(new Client());
  const [connected, setConnected] = useState(false);
  const [subscribedTopics, setSubscribedTopics] = useState([]);
  const [
    customerProfile,
    userProfile,
    setCustomerProfile,
    setUserProfile,
  ] = useContext(CustomerProfileContext);

  const arr = useRef([]);
  const [chat, setChat] = useState([]);

  const [chatIndex, setChatIndex] = useState(-1);

  /**
   * first open websocket and subscribe to certain endpoints
   */
  useEffect(() => {
    client.current.configure({
      brokerURL: "ws://localhost:7979//mywebsockets",
      onConnect: () => {
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

  /**
   * When list of subscribed topics change, create new array for topics
   * and details
   */
  useEffect(() => {
    console.log("subbed topic change");
    console.log(subscribedTopics);
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

      if (arr.current.findIndex((msg) => msg.topic === topicName) < 0) {
        arr.current.push({
          topic: topicName,
          publisher: publisher,
          message: [],
          sendMessage: "",
          youSent: [],
        });
      }
      /**
       * adds received chat to the array only when a new message is received
       */
      client.current.subscribe(`/queue/${topicName}`, (message) => {
        console.log("newmsg:" + message.body);
        arr.current[index].message = [
          ...arr.current[index].message,
          message.body,
        ];
        if (
          arr.current[index].message.length > arr.current[index].youSent.length
        ) {
          arr.current[index].youSent = [...arr.current[index].youSent, ""];
        }

        setChat([...arr.current]);
      });
    });
    /**
     * sets chat array
     */
    setChat([...arr.current]);
  }, [subscribedTopics]);

  useEffect(() => {
    if (connected && client.current) {
      /**
       * Add server sent back messages to current chat. server will always send back
       * messages
       */
      client.current.subscribe(`/user/queue/chat`, (message) => {
        console.log("sent msg: " + message.body);

        arr.current[chatIndex].youSent = [
          ...arr.current[chatIndex].youSent,
          message.body,
        ];

        if (
          arr.current[chatIndex].youSent.length >
          arr.current[chatIndex].message.length
        ) {
          arr.current[chatIndex].message = [
            ...arr.current[chatIndex].message,
            "",
          ];
        }
        console.log(arr.current);
        setChat([...arr.current]);
      });
    }
  }, [chatIndex]);

  return (
    <ChatContext.Provider
      value={[
        connected,
        subscribedTopics,
        chat,
        setChat,
        client,
        arr,
        setConnected,
        chatIndex,
        setChatIndex,
      ]}
    >
      {props.children}
    </ChatContext.Provider>
  );
};
