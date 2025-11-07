"use client";
import React, { useEffect, useState } from "react";
import { IoMdBus } from "react-icons/io";
import { RiPencilFill } from "react-icons/ri";
import { CgShapeCircle } from "react-icons/cg";
import { HiOutlineMinusSm } from "react-icons/hi";
import { FaInfoCircle } from "react-icons/fa";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";
import { Roboto_Condensed } from "next/font/google";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../component/select";
import { StopList } from "../data/stopData";
import { useTicket } from "@/store/ticket";
import { useRouter } from "next/navigation";

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: "400",
});

const CountdownTimer = () => {
  const [timeLeft, setTimeLeft] = React.useState(2 * 60 + 52);
  React.useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;
  return (
    <p className="text-gray-500 text-sm px-4">
      {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
    </p>
  );
};

const SelectStartingStop = ({ data, startValue, setStartValue }) => {
  const [filteredData, setFilteredData] = useState(data);
  useEffect(() => {
    if (startValue.trim() === "") {
      setFilteredData([]);
      return;
    }

    const filtered = data.filter((item) =>
      item.toLowerCase().includes(startValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [startValue]);

  const handleSelect = (item) => {
    setStartValue(item); // Set the input value
    setFilteredData([]); // Clear the list immediately
  };
  return (
    <div className="flex flex-col gap-0.5 w-full mb-1.5 pt-0.5 ">
      <h2 className="text-[12.5px] font-semibold text-[#acacac]">
        {"Starting Stop"}
      </h2>
      <input
        type="text"
        value={startValue}
        placeholder="Enter Starting Stop"
        onChange={(e) => setStartValue(e.target.value)}
        className="text-sm font-semibold border border-gray-300 text-gray-700 p-1.5 w-full"
      />
      {startValue && filteredData.length > 0 && (
        <ul
          style={{ display: filteredData.length > 0 ? "block" : "none" }}
          className="absolute bg-white list-none border transform translate-y-14 w-[75vw] max-h-[40vh] h-fit text-wrap overflow-y-scroll overflow-x-clip "
          onClick={() => setFilteredData([])}
        >
          {filteredData.map((item, index) => (
            <li
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(item);
              }}
              className=" cursor-pointer text-wrap w-full border-b px-3 py-2 "
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

const SelectLastStop = ({ data, endValue, setEndValue }) => {
  const [filteredData, setFilteredData] = useState(data);
  const handleSelect = (item) => {
    setEndValue(item);
    setFilteredData([]);
  };
  useEffect(() => {
    if (endValue.trim() === "") {
      setFilteredData([]);
      return;
    }

    const filtered = data.filter((item) =>
      item.toLowerCase().includes(endValue.toLowerCase())
    );
    setFilteredData(filtered);
  }, [endValue]);
  return (
    <div className="flex flex-col gap-0.5 w-full mb-1.5 pt-0.5">
      <h2 className="text-[12.5px] font-semibold text-[#acacac]">
        {"Last Stop"}
      </h2>
      <input
        type="text"
        value={endValue}
        onChange={(e) => setEndValue(e.target.value)}
        placeholder="Enter Last Stop"
        className="text-sm font-semibold border border-gray-300 text-gray-700 p-1.5 w-full"
      />
      {endValue && filteredData.length > 0 && (
        <ul
          style={{ display: filteredData.length > 0 ? "block" : "none" }}
          className="absolute bg-white list-none border transform translate-y-14 w-[75vw] max-h-[40vh] h-fit text-wrap overflow-y-scroll overflow-x-clip "
          // onClick={() => setFilteredData([])}
        >
          {filteredData.map((item, index) => (
            <li
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                handleSelect(item);
              }}
              className=" cursor-pointer text-wrap w-full border-b px-3 py-2 "
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default function page() {
  const router = useRouter();
  const [busType, setBusType] = useState(0);
  const [startValue, setStartValue] = useState("");
  const [endValue, setEndValue] = useState("");
  const [data, setData] = useState(StopList || []);
  const {
    color,
    completeNumber,
    route,
    ticketTime,
    ticketDate,
    ticketCount,
    setTicketCount,
    ticketPrice,
    setTicketPrice,
    setTicket,
  } = useTicket();

  const busTypes = [
    {
      item: "AC",
      index: 0,
    },
    {
      item: "Non-AC",
      index: 1,
    },
  ];

  const handleNext = () => {
    setTicket((prev) => ({
      ...prev,
      completeNumber,
      route,
      startValue,
      endValue,
      ticketTime,
      ticketDate,
      ticketCount,
      ticketPrice,
    }));
    setTimeout(() => {
      router.push("/loading");
    }, 50);
  };

  const getPriceLabel = (ticketPrice) => {
    switch (ticketPrice) {
      case 5:
        return 4.62;
      case 10:
        return 9.25;
      case 15:
        return 13.75;
      case 20:
        return 18.29;
      case 25:
        return 22.79;
      default:
        return 9.25;
    }
  };

  <div className="font-semibold">
    {getPriceLabel(ticketPrice)} ₹.{ticketPrice}0
  </div>;

  return (
    <section className="h-screen w-screen overflow-hidden ">
      {/* Header section */}
      <div
        className={`min-h-[7vh] flex items-center gap-6 text-gray-700 px-4 justify-between`}
      >
        <div className=" flex justify-center items-center gap-4 ">
          <Link href={"/entry"}>
            <MdArrowBack className="text-2xl" />
          </Link>
          <p className="text-[0.9rem] font-semibold">{`Ticket Details`}</p>
        </div>
        <div>
          <CountdownTimer />
        </div>
      </div>
      <div className="mx-4 my-2 shadow border bg-[#fafafa] rounded-2xl overflow-hidden ">
        <div
          style={{ backgroundColor: color }}
          className={` flex justify-between text-[14px] ${roboto.className} text-white px-4 py-3 overflow-hidden rounded-t-2xl items-center`}
        >
          <p>
            {ticketDate} | {ticketTime}
          </p>
          <p>{completeNumber}</p>
        </div>
        <div className="flex justify-between items-center p-4 ">
          <div className="flex items-center gap-2 px-1">
            <div
              style={{ backgroundColor: color }}
              className="text-3xl text-white w-fit p-2 rounded-full "
            >
              <IoMdBus />
            </div>
            <div>
              <p className="font-bold text-gray-700 text-[18px] ">{route}</p>
              <p className="text-sm font-semibold text-gray-400">{"towards"}</p>
            </div>
          </div>
          <div className="text-2xl text-gray-700">
            <RiPencilFill />
          </div>
        </div>
        <hr className=" border-gray-200 w-[90%] flex justify-self-center " />
        <div className="flex items-center p-4 ">
          <div className="flex flex-col text-gray-500 text-xl items-center min-h-32 gap-1 p-1">
            <CgShapeCircle />
            <div className="h-[34px] mr-0.5 w-[3px] rounded-full overflow-hidden bg-[repeating-linear-gradient(to_bottom,#7b7b7b_9px_14px,transparent_18px_19px)]"></div>
            <CgShapeCircle />
          </div>
          <div className="flex flex-col gap-0.5 w-full py-3 ">
            <SelectStartingStop
              data={data}
              startValue={startValue}
              setStartValue={setStartValue}
            />
            <SelectLastStop
              data={data}
              endValue={endValue}
              setEndValue={setEndValue}
            />
          </div>
        </div>
        <div
          className=" h-px "
          style={{
            backgroundImage:
              "repeating-linear-gradient(to right, #dbdbdb 0 6px, transparent 7px 12px)",
          }}
        ></div>

        <div className=" absolute px-4 overflow-hidden z-10 flex justify-between transform -translate-x-1/2 -translate-y-[50%]  left-1/2 items-center w-[91.7%] ">
          <div className="p-4 bg-white rounded-full border-2 -translate-x-8 "></div>
          <div className="p-4 bg-white rounded-full border-2 translate-x-8"></div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className=" text-gray-700 font-semibold text-[13px] py-2">
            {"Number of tickets"}
          </div>
          <div className="flex items-center gap-2 ">
            <button
              onClick={() =>
                setTicketCount(() => {
                  if (ticketCount === 1 && ticketCount >= 1) return 1;
                  return ticketCount - 1;
                })
              }
              className="text-xl text-gray-700 p-0.5 rounded-full border bg-white "
            >
              <HiOutlineMinusSm className="text-gray-500  " />
            </button>
            <div className="text-base rounded-md border px-3 py-1 bg-white font-semibold text-gray-700">
              {ticketCount}
            </div>
            <button
              onClick={() =>
                setTicketCount(() => {
                  if (ticketCount === 3 && ticketCount <= 3) return 3;
                  return ticketCount + 1;
                })
              }
              className="text-xl text-gray-700 p-0.5 rounded-full border bg-white "
            >
              <FiPlus className="text-gray-500" />
            </button>
          </div>
        </div>
        <div className="px-4 mb-3 flex justify-between items-center">
          <h1 className="text-[13px] font-semibold text-gray-700  ">
            {"Bus type"}
          </h1>
          <div className="flex items-center gap-2 ">
            {busTypes.map((items, index) => (
              <p
                key={index}
                onClick={() => setBusType(index)}
                className={` ${
                  items.index === busType
                    ? "bg-green-100  "
                    : "bg-white border border-gray-100 "
                } text-[12px] text-gray-500 font-semibold py-1 px-2  rounded-lg cursor-pointer `}
              >
                {items.item}
              </p>
            ))}
          </div>
        </div>
      </div>
      <div className=" m-4 shadow border bg-[#fafafa] rounded-2xl overflow-hidden px-4 py-1.5 flex justify-between items-center ">
        <div className=" flex flex-col gap-1">
          <h2 className="flex gap-2 items-center font-extrabold text-gray-900 text-base ">
            Final Fare
            <span>
              <FaInfoCircle className="text-gray-500 text-sm" />
            </span>
          </h2>
          <h3 className="text-sm font-semibold text-[#f08f3aec]">
            {"Coupen Applied"}
          </h3>
        </div>
        <div className="text-end">
          <h3 className="font-extrabold text-xl ">
            &#8377; {ticketCount * getPriceLabel(ticketPrice)}
          </h3>
          <p className="text-[13px]">{"WELCOME10"}</p>
        </div>
      </div>
      <div className=" fixed bottom-20 right-0 ">
        <Select>
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Select" />
          </SelectTrigger>
          <SelectContent side="top" align="center" alignOffset={40}>
            <SelectItem value="5" onClick={() => setTicketPrice(5)}>
              5
            </SelectItem>
            <SelectItem value="10" onClick={() => setTicketPrice(10)}>
              10
            </SelectItem>
            <SelectItem value="15" onClick={() => setTicketPrice(15)}>
              15
            </SelectItem>
            <SelectItem value="20" onClick={() => setTicketPrice(20)}>
              20
            </SelectItem>
            <SelectItem value="25" onClick={() => setTicketPrice(25)}>
              25
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="fixed bottom-0 w-full border p-4">
        <button
          onClick={handleNext}
          className="w-full bg-[#1bbabe] text-white text-lg font-semibold py-2 rounded-md "
        >
          {"Pay"}
        </button>
      </div>
    </section>
  );
}
