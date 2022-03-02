import React, { useState, useContext, useEffect } from "react";
import { Header } from "./Header";
import { Title } from "./Title";
import { Deadline } from "./Deadline";
import { Form } from "./Form";
import { SaveBtn } from "./SaveBtn";
import { AuthContext } from "../auth/AuthProvider";
import "firebase/firestore";
import { db } from "../firebase/firebase";
import DatePicker, { CalendarContainer } from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

export const Home = ({
  projects,
  title,
  onChangeCmykText,
  onChangeTonboText,
  onChangeDataTypeText,
  onChangeImgTypeText,
  cmykInput,
  tonboInput,
  dataTypeInput,
  imgTypeInput,
  koritsuInput,
  onCheckCmyk,
  onCheckTonbo,
  onCheckDataType,
  onCheckImgTypeInput,
  onCheckKoritsu,
  onChangeTitle,
  onClickAdd,
  deadlineDate,
  setDeadlineDate,
  urlText,
  onChangeUrlText,
  cmykText,
  tonboText,
  dataTypeText,
  imgTypeText
}) => {
  const { currentUser } = useContext(AuthContext);

  const handleChange = (deadlineDate) =>{
    setDeadlineDate(deadlineDate)
  }
 
  return (
    <>
      <Header />
      <Title title={title} onChangeTitle={onChangeTitle} />
      <div className="deadline">
        <label>入稿締切</label>
        <DatePicker
          className="DatePicker"
          value={
            new Date(deadlineDate)
            // parseAsMoment(deadlineDate).format("YYYY/MM/DD")
          }
          selected={deadlineDate}
          onChange={(deadlineDate) => setDeadlineDate(deadlineDate)}
        />
      </div>
      {/* datepickerはコンポーネントを分けるとinvalid timeのエラーが出てしまうので、Homeへ移動にした */}
      <Form
        projects={projects}
        title={title}
        onChangeCmykText={onChangeCmykText}
        onChangeTonboText={onChangeTonboText}
        onChangeDataTypeText={onChangeDataTypeText}
        onChangeImgTypeText={onChangeImgTypeText}
        cmykInput={cmykInput}
        tonboInput={tonboInput}
        dataTypeInput={dataTypeInput}
        imgTypeInput={imgTypeInput}
        koritsuInput={koritsuInput}
        onCheckCmyk={onCheckCmyk}
        onCheckTonbo={onCheckTonbo}
        onCheckDataType={onCheckDataType}
        onCheckImgTypeInput={onCheckImgTypeInput}
        onCheckKoritsu={onCheckKoritsu}
        deadlineDate={deadlineDate}
        setDeadlineDate={setDeadlineDate}
        urlText={urlText}
        onChangeUrlText={onChangeUrlText}
        cmykText={cmykText}
        tonboText={tonboText}
        dataTypeText={dataTypeText}
        imgTypeText={imgTypeText}
      />
      <SaveBtn onClickAdd={onClickAdd} />
    </>
  );
};
