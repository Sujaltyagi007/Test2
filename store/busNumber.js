"use client";
import React from "react";

export const busNumberContext = React.createContext(null);

const BusNumberProvider = ({ children }) => {
  const [number, setNumber] = React.useState("DL51EV");
  const [route, setRoute] = React.useState("123");
  const [digit, setDigit] = React.useState("");
  const completeNumber = `${number}${digit}`;
  return (
    <busNumberContext.Provider
      value={{
        number,
        setNumber,
        digit,
        setDigit,
        completeNumber,
        route,
        setRoute,
      }}
    >
      {children}
    </busNumberContext.Provider>
  );
};
export default BusNumberProvider;

export const useBusNumber = () => React.useContext(busNumberContext);
