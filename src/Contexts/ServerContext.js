import React, { useState } from "react";

export const ServerContext = React.createContext();
//http://192.168.49.2:31000
//http://localhost:9191
export const ServerProvider = (props) => {
  const [server, setServer] = useState("http://192.168.49.2:31000");

  return (
    <ServerContext.Provider value={server}>
      {props.children}
    </ServerContext.Provider>
  );
};
