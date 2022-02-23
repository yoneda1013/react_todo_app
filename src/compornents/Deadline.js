import React from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import moment from 'moment';

export const Deadline = (deadlineDate, setDeadlineDate) => {
  
  // const [deadlineDate, setDeadlineDate] = useState(initialDate);
  const handleChange = (date) =>{
    setDeadlineDate(date)
  }
  const parseAsMoment = (dateTimeStr) => {
    return moment.utc(dateTimeStr, 'YYYY-MM-DD').utcOffset(9)}
    console.log(parseAsMoment(deadlineDate).format("YYYY/MM/DD"));
    // ここまではOK
    //App.js（親要素）で反映されていないのはuseStateをdeadlineで管理してしまっているから
  return (
    <div className="deadline">
      <label>入稿締切</label>
      <DatePicker
        className="DatePicker"
        value={parseAsMoment(deadlineDate).format("YYYY/MM/DD")}
        selected={deadlineDate}
        onChange = {() =>handleChange}
      />
    </div>
  );
};
