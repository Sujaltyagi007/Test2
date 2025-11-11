"use client";
import React from "react";
import { CgClose } from "react-icons/cg";
import { BsQrCode } from "react-icons/bs";
import { useTicket } from "@/store/ticket";
import Link from "next/link";

const CurrentDate = () => {
  const [formattedDate, setFormattedDate] = React.useState("");
  React.useEffect(() => {
    const now = new Date();
    const day = String(now.getDate()).padStart(2, "0");
    const month = String(now.getMonth() + 1).padStart(2, "0");
    const year = now.getFullYear();

    setFormattedDate(`${day}${month}${year}`);
  }, []);

  return <span>{formattedDate}</span>;
};

export default function page() {
  const { savedTicket } = useTicket();
  const [showQr, setShowQr] = React.useState(false);

  React.useEffect(() => {
    const handleTouchMove = (event) => {
      if (event.touches.length > 1) {
        event.preventDefault();
      }
    };

    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    return () => {
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, []);

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

  return (
    <section
      className="ticket w-full h-screen flex flex-col justify-center px-4"
      style={{ backgroundColor: savedTicket?.color }}
    >
      <div className="fixed top-0 left-0 w-full text-xs text-white flex justify-between px-4 py-4">
        <div className=" flex justify-center items-center gap-2">
          <Link href="https://sujaltyagi007.github.io/Test2/">
            <CgClose className="text-2xl text-gray-200 " />
          </Link>
        </div>
        <div className="flex items-center gap-6">
          <div className="flex justify-center items-center gap-1">
            <img src="./assets/images/alert.png" alt="" className="w-5 " />
            <span>{"Issue with ticket?"}</span>
          </div>
          <div className=" ">{"View all tickets"}</div>
        </div>
      </div>
      <div className=" bg-white rounded-md    flex flex-col p-4 gap-1 w-full ">
        {showQr ? (
          <div
            onClick={() => setShowQr(!showQr)}
            className="h-[60vh] flex items-center px-4 "
          >
            <div className="">
              <img src="./assets/images/qr.png" alt="w-full m-auto" />
            </div>
          </div>
        ) : (
          <>
            <h2 className="font-semibold text-center w-full">
              Transport Dept. of Delhi
            </h2>
            <div className="flex justify-between border-b py-2">
              <div className="">{savedTicket.completeNumber}</div>
              <div className="">
                ₹
                {(
                  getPriceLabel(savedTicket.ticketPrice) *
                  savedTicket.ticketCount
                ).toFixed(2)}
              </div>
            </div>
            <div className="flex justify-between py-1">
              <div className=" flex flex-col">
                <span className="text-xs">Bus Route</span>
                {savedTicket.route}
              </div>
              <div className=" flex flex-col text-right">
                <span className="text-xs">Fare</span>
                <div className="font-semibold">
                  ₹{savedTicket.ticketPrice * savedTicket.ticketCount}.0
                </div>
              </div>
            </div>
            <div className="flex justify-between py-1">
              <div className=" flex flex-col">
                <span className="text-xs">Booking Time</span>
                {savedTicket.ticketDate} | {savedTicket.ticketTime}{" "}
              </div>
              <div className=" flex flex-col text-right">
                <span className="text-xs">Tickets</span>
                {savedTicket.ticketCount}
              </div>
            </div>
            <div className=" flex flex-col">
              <span className="text-xs">Starting stop</span>
              {savedTicket.startValue}
            </div>
            <div className=" flex flex-col">
              <span className="text-xs">Ending stop</span>
              {savedTicket.endValue}
            </div>
            <div className=" text-xs text-center py-2">
              T<CurrentDate />
              a6387b167
            </div>
            <div
              onClick={() => setShowQr(!showQr)}
              style={{
                backgroundColor: "#daf2e4",
                borderColor: "#239454",
                color: "#239454",
              }}
              className="text-red-600 bg-red-200 border flex justify-center items-center gap-2 rounded-md py-2"
            >
              <BsQrCode className="text-2xl" />
              <div className="font-semibold">Show QR code</div>
            </div>
            <div className="">
              <img
                src="./assets/images/bottom.svg"
                alt=""
                className="w-[50%]  mx-auto mt-4 "
              />
            </div>
          </>
        )}
      </div>
    </section>
  );
}
