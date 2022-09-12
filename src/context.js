import { createContext, useState } from "react";

const PopupContext = createContext();

const PopupProvider = ({ children }) => {
  const [isPopup, setPopup] = useState(false);
  const [position, setPosition] = useState(null);
  const [gallery, setGallery] = useState(null);
  const [galleryUrl, setGalleryUrl] = useState("");
  const [listPosition, setListPosition] = useState([]);

  const value = {
    isPopup,
    setPopup,
    position,
    setPosition,
    gallery,
    setGallery,
    galleryUrl,
    setGalleryUrl,
    listPosition,
    setListPosition,
  };

  return (
    <PopupContext.Provider value={value}>{children}</PopupContext.Provider>
  );
};

export { PopupContext, PopupProvider };
