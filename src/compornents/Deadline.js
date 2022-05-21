import React from "react";
import DatePicker from "react-datepicker";

export const Deadline = (deadlineDate, onChange) => {
  return (
    <Wrapper>
      <Label>入稿締切</Label>
      <DatePicker
        className="DatePicker"
        value={deadlineDate}
        selected={deadlineDate}
        onChange={onChange}
      />
    </Wrapper>
  );
};
