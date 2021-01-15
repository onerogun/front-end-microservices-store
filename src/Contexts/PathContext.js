import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { ServerContext } from "./ServerContext";

export const PathContext = React.createContext();

export const PathProvider = (props) => {
  const [path, setPath] = useState([]);
  const [loading, setLoading] = useState(true);
  const server = useContext(ServerContext);
  const [itemId, setItemId] = useState();

  useEffect(() => {
    FetchPath();
  }, []);

  const FetchPath = () => {
    axios
      .get(`${server}/items/getItemFileLocations/${itemId}`)
      .then((res) => {
        console.log(res.data.pathObjList);
        setPath(res.data.pathObjList);
        setLoading(false);
      })
      .catch((err) => console.log(err));
  };

  return (
    <PathContext.Provider value={[path, loading]}>
      {props.children}
    </PathContext.Provider>
  );
};
