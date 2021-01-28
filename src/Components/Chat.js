import React, { useState, useEffect, useContext, useRef } from "react";
import { Client } from "@stomp/stompjs";

export const Chat = () => {
  var client = useRef(new Client());
  const [conv, setConv] = useState("");
  const [connnected, setConnected] = useState(false);

  useEffect(() => {
    client.current.configure({
      brokerURL: "ws://localhost:7979/mywebsockets",
      onConnect: () => {
        console.log("onConnect");

        client.current.subscribe("/queue/now", (message) => {
          setConv((prev) => prev + message.body);
          console.log(message);
        });

        client.current.subscribe("/topic/news", (message) => {
          setConv((prev) => prev + message.body);
        });
        setConnected(true);
      },
    });
  }, []);

  const clickHandler = () => {
    client.current.publish({ destination: "/app/news", body: "Hello world" });
  };

  const handleDisconnect = () => {
    client.current.deactivate();
    setConnected(false);
  };

  const clickJoin = () => {
    client.current.activate();
  };

  return (
    <div className="App">
      <header className="App-header">
        <p>{conv}</p>
        <p>
          <button onClick={(e) => clickJoin(e)}>Join</button>
          <button
            disabled={connnected ? false : true}
            onClick={(e) => clickHandler(e)}
          >
            Send
          </button>
          <button onClick={(e) => handleDisconnect(e)}>Disconnect</button>
        </p>
      </header>
    </div>
  );
};
