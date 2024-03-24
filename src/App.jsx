import { useState, useContext } from "react";
import Timer from "./components/timer";
import { SettingsContext } from "./contexts/settingsContext";

function App() {
  const [workValue, setWorkValue] = useState([25]);
  const [breakValue, setBreakValue] = useState([5]);

  return (
    <>
      <div className="flex flex-col gap-5 justify-center items-center w-screen h-screen bg-gray-100 ">
        <SettingsContext.Provider
          value={{
            workValue,
            breakValue,
            setWorkValue,
            setBreakValue,
          }}
        >
          <Timer />
        </SettingsContext.Provider>
      </div>
    </>
  );
}

export default App;
