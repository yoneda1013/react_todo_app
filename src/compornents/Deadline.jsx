import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

export const Deadline = (deadlineDate, onChange) => {
  return (
    // <div className="deadline"></div>
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
