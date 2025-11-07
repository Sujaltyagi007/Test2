"use client";
import React from "react";

export const ticketContext = React.createContext(null);

export const TicketProvider = ({ children }) => {
  const [number, setNumber] = React.useState("DL51EV");
  const [color, setColor] = React.useState("#1aabb0");
  const [ticketTime, setTicketTime] = React.useState(null);
  const [ticketDate, setTicketDate] = React.useState(null);
  const [ticketCount, setTicketCount] = React.useState(1);
  const [ticketPrice, setTicketPrice] = React.useState(10);
  const [startValue, setStartValue] = React.useState("");
  const [endValue, setEndValue] = React.useState("");
  const [route, setRoute] = React.useState("");
  const [digit, setDigit] = React.useState("");
  const completeNumber = `${number}${digit}`;

  const [ticket, setTicket] = React.useState(() => {
    if (typeof window !== "undefined") {
      const savedTicket = localStorage.getItem("busTicket");
      return (
        JSON.parse(savedTicket) || {
          number,
          color,
          ticketTime,
          ticketDate,
          ticketCount,
          startValue,
          endValue,
          route,
          digit,
        }
      );
    }
    return {
      number,
      color,
      ticketTime,
      ticketDate,
      ticketCount,
      startValue,
      endValue,
      route,
      digit,
    };
  });

  // Load ticket from localStorage (client side only)
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const savedTicket = localStorage.getItem("busTicket");
      if (savedTicket) {
        const t = JSON.parse(savedTicket);
        console.log(t);
        setTicket(t);
        setNumber(t.number);
        setDigit(t.digit);
        setRoute(t.route);
        setColor(t.color);
        setTicketTime(t.ticketTime);
        setTicketDate(t.ticketDate);
        setTicketCount(t.ticketCount);
        setStartValue(t.startValue);
        setEndValue(t.endValue);
      }
    }
  }, []);

  // Save ticket to localStorage whenever it changes
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("busTicket", JSON.stringify(ticket));
    }
  }, [ticket]);

  return (
    <ticketContext.Provider
      value={{
        ticket,
        setTicket,
        number,
        setNumber,
        color,
        setColor,
        ticketTime,
        setTicketTime,
        ticketDate,
        setTicketDate,
        ticketCount,
        setTicketCount,
        startValue,
        setStartValue,
        endValue,
        setEndValue,
        route,
        setRoute,
        digit,
        setDigit,
        ticketPrice,
        setTicketPrice,
        completeNumber,
      }}
    >
      {children}
    </ticketContext.Provider>
  );
};

export const useTicket = () => React.useContext(ticketContext);
