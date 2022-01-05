import React from 'react';
import DatePicker, { CalendarContainer } from "react-datepicker"
import "react-datepicker/dist/react-datepicker.css"
import {useState} from 'react';

export const Deadline = () => {
    const[deadlineDate, setDeadlineDate] = useState(new Date());
    
    return (
    <div className='deadline'>
      <label>
      <p>deadline</p>
      <DatePicker selected={deadlineDate} onChange ={(date) =>setDeadlineDate(date)}/>
      </label>
    </div>
    );
  }
