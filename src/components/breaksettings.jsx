import React, { useEffect, useState, useContext } from "react";
import { Slider } from "@/components/ui/slider";
import { SettingsContext } from "@/contexts/settingsContext";

const BreakSettings = () => {
  const settings = useContext(SettingsContext);

  return (
    <div className="flex flex-col justify-center items-center gap-6 pt-2">
      <Slider
        defaultValue={settings.breakValue}
        onValueChange={(value) => settings.setBreakValue([value])}
        min={1}
        max={60}
        step={1}
        className="w-96"
        slidercolor={"bg-blue-400"}
      />
      <h1 className="text-xl font-light text-black">
        Break Time : {settings.breakValue} Minutes
      </h1>
    </div>
  );
};

export default BreakSettings;
