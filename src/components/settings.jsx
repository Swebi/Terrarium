import React, { useEffect, useState, useContext } from "react";
import { Slider } from "@/components/ui/slider";
import { SettingsContext } from "@/contexts/settingsContext";

const Settings = () => {
  const settings = useContext(SettingsContext);

  return (
    <div className="flex flex-col justify-center items-center gap-8">
      <Slider
        defaultValue={settings.workValue}
        onValueChange={(value) => settings.setWorkValue([value])}
        min={1}
        max={60}
        step={1}
        className="w-96"
      />
      <h1 className="text-3xl text-black">Work: {settings.workValue}</h1>



      {/* <Slider
        defaultValue={[settings.breakValue]}
        onValueChange={(value) => settings.setBreakValue([value])}
        min={1}
        max={60}
        step={1}
        className="w-96"
        
      />
      <h1 className="text-3xl text-black">Break {settings.breakValue}</h1> */}
    </div>
  );
};

export default Settings;
