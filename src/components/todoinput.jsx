import React from "react";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";

const TodoInput = (props) => {
  return (
    <div className="flex items-center gap-3">
      <input
        type="text"
        placeholder={props.placeholder}
        className="outline-none text-xl font-light text-right w-96"
      />
      <Checkbox className="w-8 h-8" />
    </div>
  );
};

export default TodoInput;
