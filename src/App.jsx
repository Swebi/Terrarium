import { useState, useContext } from "react";
import TimerTabs from "./components/timerTabs";
import Navbar from "./components/navbar";

function App() {
  return (
    <>
      <div className="flex flex-row f justify-between  py-10 w-screen h-screen bg-gray-100 ">
        <Navbar />

        <div className="flex flex-col gap-8">
          <div className="flex gap-8">
            <TimerTabs />
            <div className="flex flex-col border h-[60vh] w-[900px] mr-10 rounded-2xl shadow-lg bg-white"></div>
          </div>
          <div className="flex flex-col border h-full mr-10 rounded-2xl shadow-lg bg-white"></div>
        </div>
      </div>
    </>
  );
}

export default App;
