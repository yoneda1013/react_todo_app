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
  // const { currentUser } = useContext(AuthContext);

  // const docId = Math.random().toString(32).substring(2);
  // //dicIdをこちらで作成する
  // //Titleに文字を入力
  // const onChangeTitle = (event) => setTitle(event.target.value);
  // const onClickAdd = () => {
  //   alert("保存が完了しました！");
  //   console.log(db.collection("projects"));
  //   db.collection("projects").doc(docId).set({
  //     uid: currentUser.uid,
  //     title,
  //     cmykText,
  //     tonboText,
  //     dataTypeText,
  //     imgTypeText,
  //     cmykInput,
  //     tonboInput,
  //     dataTypeInput,
  //     imgTypeInput,
  //     koritsuInput,
  //   });
  // };

  // const onClickDelete = () => {
  //   db.collection("projects").doc(docId).delete();
  // };

  // const [cmykText, setCmykText] = useState("");
  // const onChangeCmykText = (event) => setCmykText(event.target.value);
  // const [tonboText, setTonboText] = useState("");
  // const onChangeTonboText = (event) => setTonboText(event.target.value);
  // const [dataTypeText, setDataTypeText] = useState("");
  // const onChangeDataTypeText = (event) => setDataTypeText(event.target.value);
  // const [imgTypeText, setImgTypeText] = useState("");
  // const onChangeImgTypeText = (event) => setImgTypeText(event.target.value);
  // const [cmykInput, setCmykInput] = useState(false);
  // const [tonboInput, setTonboInput] = useState(false);
  // const [dataTypeInput, setDataTypeInput] = useState(false);
  // const [imgTypeInput, setImgTypeInput] = useState(false);
  // const [koritsuInput, setKoritsuInput] = useState(false);

  // // const onClickCheck = (event) => setCmykInput(event.target.value);

  // const onCheckCmyk = (event) => setCmykInput(!cmykInput);
  // const onCheckTonbo = (event) => setTonboInput(!tonboInput);
  // const onCheckDataType = (event) => setDataTypeInput(!dataTypeInput);
  // const onCheckImgTypeInput = (event) => setImgTypeInput(!imgTypeInput);
  // const onCheckKoritsu = (event) => setKoritsuInput(!koritsuInput);

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
      {/* <Deadline deadlineDate={deadlineDate} setDeadlineDate={setDeadlineDate} /> */}
      {/* RangeError: invalid dateの原因は多分↑ */}
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
