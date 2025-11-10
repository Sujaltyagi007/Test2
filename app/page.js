"use client";
import { ImLocation } from "react-icons/im";
import { MdHelpOutline, MdSearch } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import { GrHomeRounded } from "react-icons/gr";
import Location from "./component/location";
import TicketIcon from "./component/ticketIcon";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const pathname = usePathname(); 

  const FooterCompo = [
    { name: "Home", icon: <GrHomeRounded className="text-xl" />, route: "/" },
    { name: "Neardy", icon: <Location className="w-4.5 text-[#979797] scale-200" />, route: "/" },
    { name: "Ticket & Pass", icon: <TicketIcon className="w-5 text-[#979797] scale-200" />, route: "/viewPage" },
    { name: "Around me", icon: <Location className="w-4.5 text-[#979797] scale-200" />, route: "/" },
    { name: "Help", icon: <MdHelpOutline className="text-[#979797] text-2xl" />, route: "/" },
  ];

  const handleNavigate = (route) => {
    if (pathname !== route) {
      router.push(route); // SPA-safe navigation
    }
  };

  return (
    <div className="h-screen w-full bg-[#f8f0e5] overflow-hidden">
      {/* Header Section */}
      <div
        style={{
          backgroundImage: "url('./assets/background/Image.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          width: "100%",
          height: "100%",
        }}
        className="min-h-[14vh] max-h-[16vh] w-full mb-16"
      >
        <div className="w-full h-full bg-white absolute top-0 min-h-[14vh] max-h-[16vh] z-10 opacity-40"></div>
        <div className="flex justify-between relative z-20 py-[8%] px-[4%] w-full">
          <div>
            <img src="./assets/images/logo.avif" alt="logo" className="w-[28vw] h-fit" />
          </div>
          <div className="flex items-center gap-3">
            <div className="p-1.5 rounded-r-full rounded-tl-full flex justify-center items-center gap-1 text-gray-800 text-[12px] bg-white">
              <img src="./assets/main/wallet.svg" alt="wallet" className="size-5 rotate-y-30 perspective-normal" />
              &#8377; 0.0
            </div>
            <HiUserCircle className="text-black text-[34px]" />
          </div>
        </div>
        <div className="flex items-center justify-between bg-white rounded-full p-3 my-2 relative z-20 shadow-md text-sm justify-self-center w-[95%]">
          <ImLocation className="text-[#53bcbf] text-2xl" />
          <input
            type="text"
            placeholder="Where are you going? "
            className="placeholder:text-gray-500 placeholder:text-[15px] placeholder:font-medium font-medium outline-none text-gray-500 w-[70vw]"
          />
          <MdSearch className="text-gray-600 text-2xl" />
        </div>
      </div>

      {/* Middle Section */}
      <div className="bg-white h-[47vh] w-full flex flex-col justify-between">
        <div className="flex items-center w-full px-5 pt-2">
          <h1 className="text-[13px] font-semibold uppercase text-[#979797] pr-4 pt-2 text-nowrap">
            your travel kit
          </h1>
          <div className="w-[45vw] h-px bg-linear-to-r from-[#979797] mt-1 to-white"></div>
        </div>
        <div className="max-w-screen relative bg-transparent h-[calc(100%-5vh)] py-2">
          <img src={"./assets/main/Background.png"} alt="ticket" className="scale-101" />
          <Link
            href="/entry"
            className="absolute top-[10%] left-[8%] -translate-y-[10%] -translate-x-[8%] z-10 w-[45%] bg-transparent h-[55%] rounded-2xl"
          ></Link>
        </div>
        <div className="flex items-center w-full px-5">
          <h1 className="text-[13px] font-semibold uppercase text-[#979797] pr-4 pb-2 text-nowrap">
            Around you
          </h1>
          <div className="w-[45vw] h-px bg-linear-to-r from-gray-400 to-white"></div>
        </div>
      </div>
      <div className="w-full bg-[#8fdaed] h-[25vh]">
        <div className="h-[8%] bg-linear-to-b from-white to-[#8fdaed]"></div>
      </div>

      {/* Footer Section */}
      <div className="flex justify-between items-center px-4 pb-3 pt-3 fixed bottom-0 w-full bg-white">
        {FooterCompo.map((item, index) => (
          <div
            key={index}
            onClick={() => handleNavigate(item.route)}
            className={`flex flex-col justify-center items-center ${
              pathname === item.route ? "text-gray-800 font-semibold" : "text-[#979797]"
            } text-nowrap`}
          >
            {item.icon}
            <span className="text-[12px]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
