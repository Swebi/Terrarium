import React, { useState, useEffect } from "react";
import TimerTabs from "./components/timerTabs";
import Navbar from "./components/navbar";
import { BarChart } from "@tremor/react";

function App() {
  const [completedSessions, setCompletedSessions] = useState([]);
  const [fullSessions, setFullSessions] = useState();
  const [chartData, setChartData] = useState([]);

  function formatChartData(sessions) {
    return sessions.map((seconds) => ({
      name: "Time Spent",
      Seconds: seconds,
    }));
  }

  useEffect(() => {
    const sessionsFromStorage = JSON.parse(
      localStorage.getItem("completedSessions")
    );
    if (sessionsFromStorage && Array.isArray(sessionsFromStorage)) {
      setCompletedSessions(sessionsFromStorage);
      console.log(sessionsFromStorage);

      const formattedData = formatChartData(sessionsFromStorage);
      setChartData(formattedData);
    }

    const fullSessionsFromStorage =
      JSON.parse(localStorage.getItem("fullSessions")) || 0;
    setFullSessions(fullSessionsFromStorage);
  }, []);

  // Dummy chartdata for demonstration

  return (
    <>
      <div className="flex flex-row justify-between py-10 w-screen h-screen bg-gray-100">
        <Navbar />
        <div className="flex flex-col gap-8">
          <div className="flex gap-8">
            <TimerTabs />
            <div className="flex flex-col justify-center items-center gap-8 border h-[485px] w-[900px] mr-10 pl-8 pr-8 mt-11 rounded-2xl shadow-lg bg-white">
              <h1 className="text-5xl justify-start self-start">Hi Suhayb</h1>
              <h2 className="text-2xl justify-start self-start">
                You've completed {fullSessions} sessions
              </h2>
            </div>
          </div>
          <div className="flex border h-full overflow-hidden p-4 mr-10 rounded-2xl shadow-lg bg-white">
            <BarChart
              data={chartData}
              index="name"
              categories={["Seconds"]}
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
