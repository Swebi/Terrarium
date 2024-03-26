import React, { useState, useEffect } from "react";
import TimerTabs from "./components/timerTabs";
import Navbar from "./components/navbar";
import { BarChart } from "@tremor/react";
import { Button } from "./components/ui/button";

function App() {
  const [completedSessions, setCompletedSessions] = useState([]);
  const [fullSessions, setFullSessions] = useState();
  const [chartData, setChartData] = useState([]); // using state for chartData as i want the graph to update as the chartData changes

  // hard to keep complex structures in local storage, so formatting on FE
  function formatChartData(sessions) {
    return sessions.map((seconds) => ({
      name: "Time Spent",
      Seconds: seconds,
    }));
  }

  // timer is only updating local storage, need to fetch and display in app
  useEffect(() => {
    const sessionsFromStorage = JSON.parse(
      localStorage.getItem("completedSessions")
    );
    if (sessionsFromStorage && Array.isArray(sessionsFromStorage)) {
      setCompletedSessions(sessionsFromStorage);
      const formattedData = formatChartData(sessionsFromStorage);
      // first time to render graph on load
      setChartData(formattedData);
    }

    const fullSessionsFromStorage =
      JSON.parse(localStorage.getItem("fullSessions")) || 0;
    setFullSessions(fullSessionsFromStorage);
  }, []);

  useEffect(() => {
    const formattedData = formatChartData(completedSessions);
    setChartData(formattedData);

    // second useEffect to check for updates ecerytime completed session updates
    // for some reason error when putting completed sessions as a dependency in the prev useEff
  }, [completedSessions]);

  return (
    <>
      <div className="flex justify-center items-center py-10 w-full h-full sm:w-full sm:h-full md:h-full lg:h-full 2xl:h-screen bg-gray-100  overscroll-none">
        {" "}
        {/*bg-[url('https://external-preview.redd.it/8loO2K5hh6prp787KssQUJklO5eyS0BxEThIX96a9b4.jpg?auto=webp&s=1a498aade9d48e0ba7a016c0f83ed8136c7d3709')] bg-cover */}
        <div className="flex flex-col justify-center items-center gap-8 mx-auto w-full">
          <div className="flex-col justify-center items-center pl-10  md:flex md:flex-row-reverse gap-8  ">
            <div className="flex flex-col justify-center items-center  gap-4 sm:gap-8 border  mb-8 md:mb-0 w-[300px] h-[240px] mx-auto sm:h-[285px] sm:w-[450px] md:h-[300px] md:w-[320px] lg:h-[470px] lg:w-[340px] mr-10 pl-8 pr-8 mt-11 rounded-2xl shadow-lg bg-white">
              <h1 className=" text-3xl sm:text-5xl justify-start self-start">
                Hi Suhayb
              </h1>
              <h2 className="text-xl sm:text-2xl justify-start self-start">
                You've completed {fullSessions} sessions
              </h2>
              <Button
                className="px-10  mt-2 sm:mt-5"
                onClick={() => {
                  localStorage.clear();
                  setFullSessions(0);
                  setCompletedSessions([]);
                }}
              >
                {" "}
                Clear
              </Button>
            </div>
            <TimerTabs
              completedSessions={completedSessions}
              setCompletedSessions={setCompletedSessions}
              fullSessions={fullSessions}
              setFullSessions={setFullSessions}
            />
          </div>
          <div className="flex border w-[300px] sm:w-[450px] md:w-[780px] lg:w-[950px] mx-auto justify-center items-center h-fit p-4 rounded-2xl shadow-lg bg-white">
            <BarChart
              data={chartData}
              index="name"
              categories={["Seconds"]}
              colors={["teal"]}
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
