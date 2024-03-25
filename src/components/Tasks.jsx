import React from "react";
import { Calendar } from "@/components/ui/calendar";
import TodoInput from "./components/todoinput";

const Tasks = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-8 border h-[485px] w-[900px] mr-10 pl-8 pr-8 mt-11 rounded-2xl shadow-lg bg-white">
      <h1 className="text-5xl justify-start self-start">Hi Suhayb</h1>

      <div className="flex flex-row gap-8  w-full">
        <Calendar
          selected={date}
          onSelect={setDate}
          mode="single"
          className="rounded-2xl shadow-lg border w-fit self-end"
        />
        <div className="flex flex-col w-full justify-center items-end flex-wrap  gap-4">
          <h1 className="text-4xl mb-4">Things To Do</h1>
          <TodoInput placeholder="Task"></TodoInput>
          <TodoInput></TodoInput>
          <TodoInput></TodoInput>
          <TodoInput></TodoInput>
          <TodoInput></TodoInput>
          <TodoInput></TodoInput>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
