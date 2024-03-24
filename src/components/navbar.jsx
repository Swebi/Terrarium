import React from "react";
import { TiHome } from "react-icons/ti";
import { FaClock } from "react-icons/fa";
import { IoStatsChart } from "react-icons/io5";
import { LuListTodo } from "react-icons/lu";

const Navbar = () => {
  return (
    <div className="flex flex-col min-w-[300px] h-[92vh] gap-4  rounded-2xl ml-8 bg-white shadow-2xl ">
      <div className=" flex flex-col justify-center pl-4 p-12  w-full border h-[20%] rounded-t-2xl rounded-bl-2xl bg-gradient-to-r from-green-300 to-green-400">
        <h1 className="text-white text-5xl font-semibold">Terrarium</h1>
        <h1 className="text-[#387330] font-medium">Your study environment</h1>
      </div>
      <div className="flex flex-col gap-4 px-4 pl-8 my-2">
        <div className="flex justify-start items-center gap-2 w-full h-20  rounded-lg">
          <TiHome size={25} />
          <h1 className="text-xl mt-1">Dashboard</h1>
        </div>
        <div className="flex justify-start items-center gap-2 w-full h-20  rounded-lg">
          <FaClock size={20} />
          <h1 className="text-xl">Pomodoro Timer</h1>
        </div>
        <div className="flex justify-start items-center gap-2 w-full h-20  rounded-lg">
          <IoStatsChart size={25} />
          <h1 className="text-xl mt-1">Statistics</h1>
        </div>
        <div className="flex justify-start items-center gap-2 w-full h-20  rounded-lg">
          <LuListTodo size={25} />
          <h1 className="text-xl mt-1">Todo List</h1>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
