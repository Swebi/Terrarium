import React, { useEffect, useState, useContext, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoPlayCircleSharp, IoPauseSharp, IoStopCircle } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { SettingsContext } from "@/contexts/settingsContext";

import BreakSettings from "./breaksettings";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const Timer = ({
  completedSessions,
  fullSessions,
  setCompletedSessions,
  setFullSessions,
}) => {
  const settings = useContext(SettingsContext);

  const [isPaused, setIsPaused] = useState(true);
  const [secondsLeft, setSecondsLeft] = useState(settings.breakValue * 60);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  function initTimer() {
    setSecondsLeft(settings.breakValue * 60);
    secondsLeftRef.current = settings.breakValue * 60;
  }

  function tick() {
    if (secondsLeftRef.current <= 0) {
      resetTimer();
      settings.setActiveTab("focus");
      return;
    }

    secondsLeftRef.current -= 1;
    setSecondsLeft(secondsLeftRef.current);
  }

  function resetTimer() {
    setIsPaused(true);
    isPausedRef.current = true;
    setSecondsLeft(settings.breakValue * 60);
    secondsLeftRef.current = settings.breakValue * 60;
  }

  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        tick();
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [settings]);

  const totalSeconds = settings.breakValue * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-10 px-36 border bg-white rounded-2xl shadow-lg w-[450px] md:w-[420px] lg:w-[575px]">
      <CircularProgressbar
        counterClockwise={true}
        value={percentage}
        text={`${minutes}:${seconds}`}
        strokeWidth={6}
        styles={buildStyles({
          textColor: "#000",
          pathColor: "#60a5fa",
          tailColor: "rgba(255,255,255,.6)",
        })}
      />
      <div className="flex justify-center items-center gap-4">
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
        <IoStopCircle
          size={70}
          color="#000"
          onClick={() => {
            resetTimer();
          }}
        />

        <Dialog>
          <DialogTrigger className="text-2xl font-light">
            <IoMdSettings size={65} />
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Duration</DialogTitle>
              <DialogDescription>
                Adjust the slider according to your pomodoro length
              </DialogDescription>
            </DialogHeader>
            <BreakSettings />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Timer;
