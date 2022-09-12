import Item from "./Item";
import React, { useContext, useEffect, useRef, useState } from "react";
import { PopupContext } from "./context";
import axios from "axios";

const ListItem = () => {
  const ref = useRef();
  const [listItem, setListItem] = useState([]);
  const { isPopup, setPopup } = useContext(PopupContext);

  useEffect(() => {
    if (listItem.length === 0) {
      fetchApi(4, "0x00B91B2F8aFE87FCDc2b3fFA9ee2278cd1E4DDf8");
    }
  });

  const closePopup = () => {
    setPopup(false);
  };

  const fetchApi = async (chainId, userAddress) => {
    const response = await axios.get(
      `http://192.168.0.88:8000/items/list?chainId=${chainId}&userAddress=${userAddress}`
    );
    if (response.status === 200) {
      setListItem(response.data.data);
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        top: "20%",
        left: "30%",
        zIndex: 100,
        display: "flex",
        flexDirection: "column",
        visibility: isPopup ? "visible" : "hidden",
        maxWidth: "50%",
        maxHeight: "500px",
      }}
    >
      <button onClick={closePopup} style={{ width: "5%", marginLeft: "auto" }}>
        x
      </button>
      <div
        ref={ref}
        id="listItem"
        style={{
          overflow: "hidden",
          overflowY: "scroll",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "white",
        }}
      >
        {listItem.map((item) => {
          return (
            <Item
              key={item._id}
              itemId={item._id}
              itemTokenId={item.itemTokenId}
              itemName={item.itemName}
              itemMedia={item.itemMedia}
            />
          );
        })}
      </div>
    </div>
  );
};

export default ListItem;
