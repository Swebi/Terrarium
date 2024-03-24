import { useState, useContext } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Timer from "./timer";
import BreakTimer from "./breaktimer";
import { SettingsContext } from "@/contexts/settingsContext";

function TimerTabs() {
  const [workValue, setWorkValue] = useState([25]);
  const [breakValue, setBreakValue] = useState([5]);
  const [activeTab, setActiveTab] = useState("focus");

  const handleTabChange = (value) => {
    setActiveTab(value);
  };

  return (
    <>
      <Tabs
        defaultValue="focus"
        className="min-w-fit "
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
            <Timer />
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
            <BreakTimer />
          </SettingsContext.Provider>
        </TabsContent>
      </Tabs>
    </>
  );
}

export default TimerTabs;