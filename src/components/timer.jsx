import React, { useEffect, useState, useContext, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoPlayCircleSharp, IoPauseSharp } from "react-icons/io5";
import { SettingsContext } from "@/contexts/settingsContext";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import Settings from "./settings";
const Timer = () => {
  const settings = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(settings.workValue * 60);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  function initTimer() {
    setSecondsLeft(settings.workValue * 60);
    secondsLeftRef.current = settings.workValue * 60;
  }

  function tick() {
    if (secondsLeftRef.current <= 0) {
      resetTimer();
      return;
    }

    secondsLeftRef.current -= 1;
    setSecondsLeft(secondsLeftRef.current);
  }

  function resetTimer() {
    setIsPaused(true);
    isPausedRef.current = true;
    setSecondsLeft(settings.workValue * 60);
    secondsLeftRef.current = settings.workValue * 60;
  }

  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        tick();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [settings]);

  const totalSeconds = settings.workValue * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-16 px-32 border bg-white">
      <CircularProgressbar
        counterClockwise={true}
        value={percentage}
        text={`${minutes}:${seconds}`}
        strokeWidth={6}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#4aec8c",
          tailColor: "rgba(255,255,255,.6)",
        })}
      />
      <div className="flex">
        {isPaused ? (
          <IoPlayCircleSharp
            size={70}
            color="#000"
            onClick={() => {
              setIsPaused(false);
              isPausedRef.current = false;
            }}
          />
        ) : (
          <IoPauseSharp
            size={70}
            color="#000"
            onClick={() => {
              setIsPaused(true);
              isPausedRef.current = true;
            }}
          />
        )}
      </div>
      <Popover>
        <PopoverTrigger className="text-2xl">Settings</PopoverTrigger>
        <PopoverContent className="w-fit">
          <Settings />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default Timer;
