import React, { useState, useEffect } from "react";
import TimerTabs from "./components/timerTabs";
import Navbar from "./components/navbar";
import { BarChart } from "@tremor/react";

function App() {
  const [completedSessions, setCompletedSessions] = useState([]);
  const [fullSessions, setFullSessions] = useState();

  useEffect(() => {
    const sessionsFromStorage = JSON.parse(
      localStorage.getItem("completedSessions")
    );
    if (sessionsFromStorage && Array.isArray(sessionsFromStorage)) {
      setCompletedSessions(sessionsFromStorage);
    }
    const fullSessionsFromStorage =
      JSON.parse(localStorage.getItem("fullSessions")) || 0;
    setFullSessions(fullSessionsFromStorage);
  }, []);

  // Dummy chartdata for demonstration
  const chartdata = [
    { name: "Amphibians", "Number of threatened species": 2488 },
    { name: "Birds", "Number of threatened species": 1445 },
    { name: "Crustaceans", "Number of threatened species": 743 },
    { name: "Ferns", "Number of threatened species": 281 },
    { name: "Arachnids", "Number of threatened species": 251 },
    { name: "Corals", "Number of threatened species": 232 },
    { name: "Algae", "Number of threatened species": 98 },
  ];

  return (
    <>
      <div className="flex flex-row justify-between py-10 w-screen h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-col gap-8">
          <div className="flex gap-8">
            <TimerTabs />
            <div className="flex flex-col justify-center items-center gap-8 border h-[485px] w-[900px] mr-10 pl-8 pr-8 mt-11 rounded-2xl shadow-lg bg-white">
              <h1 className="text-5xl justify-start self-start">Hi Suhayb</h1>
              <div>
                <h2>Completed Sessions: {fullSessions}</h2>

                <ul className="flex gap-4 ">
                  {completedSessions.map((session, index) => (
                    <li key={index}>{session}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
          <div className="flex border h-full overflow-hidden p-4 mr-10 rounded-2xl shadow-lg bg-white">
            <BarChart
              data={chartdata}
              index="name"
              categories={["Number of threatened species"]}
              colors={["blue"]}
              yAxisWidth={48}
              onValueChange={(v) => console.log(v)}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
