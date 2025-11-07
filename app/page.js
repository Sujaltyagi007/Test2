import Image from "next/image";
import { ImLocation } from "react-icons/im";
import { MdHelpOutline, MdSearch } from "react-icons/md";
import { HiUserCircle } from "react-icons/hi";
import { GrHomeRounded } from "react-icons/gr";
import Location from "./component/location";
import TicketIcon from "./component/ticketIcon";
import Link from "next/link";

export default function Home() {
  const FooterCompo = [
    {
      name: "Home",
      icon: <GrHomeRounded className="text-gray-700 text-xl" />,
    },
    {
      name: "Neardy",
      icon: <Location className="w-4.5 text-gray-500 scale-200" />,
    },
    {
      name: "Ticket & Pass",
      icon: <TicketIcon className="w-5 text-gray-500 scale-200" />,
    },
    {
      name: "Around me",
      icon: <Location className="w-4.5 text-gray-500 scale-200 " />,
    },
    {
      name: "Help",
      icon: <MdHelpOutline className="text-gray-700 text-2xl" />,
    },
  ];
  return (
    <div className=" h-screen w-full bg-[#f8f0e5] ">
      {/* Header Section */}
      <div
        style={{
          backgroundImage: "url('./assets/background/Image.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "bottom ",
          width: "100%",
          height: "100%",
        }}
        className="min-h-[14vh] max-h-[16vh] w-full mb-16  "
      >
        <div className="w-full h-full bg-white absolute top-0 min-h-[14vh] max-h-[16vh] z-10 opacity-40"></div>
        <div className=" flex justify-between relative z-20 py-[8%] px-[4%] w-full ">
          <div>
            <img
              src="./assets/images/logo.avif"
              alt="logo"
              className="w-[28vw] h-fit"
            />
          </div>
          <div className="flex items-center gap-3 ">
            <div className="p-1.5 rounded-r-full rounded-tl-full flex justify-center items-center gap-1 text-gray-800 text-[12px] bg-white">
              <img
                src={"./assets/main/wallet.svg"}
                alt="wallet"
                className="size-5 rotate-y-30 perspective-normal "
              />
              &#8377; 0.0
            </div>
            <HiUserCircle className="text-black text-[34px]" />
          </div>
        </div>
        <div className=" flex items-center justify-between bg-white rounded-full p-3 my-2 relative z-20 shadow-md text-sm justify-self-center w-[95%] ">
          <ImLocation className="text-[#53bcbf] text-2xl " />
          <input
            type="text"
            placeholder="Where are you going? "
            className="placeholder:text-gray-500 placeholder:text-[16px] placeholder:font-medium font-semibold outline-none text-gray-500 w-[70vw] "
          />
          <MdSearch className="text-gray-600 text-2xl " />
        </div>
      </div>
      {/* Middle Section */}
      <div className="bg-white h-[52vh] w-full flex flex-col justify-between">
        <div className=" flex items-center w-full p-4 ">
          <h1 className="text-sm font-bold uppercase text-gray-500 pr-4 py-2 text-nowrap">
            your travel kit
          </h1>
          <div className="w-[45vw] h-px bg-linear-to-r from-gray-400  to-white"></div>
        </div>
        <div
          style={{
            backgroundImage: "url('./assets/main/Background.png')",
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center ",
            width: "100%",
            height: "100%",
            scale: "1.01",
            opacity: "1",
            // position: "absolute",
            // top: 45,
          }}
          className=" max-w-screen "
        >
          <Link href="/entry">
            <p className=" bg-transparent w-[45%] translate-x-[8.5%] translate-y-[6%] h-[58%] rounded-2xl "></p>
          </Link>
        </div>
        <div className=" flex items-center w-full p-4 ">
          <h1 className="text-sm font-bold uppercase text-gray-500 pr-4 py-2 text-nowrap">
            Around you
          </h1>
          <div className="w-[45vw] h-px bg-linear-to-r from-gray-400  to-white"></div>
        </div>
      </div>
      <div className="w-full bg-[#8fdaed] h-[20vh] absolute transform -translate-y-[10%] ">
        <div className="h-[8%] bg-linear-to-b from-white  to-[#8fdaed] "></div>
      </div>
      {/* Footer Section */}
      <div className=" flex justify-around items-center p-2 text-gray-600  font-semibold fixed bottom-0 w-full bg-white">
        {FooterCompo.map((item, index) => (
          <div
            key={index}
            className=" flex flex-col justify-center items-center"
          >
            {item.icon}
            <span className="text-[12px]">{item.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
