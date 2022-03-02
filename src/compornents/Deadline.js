import React from "react";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import moment from "moment";
import "firebase/firestore";


export const Deadline = () => {
  
  const [deadlineDate, setDeadlineDate] = useState(new Date());
  
  const handleChange = (deadlineDate) =>{
    setDeadlineDate(deadlineDate)
  }
  
  return (
    <div className="deadline">
      <label>入稿締切</label>
      <DatePicker
        className="DatePicker"
        value={
          deadlineDate
        //   // parseAsMoment(deadlineDate).format("YYYY/MM/DD")
        }
        selected={deadlineDate}
        onChange={handleChange}
      />
    </div>
  );
};
