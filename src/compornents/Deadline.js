import React from "react";
import DatePicker from "react-datepicker";

export const Deadline = (deadlineDate, onChange) => {
  return (
    <div className="deadline">
      <label>入稿締切</label>
      <DatePicker
        className="DatePicker"
        value={deadlineDate}
        selected={deadlineDate}
        onChange={onChange}
      />
    </div>
  );
};
