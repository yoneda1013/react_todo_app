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
import Button from "@material-ui/core/Button";

export const Edit = ({
  title,
  projects,
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
  //   onChangeTitle,
  onClickAdd,
  deadlineDate,
  setDeadlineDate,
  cmykBool,
  cmykText,
  tonboBool,
  tonboText,
  dataTypeBool,
  dataTypeText,
  imgTypeText,
  imgTypeBool,
  koritsuBool,
  onCheckImgTypeBool
}) => {
  //pathからindexを引っ張って来る
  const pathname = window.location.pathname;
  const index = Number(pathname.slice(1));
  const { currentUser } = useContext(AuthContext);

  const initialTitleState = projects[index].title;
  const [editTitle, setEditTitle] = useState(initialTitleState);
  const onChangeEditTitle = (event) => setEditTitle(event.target.value);

  const initialDateState = projects[index].deadlineDate;
  const [date, setDate] = useState(initialDateState);
  const onChangeDate = (event) => setDate(event.target.value);
  //dateはstring。Datepickerに入れる用にobjectにする必要あり

  const initialCmykBoolState = projects[index].cmykBool;
  const [editCmykBool, setEditCmykBool] = useState(initialCmykBoolState);
  const onChangeEditCmykBool = (event) => setEditCmykBool(!editCmykBool);

  const initialCmykTextState = projects[index].cmykText;
  const [editCmykText, setEditCmykText] = useState(initialCmykTextState);
  const onChangeEditCmykText = (event) => setEditCmykText(event.target.value);

  const initialTonboBoolState = projects[index].tonboBool;
  const [editTonboBool, setEditTonboBool] = useState(initialTonboBoolState);
  const onChangeEditTonboBool = (event) => setEditTonboBool(!editTonboBool);

  const initialTonboTextState = projects[index].tonboText;
  const [editTonboText, setEditTonboText] = useState(initialTonboTextState);
  const onChangeEditTonboText = (event) => setEditTonboText(event.target.value);

  const initialDataTypeBoolState = projects[index].dataTypeBool;
  const [editDataTypeBool, setEditDataTypeBool] = useState(
    initialDataTypeBoolState
  );
  const onChangeEditDataTypeBool = (event) =>
    setEditDataTypeBool(!editDataTypeBool);

  const initialDataTypeTextState = projects[index].dataTypeText;
  const [editDataTypeText, setEditDataTypeText] = useState(
    initialDataTypeTextState
  );
  const onChangeEditDataTypeText = (event) =>
    setEditDataTypeText(event.target.value);

  const initialImgTypeBoolState = projects[index].imgTypeBool;
  const [editImgTypeBool, setEditImgTypeBool] = useState(
    initialImgTypeBoolState
  );
  const onChangeEditImgTypeBool = (event) =>
    setEditImgTypeBool(!editImgTypeBool);

  const initialImgTypeTextState = projects[index].imgTypeText;
  const [editImgTypeText, setEditImgTypeText] = useState(
    initialImgTypeTextState
  );
  const onChangeEditImgTypeText = (event) =>
    setEditImgTypeText(event.target.value);

  const initialKoritsuBoolState = projects[index].koritsuBool;
  const [editKoritsuBool, setEditKoritsuBool] = useState(
    initialKoritsuBoolState
  );
  const onChangeEditKoritsuBool = (event) =>
    setEditKoritsuBool(!editKoritsuBool);

  const initialUrlState = projects[index].urlText;
  const [editUrlText, setEditUrlText] = useState(
    initialUrlState
  );
  const onChangeEditUrlText = (event) =>
  setEditUrlText(event.target.value);

// console.log(projects[index].id);
// console.log(projects[index].title);
// console.log(editTitle);
// editTitleの内容をprojects[index].titleの項目上で更新させたい
// const userRef = db.collection('projects').doc(projects[index].id);
// console.log(userRef);
  const onClickChange = () => {
    alert("変更が完了しました！");
    db.collection("projects")
      .doc(projects[index].id)
      .update({
        // uid: currentUser.uid,
        title: (editTitle),
        //変数は()でくくる
        cmykText: (editCmykText),
        tonboText:(editCmykBool),
        dataTypeText:(editDataTypeText),
        imgTypeText:(editImgTypeText),
        urlText:(editUrlText),
        cmykBool:(editCmykBool),
        tonboBool:(editTonboBool),
        dataTypeBool:(editDataTypeBool),
        imgTypeBool:(editImgTypeBool),
        koritsuBool:(editKoritsuBool),
        deadlineDate,
        // :parseDate(deadlineDate).format("YYYY/MM/DD"),
      });
  };

  
  return (
    <>
      <Header />
      <div>
        <p></p>
        <form>
          <label htmlFor="projects" className="labelTitleInput">
            <div className="conrainerTitleInput">
              <input
                name="projects"
                type="text"
                value={editTitle}
                onChange={onChangeEditTitle}
                placeholder="案件名を入力"
                className="titleInput"
              />
            </div>
          </label>
        </form>
      </div>

      <div className="deadline">
        <label>入稿締切</label>
        <DatePicker
          className="DatePicker"
          value={
            new Date(date)
            // parseAsMoment(deadlineDate).format("YYYY/MM/DD")
          }
          selected={deadlineDate}
          onChange={(deadlineDate) => setDeadlineDate(deadlineDate)}
        />
      </div>

      <div className="ItemList">
        <div className="CheckList">
          <h2>入稿前チェックリスト</h2>
          <ul>
            <li>
              <label className="checkBox">
                <input
                  type="checkbox"
                  checked={editCmykBool}
                  onChange={onChangeEditCmykBool}
                />
                <span>カラーモード</span>
              </label>

              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="RGB/CMYK"
                  value={editCmykText}
                  onChange={onChangeEditCmykText}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={editTonboBool}
                  onChange={onChangeEditTonboBool}
                />

                <span>トンボ形式</span>
              </label>
              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="アリ / ナシ"
                  value={editTonboText}
                  onChange={onChangeEditTonboText}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={editDataTypeBool}
                  onChange={onChangeEditDataTypeBool}
                />

                <span>データ形式</span>
              </label>
              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="ai / PDF / psd"
                  value={editDataTypeText}
                  onChange={onChangeEditDataTypeText}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={editImgTypeBool}
                  onChange={onChangeEditImgTypeBool}
                />

                <span>画像</span>
              </label>
              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="リンク / 埋め込み"
                  value={editImgTypeText}
                  onChange={onChangeEditImgTypeText}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={editKoritsuBool}
                  onChange={onChangeEditKoritsuBool}
                />

                <span>孤立点</span>
              </label>
            </li>
          </ul>
        </div>

        <div className="URL">
          <h2>入稿所URL</h2>
          <textarea type="text" placeholder="URL" value={editUrlText} onChange={onChangeEditUrlText}
          />
        </div>
      </div>

      {/* <Title title={title} onChangeTitle={onChangeTitle} /> */}
      {/* <Deadline deadlineDate={deadlineDate} setDeadlineDate={setDeadlineDate} /> */}
      {/* <Form
        projects={projects}
        // title={title}
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
      /> */}
      {/* <SaveBtn onClickAdd={onClickAdd} /> */}
      <div className="SaveBtnContainer">
      <Button
        size="small"
        variant="contained"
        onClick={onClickChange}
        style={{
          margin: "5px",
          fontSize: "20px",
          padding: "0.5vh",
          color: "#FFFFFF",
          background: "#3636B3",
          "&:hover": {
            backgroundColor: "#000066",
          }
        }}
      >
        変更保存
      </Button>
    </div>
    </>
  );
};
