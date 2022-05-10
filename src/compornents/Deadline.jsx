import React from "react";
import DatePicker from "react-datepicker";
import styled from "styled-components";

const Wrapper = styled.div`
  margin: 3.5vh 15% 0 15%;
  display: flex;
`;
const Label = styled.label`
  width: 7%;
`;

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
