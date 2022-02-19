import React from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";

export const Deadline = () => {
  const [deadlineDate, setDeadlineDate] = useState(new Date());

  return (
    <div className="deadline">
      <label>入稿締切</label>
      <DatePicker
        className="DatePicker"
        value={deadlineDate}
        selected={deadlineDate}
        onChange={(date) => setDeadlineDate(date)}
      />
    </div>
  );
};
