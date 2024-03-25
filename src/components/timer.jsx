import React, { useEffect, useState, useContext, useRef } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { IoPlayCircleSharp, IoPauseSharp, IoStopCircle } from "react-icons/io5";

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
  const [secondsLeft, setSecondsLeft] = useState(settings.workValue * 60);

  const secondsLeftRef = useRef(secondsLeft);
  const isPausedRef = useRef(isPaused);

  function initTimer() {
    setSecondsLeft(settings.workValue * 60);
    secondsLeftRef.current = settings.workValue * 60;
  }

  function tick() {
    if (secondsLeftRef.current <= 0) {
      completeSession();
      completeFullSession(); // full session only when seconds reaches zero,
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
      JSON.parse(localStorage.getItem("fullSessions")) || 0; // if local storage is empty null is returned so ass a fallback 0 is there in or

    // Increment the fullSessions count
    const updatedFullSessions = fullSessionsFromStorage + 1;

    // Update state and local storage with the updated fullSessions count
    setFullSessions(updatedFullSessions);
    localStorage.setItem("fullSessions", JSON.stringify(updatedFullSessions));
  }

  function completeSession() {
    const sessionDuration = settings.workValue * 60 - secondsLeftRef.current;
    // check to see if stop is pressed when before timer is started
    if (sessionDuration === 0) {
      return;
    } else {
      // Retrieve existing completed sessions from local storage
      const sessionsFromStorage =
        JSON.parse(localStorage.getItem("completedSessions")) || []; // if local storage is empty null is returned so ass a fallback [] empty array is there in or

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
    setSecondsLeft(settings.workValue * 60); // after timer is completed, agains sets secondsLeft to value from slider
    secondsLeftRef.current = settings.workValue * 60;
  }

  // can't use state variables here because multiple state updates together, causing unexpected behavior in timer logic
  // useRef hook  maintain mutable references that persist across re-renders without causing re-renders themselves
  // like the isPaused will use it's initial value, even if i change it's state with setState
  // so we have to use the ref variables

  useEffect(() => {
    initTimer();
    const interval = setInterval(() => {
      if (!isPausedRef.current) {
        tick();
      }
    }, 100);

    return () => clearInterval(interval);
  }, [settings]); // depends on settings context, matlab if settings changes the work minutes, iniit timer is run again, initialising the timer with new values from the slider

  const totalSeconds = settings.workValue * 60;
  const percentage = Math.round((secondsLeft / totalSeconds) * 100); // keeps changing as it is using secondsLeft state

  const minutes = Math.floor(secondsLeft / 60); // 73/60 gives 1.something floor will return 1 ceil gives 2
  let seconds = secondsLeft % 60; // 73 gives 13 so 1:13 but 63 gives 3 so 1:3 which isn't the right format for "03"
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
          pathColor: "#2ad567",
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
