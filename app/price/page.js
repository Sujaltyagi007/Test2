"use client";
import React, { useEffect, useState } from "react";
import { useBusColor } from "@/store/busColor";
import { useBusNumber } from "@/store/busNumber";
import { IoMdBus } from "react-icons/io";
import Link from "next/link";
import { MdArrowBack } from "react-icons/md";

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
  const month = now.toLocaleString("en-US", { month: "short" }); // "Nov"
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
  const { color } = useBusColor();
  const { completeNumber, route } = useBusNumber();
  const time = ticTime();
  const date = ticDate();

  return (
    <section className="text-gray-600">
      {/* Header section */}
      <div className="min-h-[7vh] flex items-center gap-6 px-4 mb-2 justify-between shadow-md">
        <div className=" flex justify-center items-center gap-4 ">
          <Link href={"/entry"}>
            <MdArrowBack className="text-2xl" />
          </Link>
          <p className="text-base font-semibold">{`Ticket Details`}</p>
        </div>
        <div>
          <p className="p-5"></p>
        </div>
      </div>
      <div className="m-3 shadow border rounded-2xl ">
        <div
          style={{ backgroundColor: color }}
          className=" flex justify-between text-[14px] text-white p-4 overflow-hidden rounded-t-2xl items-center"
        >
          <p>
            {date} | {time}
          </p>
          <p>{completeNumber}</p>
        </div>
        <div className="flex justify-between items-center p-4">
          <div className="flex items-center gap-2 px-1">
            <div
              style={{ backgroundColor: color }}
              className="text-3xl text-white w-fit p-2 rounded-full "
            >
              <IoMdBus />
            </div>
            <div>
              <p className="font-bold text-gray-700 text-[18px] ">{route}</p>
              <p className="text-sm font-semibold text-gray-500">{"towards"}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
