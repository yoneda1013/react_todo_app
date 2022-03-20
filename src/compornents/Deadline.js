import React from "react";
import DatePicker from "react-datepicker";
import { useState } from "react";

export const Deadline = () => {
  const [deadlineDate, setDeadlineDate] = useState(new Date());

  const handleChange = (deadlineDate) => {
    setDeadlineDate(deadlineDate);
  };

  return (
    <div className="deadline">
      <label>入稿締切</label>
      <DatePicker
        className="DatePicker"
        value={deadlineDate}
        selected={deadlineDate}
        onChange={handleChange}
      />
    </div>
  );
};
