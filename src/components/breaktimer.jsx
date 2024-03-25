import React, { useEffect, useState, useContext, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoPlayCircleSharp, IoPauseSharp, IoStopCircle } from "react-icons/io5";
import { FaStop } from "react-icons/fa";

import { SettingsContext } from "@/contexts/settingsContext";

import Settings from "./settings";
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
      completeSession();
      completeFullSession();
      resetTimer();
      settings.setActiveTab("break");
      return;
    }

    secondsLeftRef.current -= 1;
    setSecondsLeft(secondsLeftRef.current);
  }

  function completeFullSession() {
    // Retrieve the current fullSessions count from local storage
    const fullSessionsFromStorage =
      JSON.parse(localStorage.getItem("fullSessions")) || 0;

    // Increment the fullSessions count
    const updatedFullSessions = fullSessionsFromStorage + 1;

    // Update state and local storage with the updated fullSessions count
    setFullSessions(updatedFullSessions);
    localStorage.setItem("fullSessions", JSON.stringify(updatedFullSessions));
  }

  function completeSession() {
    const sessionDuration = settings.breakValue * 60 - secondsLeftRef.current;

    if (sessionDuration === 0) {
      return;
    } else {
      // Retrieve existing completed sessions from local storage
      const sessionsFromStorage =
        JSON.parse(localStorage.getItem("completedSessions")) || [];

      // Push the new session duration to the existing sessions
      const updatedSessions = [...sessionsFromStorage, sessionDuration];

      // Update state and local storage with the updated sessions
      setCompletedSessions(updatedSessions);
      localStorage.setItem(
        "completedSessions",
        JSON.stringify(updatedSessions)
      );
    }
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
    }, 100);

    return () => clearInterval(interval);
  }, [settings]);

  const totalSeconds = settings.breakValue * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100);

  const minutes = Math.floor(secondsLeft / 60);
  let seconds = secondsLeft % 60;
  if (seconds < 10) seconds = "0" + seconds;

  return (
    <div className="flex flex-col justify-center items-center gap-8 p-10 px-36 border bg-white rounded-2xl shadow-lg">
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
            completeSession();
            resetTimer();
          }}
        />

        <Dialog>
          <DialogTrigger className="text-2xl font-light">
            Settings
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Choose Duration</DialogTitle>
              <DialogDescription>
                Adjust the slider according to your pomodoro length
              </DialogDescription>
            </DialogHeader>
            <Settings />
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default Timer;
