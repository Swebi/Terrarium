import React, { useEffect, useState, useContext } from "react";
import { Slider } from "@/components/ui/slider";
import { SettingsContext } from "@/contexts/settingsContext";

const Settings = () => {
  const settings = useContext(SettingsContext);

  return (
    <div className="flex flex-col justify-center items-center gap-5 pt-2">
      <Slider
        defaultValue={settings.workValue}
        onValueChange={(value) => settings.setWorkValue([value])}
        min={1}
        max={60}
        step={1}
        className="w-96"
        slidercolor={"bg-green-400"}
      />
      <h1 className="text-2xl font-light text-black">
        Minutes: {settings.workValue}
      </h1>
    </div>
  );
};

export default Settings;