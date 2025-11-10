"use client";
import React from "react";

export const TicketContext = React.createContext(null);

function initialTicketState() {
  return {
    number: "DL51EV",
    color: "#1aabb0",
    ticketTime: null,
    ticketDate: null,
    ticketCount: 1,
    ticketPrice: 10,
    startValue: "",
    endValue: "",
    route: "",
    digit: "",
  };
}

function ticketReducer(state, action) {
  switch (action.type) {
    case "SET_FIELD":
      return { ...state, [action.field]: action.value };
    case "UPDATE":
      return { ...state, ...action.payload };
    case "RESET":
      return initialTicketState();
    case "LOAD_SAVED":
      return { ...state, ...action.payload };
    case "INCREMENT_COUNT":
      return { ...state, ticketCount: Math.min(state.ticketCount + 1, 3) };
    case "DECREMENT_COUNT":
      return { ...state, ticketCount: Math.max(state.ticketCount - 1, 1) };
    default:
      return state;
  }
}

export const TicketProvider = ({ children }) => {
  const [savedTicket, setSavedTicket] = React.useState(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("chatr");
      if (saved) {
        try {
          return JSON.parse(saved);
        } catch (error) {
          console.error("Error parsing saved ticket:", error);
        }
      }
    }
    return initialTicketState();
  });

  const [ticket, dispatch] = React.useReducer(ticketReducer, savedTicket);
  
  const saveTicket = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("chatr", JSON.stringify(ticket));
      console.log("Ticket saved to localStorage:", ticket);

      const saved = localStorage.getItem("chatr");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          dispatch({ type: "LOAD_SAVED", payload: parsed });
          setSavedTicket(parsed);
        } catch (err) {
          console.error("Error parsing saved ticket:", err);
        }
      }
    }
  };

  return (
    <TicketContext.Provider
      value={{ ticket, dispatch, saveTicket, savedTicket }}
    >
      {children}
    </TicketContext.Provider>
  );
};

export const useTicket = () => React.useContext(TicketContext);
