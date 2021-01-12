import React, {useState, useEffect, useContext} from "react";
import {ServerContext} from "../Contexts/ServerContext";
import axios from "axios";

//http://localhost:9191/items/getItemsPage?pageNo=0&pageSize=3&sortBy=itemId

export const ProductContext = React.createContext();

export const ProductProvider = (props) => {
    const[products, setProducts] = useState([]);
    const server = useContext(ServerContext);

    const FetchProducts = () => {
        axios.get(`${server}/items/getItems`).then((res) => {
        setProducts(res.data.itemList);
        });
    };

    useEffect(() => {
        FetchProducts();
    }, [])

    return(
        <ProductContext.Provider value={products} >
            {props.children}
        </ProductContext.Provider>
    );
};