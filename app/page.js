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
    <div className="flex justify-center items-center h-screen ">
      {/* Header Section */}
      <div
        style={{
          backgroundImage: "url('/Image.jpeg')",
          backgroundSize: "cover",
          backgroundPosition: "bottom ",
          width: "100%",
          height: "100%",
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: -1,
        }}
        className="min-h-[16vh] max-h-[19vh]"
      >
        <div className="w-full h-full bg-white opacity-40"></div>
        <div className=" absolute top-[22%] flex justify-between px-[4%] w-full ">
          <div>
            <Image
              src="/assets/images/logo.avif"
              alt="logo"
              width={512}
              height={88}
              className=" w-[28vw] h-fit"
            />
          </div>
          <div className="flex items-center gap-3 ">
            <div className="p-1.5 rounded-r-full rounded-tl-full flex justify-center items-center gap-1 text-gray-800 text-[12px] bg-white">
              <Image
                src={"/assets/main/wallet.svg"}
                alt="wallet"
                width={275}
                height={210}
                className="size-5 rotate-y-30 perspective-normal "
              />
              &#8377; 0.0
            </div>
            <HiUserCircle className="text-black text-2xl" />
          </div>
        </div>
        <div className=" flex items-center justify-between bg-white absolute top-[82%] rounded-full p-3 shadow-md text-sm justify-self-center w-[95%] ">
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
      <div className="bg-white h-[50vh] absolute top-[60%] transform -translate-y-[60%] w-full flex flex-col justify-between">
        <div className=" flex items-center w-full p-3 ">
          <h1 className="text-sm font-bold uppercase text-gray-500 pr-4 py-2 text-nowrap">
            your travel kit
          </h1>
          <div className="w-[45vw] h-px bg-linear-to-r from-gray-400  to-white"></div>
        </div>
        <div
          style={{
            backgroundImage: "url('./assets/main/Background.png')",
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center ",
            width: "100%",
            height: "75%",
            scale: "1.01",
            position: "absolute",
            top: 45,
          }}
          className=" "
        >
          <Link href="/entry">
            <p className=" bg-transparent w-[44.5%] translate-x-[10%] translate-y-[9%] h-[57%] rounded-2xl "></p>
          </Link>
        </div>
        <div className=" flex items-center w-full p-3 ">
          <h1 className="text-sm font-bold uppercase text-gray-500 pr-4 py-2 text-nowrap">
            Around you
          </h1>
          <div className="w-[45vw] h-px bg-linear-to-r from-gray-400  to-white"></div>
        </div>
      </div>
      <div className="w-full bg-[#8fdaed] fixed bottom-10 h-[20vh] ">
        <div className="h-[10%] bg-linear-to-b from-white  to-[#8fdaed] "></div>
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
