"use client";
import React from "react";
import { MdArrowBack } from "react-icons/md";
import { useRouter } from "next/navigation";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "../component/input-otp";
import Link from "next/link";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "../component/select";
import { SelectValue } from "@radix-ui/react-select";
import { useTicket } from "@/store/ticket";

function ticTime() {
  const now = new Date();
  const ticTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return ticTime;
}

function ticDate() {
  const now = new Date();
  const day = now.getDate().toString().padStart(2, "0");
  const month = now.toLocaleString("en-US", { month: "short" });
  const year = now.getFullYear();
  const formattedDate = `${day} ${month}, ${year}`;

  // Format time: "3:42 PM"
  const formattedTime = now.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
  return formattedDate;
}

export default function page() {
  const router = useRouter();
  const ticketTime = ticTime();
  const ticketDate = ticDate();
  const { ticket, dispatch } = useTicket();

  const handleNext = () => {
    dispatch({
      type: "UPDATE",
      payload: {
        ticketTime,
        ticketDate,
        completeNumber: ticket.number + ticket.digit,
      },
    });
    setTimeout(() => {
      router.push("/price");
    }, 50);
  };
  return (
    <section className="text-gray-600 h-screen w-full ">
      {/* Header section */}
      <div className="min-h-[7vh] flex items-center gap-4 px-4 mb-2 justify-between shadow-md">
        <div className=" flex justify-center items-center gap-4 ">
          <Link href={"/"}>
            <MdArrowBack className="text-2xl" />
          </Link>
          <p className="text-base font-semibold">{`New Bus Ticket`}</p>
        </div>

        <button onClick={handleNext}>
          <p className="p-5"></p>
        </button>
      </div>
      {/* Boxes */}
      <div className=" p-3 flex flex-col gap-3">
        <label className="font-semibold">Choose ticket booking flow</label>
        {/* First Box */}
        <div
          className={`shadow-[0_5px_10px_rgba(0,0,0,0.3)] flex flex-col justify-center items-center gap-2 px-4 py-4 rounded-2xl`}
        >
          <h2 className="font-semibold">Enter Bus Number</h2>
          <p className="text-sm text-gray-400 font-medium mb-2">
            {" "}
            Like 1234 for DL 1PC 1234
          </p>
          <InputOTP
            maxLength={4}
            onChange={(value) =>
              dispatch({ type: "UPDATE", payload: { digit: value } })
            }
          >
            <InputOTPGroup className={"gap-4"}>
              <InputOTPSlot
                index={0}
                className={" rounded-lg p-5 border bg-[#f7f8fc]"}
              />
              <InputOTPSlot
                index={1}
                className={" rounded-lg p-5 border bg-[#f7f8fc]"}
              />
              <InputOTPSlot
                index={2}
                className={" rounded-lg p-5 border bg-[#f7f8fc]"}
              />
              <InputOTPSlot
                index={3}
                className={" rounded-lg p-5 border bg-[#f7f8fc]"}
              />
            </InputOTPGroup>
          </InputOTP>
          <p className="text-[13px] font-normal text-gray-500 px-3 text-center mt-2 ">
            Bus number can be found inside the bus at multiple places.
          </p>
        </div>
        <label className=" text-center font-semibold">or</label>
        {/* Second Box */}
        <div
          className={`shadow-[0_5px_10px_rgba(0,0,0,0.3)] flex flex-col justify-center items-center gap-4 px-4 py-4 rounded-2xl`}
        >
          <h2 className=" font-semibold">Enter Route</h2>
          <input
            type="number"
            placeholder="eg. 534 or 764"
            // value={}
            onChange={(e) =>
              dispatch({ type: "UPDATE", payload: { route: e.target.value } })
            }
            className="w-full px-4 py-2 border rounded-md bg-[#f7f8fc]"
          />
          <p className="text-[13px] font-normal text-gray-500">
            You can ask conductor for current route.
          </p>
        </div>
      </div>

      {/* Select Bus Color */}
      <div className="fixed bottom-5 left-4">
        <Select
          name="busColor"
          value={ticket.color}
          onValueChange={(value) =>
            dispatch({ type: "UPDATE", payload: { color: value } })
          }
        >
          <SelectTrigger className="p-2 border rounded">
            <SelectValue placeholder="Select color" />
          </SelectTrigger>
          <SelectContent side="top" align="center" alignOffset={40}>
            <SelectItem value="#1aabb0">Blue (EV)</SelectItem>
            <SelectItem value="#2b79dd">Blue (PD)</SelectItem>
            <SelectItem value="#209151">Green</SelectItem>
            <SelectItem value="#cd3939">Red</SelectItem>
            <SelectItem value="#f28526">Orange</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Select Bus Number */}
      <div className="fixed bottom-5 right-4">
        <Select
          name="busColor"
          value={ticket.number}
          onValueChange={(value) =>
            dispatch({ type: "UPDATE", payload: { number: value } })
          }
        >
          <SelectTrigger className="p-2 border rounded">
            <SelectValue placeholder="Bus Number" />
          </SelectTrigger>

          <SelectContent side="top" align="center" alignOffset={40}>
            <SelectItem value="DL51EV">DL51EV</SelectItem>
            <SelectItem value="DL51GD">DL51GD</SelectItem>
            <SelectItem value="DL1PD">DL1PD</SelectItem>
            <SelectItem value="DL1PC">DL1PC</SelectItem>
            <SelectItem value="DL1PB">DL1PB</SelectItem>
          </SelectContent>
        </Select>
      </div>
    </section>
  );
}
