"use client";
import React from "react";
export const busColorContext = React.createContext(null);
const BusColorProvider = ({ children }) => {
  const [color, setColor] = React.useState("#1aabb0");
  return (
    <busColorContext.Provider value={{ color, setColor }}>
      {children}
    </busColorContext.Provider>
  );
};
export default BusColorProvider;

export const useBusColor = () => React.useContext(busColorContext);
