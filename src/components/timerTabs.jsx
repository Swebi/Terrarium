import { useState, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Timer from "./timer";
import BreakTimer from "./breaktimer";
import { SettingsContext } from "@/contexts/settingsContext";
import Settings from "./settings";
import BreakSettings from "./breaksettings";

function TimerTabs({
  completedSessions,
  fullSessions,
  setCompletedSessions,
  setFullSessions,
}) {
  const [workValue, setWorkValue] = useState([25]);
  const [breakValue, setBreakValue] = useState([5]);
  const [activeTab, setActiveTab] = useState("focus"); // not related to settings but i had to pass it to timer

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <>
      <Tabs
        defaultValue="focus"
        className="w-[90%] md:w-fit "
        value={activeTab}
        onValueChange={handleTabChange}
        // When a tab change event occurs (e.g., clicking on a tab trigger), the onValueChange event of the Tabs component is triggered.
        // The Tabs component internally passes the new value of the active tab to the handleTabChange function.
        // The value argument in handleTabChange receives this new value, which is then used to update the activeTab state using setActiveTab(value).
      >
        <TabsList className="p-0 ">
          <TabsTrigger value="focus" className="px-5 py-2 text-lg font-light">
            Focus
          </TabsTrigger>
          <TabsTrigger value="break" className="px-5 py-2 text-lg font-light">
            Break
          </TabsTrigger>
          <TabsTrigger
            value="settings"
            className="px-5 py-2 text-lg font-light"
          >
            Settings
          </TabsTrigger>
        </TabsList>
        <TabsContent value="focus">
          <SettingsContext.Provider
            value={{
              workValue,
              breakValue,
              setWorkValue,
              setBreakValue,
              setActiveTab,
            }}
          >
            <Timer
              completedSessions={completedSessions}
              setCompletedSessions={setCompletedSessions}
              fullSessions={fullSessions}
              setFullSessions={setFullSessions}
            />
          </SettingsContext.Provider>{" "}
        </TabsContent>
        <TabsContent value="break">
          <SettingsContext.Provider
            value={{
              workValue,
              breakValue,
              setWorkValue,
              setBreakValue,
              setActiveTab,
            }}
          >
            <BreakTimer
              completedSessions={completedSessions}
              setCompletedSessions={setCompletedSessions}
              fullSessions={fullSessions}
              setFullSessions={setFullSessions}
            />
          </SettingsContext.Provider>
        </TabsContent>
        <TabsContent value="settings">
          <SettingsContext.Provider
            value={{
              workValue,
              breakValue,
              setWorkValue,
              setBreakValue,
              setActiveTab,
            }}
          >
            <div className="flex flex-col justify-center items-center gap-8 p-10 px-36 border   bg-white rounded-2xl shadow-lg w-[300px] h-[366px] sm:w-[450px] md:w-[420px] sm:h-[344px]  md:h-[314px]  lg:h-[470px]  lg:w-[575px]">
              <Settings></Settings>
              <BreakSettings></BreakSettings>
            </div>
          </SettingsContext.Provider>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default TimerTabs;
