"use client";
import React from "react";
import { FaInfoCircle } from "react-icons/fa";
import { IoMdBus } from "react-icons/io";
import { MdArrowBack } from "react-icons/md";
import { RiCheckboxBlankCircleFill } from "react-icons/ri";
import { IoArrowDown } from "react-icons/io5";
import { ImLocation } from "react-icons/im";
import { useTicket } from "@/store/ticket";
import { useRouter } from "next/navigation";
import { Roboto_Condensed } from "next/font/google";

const roboto = Roboto_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const getTicketPrice = (price) => {
  switch (price) {
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

const TicketCard = () => {
  const { savedTicket } = useTicket();
  const price = savedTicket.ticketPrice || 10;
  return (
    <div className="flex flex-col px-2 py-3 w-full items-center gap-2 border rounded-2xl ">
      {/* Head */}
      <div className="flex items-center w-full justify-between px-1 ">
        <div className="flex items-center gap-3">
          <IoMdBus className="text-[#3563aa] text-2xl" />
          <p className="py-1 px-2 text-sm font-semibold bg-[#e8f1ff] rounded-[5px] text-[#5b7eb2] ">{`Route ${savedTicket.route}`}</p>
        </div>
        <div className="flex items-center gap-2">
          <p>₹{getTicketPrice(price)}</p>
          <FaInfoCircle className="text-gray-600" />
        </div>
      </div>
      {/* Middle */}
      <div className="flex flex-col justify-start gap-2 w-full px-2 ">
        <div className=" flex gap-2 items-center">
          <RiCheckboxBlankCircleFill className="text-lg text-[#219652]" />
          <p className="text-sm font-semibold">
            {savedTicket.startValue || "Azadpur Terminal"}
          </p>
        </div>
        <IoArrowDown className="text-gray-600" />
        <div className="flex items-center gap-2 ">
          <ImLocation className="text-lg text-[#cf3b3b]" />
          <p className="text-sm font-semibold">
            {savedTicket.endValue || "Moti Nagar"}
          </p>
        </div>
      </div>
      {/* Bottom */}
      <div className="w-full bg-[#219652] text-center p-2 rounded-[5px] text-white ">
        {"View Ticket"}
      </div>
    </div>
  );
};

const NoneCard = ({ text }) => {
  return (
    <>
      <h2 className="font-bold text-[16px] pt-2 pb-2">{text}</h2>
      <div className="flex flex-col p-2 w-full mb-2 items-center gap-2 border rounded-2xl">
        <p className="text-sm text-gray-600">
          {"Click to see past "}
          <span className="lowercase">{text}.</span>
        </p>
      </div>
    </>
  );
};

export default function page() {
  const router = useRouter();
  const [activeTab, setActiveTab] = React.useState(0);
  const Tabs = ["Recent", "Bus Tickets", "Bus Pass", "Metro Ticket"];

  const handleNext = () => {
    router.push("/ticket");
  };

  const handleGoBackHome = () => {
    router.push("/");
  };
  return (
    <section className="h-screen w-full">
      {/* Header Section */}
      <div
        onClick={handleGoBackHome}
        className="flex items-center gap-6 px-4 py-3"
      >
        <MdArrowBack className="text-gray-700 text-2xl" />
        <span className="text-[16px] font-semibold">{"All Bookings"}</span>
      </div>
      {/* Navigation Tabs */}
      <div className="grid grid-cols-4 ">
        {Tabs.map((item, index) => (
          <div
            key={index}
            onClick={() => setActiveTab(index)}
            className={`px-4 ${
              activeTab === index &&
              " border-b-2 text-center font-bold border-[#1aabb0]"
            }  uppercase text-[13px] text-center flex items-center text-gray-800 align-text-bottom`}
          >
            <p className={`py-2 px-1 ${roboto.className} `}>{item}</p>
          </div>
        ))}
      </div>
      {/* Main Div */}
      <div onClick={handleNext} className="px-4 py-2">
        <h2 className="font-bold text-[16px] mb-1">{"Bus Ticket"}</h2>
        <TicketCard />
        <NoneCard text={"Metro Ticket"} />
        <NoneCard text={"Bus Pass"} />
      </div>
    </section>
  );
}
