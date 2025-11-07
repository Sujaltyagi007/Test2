"use client";
import { useRouter } from "next/navigation";
import { IoCheckmark } from 'react-icons/io5';
import React, { useEffect } from "react";

export default function page() {
  const router = useRouter();
  useEffect(() => {
    setTimeout(() => {
      router.push("/ticket");
    }, 2000);
    return () => clearTimeout();
  }, []);
  return (
    <section className="w-full h-screen flex flex-col justify-between items-center px-8 pt-10 pb-4">
      <div className="w-1/2 relative">
        <div className="loader absolute top-0 left-0"></div>
        <div className="border border-gray-400 rounded-full w-[98%] mt-0.5 ml-0.5 aspect-square absolute top-0 left-0 -z-10"></div>
        <img
          src="./assets/logo/logo.png"
          alt="Logo"
          className="relative -z-20 scale-80"
        />
      </div>
      <div className="border-t border-gray-300 py-10 h-[50%]">
        <div className="flex gap-2 mb-8">
          <div>
            <div className="w-fit bg-green-600 rounded-full p-0.5">
              <IoCheckmark className="text-white font-bold" />
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Initialised</div>
            <div className="text-[14px]">Payment is in progress...</div>
          </div>
        </div>
        <div className="flex gap-2">
          <div>
            <div className="w-fit bg-green-600 rounded-full p-0.5">
              <IoCheckmark className="text-white font-bold" />
            </div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Completed</div>
            <div className="text-[14px]" >Payment Confirmed. Generating Ticket</div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-3 flex-col">
        <div className="text-xs text-gray-400">
          Do not press back or leave this screen
        </div>
        <div className="flex gap-2">
          <img
            src="./assets/images/secure.png"
            alt="Secure"
            className="text-white font-bold w-5 object-contain"
          />
          <div className="text-sm text-gray-600">Secured Payment</div>
        </div>
      </div>
    </section>
  );
}
