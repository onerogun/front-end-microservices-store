import React, { useState } from "react";

export const ServerContext = React.createContext();

export const ServerProvider = (props) => {
    const [server, setServer] = useState("http://localhost:9191");

    return(
        <ServerContext.Provider value={server}>
            {props.children}
            </ServerContext.Provider>
    );
};