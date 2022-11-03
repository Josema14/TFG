import React, { useState, useEffect } from "react";
import "../shop/Shop.css";

import { Pagination } from "@mui/material";

//import Item from "../../components/items/Item";

import Item from "../shop/Item";
import { getInventory } from "../../Controlador";

const Inventory = () => {
  //Variables de estado
  const [page, setPage] = React.useState(1);
  const [items, setItems] = useState([]);
  const LOCATION = "inventory";
  //Búsqueda

  const itemsPerPage = 6;
  const handleChange = (event, value) => {
    setPage(value);
  };

  useEffect(() => {
    getInventory().then((res) => {
      
      setItems(res.data.items);
    });
  }, []);

  return (
    <div className="shop">
      <div className="shop__body">
        <div className="searchBar__container"></div>

        <div className="shopItem__container">
          <div className="shopItem__row">
            {items
              .slice((page - 1) * itemsPerPage, (page - 1) * itemsPerPage + 3)
              .map((item, i) => {
                return <Item item={item} location={LOCATION} key={i} />;
              })}
          </div>

          <div className="shopItem__row">
            {items
              .slice((page - 1) * itemsPerPage + 3, page * itemsPerPage)
              .map((item, i) => {
                return <Item item={item} location={LOCATION} key={i} />;
              })}
          </div>
        </div>

        <div className="shop__footer">
          <Pagination
            count={Math.ceil(items.length / itemsPerPage)}
            page={page}
            onChange={handleChange}
            defaultPage={1}
            color="primary"
            size="large"
            showFirstButton
            showLastButton
          />
        </div>
      </div>
    </div>
  );
};

export default Inventory;
