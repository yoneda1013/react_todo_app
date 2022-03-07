import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import firebase from "firebase/compat/app";

import { SaveBtn } from "./SaveBtn";
import { Title } from "./Title";
import { db } from "../firebase/firebase";
import { AuthContext } from "../auth/AuthProvider";

const initialFormData = {
  title: "",
  cmykText: "",
  tonboText: "",
  dataTypeText: "",
  imgTypeText: "",
  urlText: "",
  deadlineDate: new Date(),
  cmykBool: false,
  tonboBool: false,
  dataTypeBool: false,
  imgTypeBool: false,
  koritsuBool: false,
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
};

export const Form = ({ project }) => {
  const { currentUser } = useContext(AuthContext);
  const [formState, setFormState] = useState(
    project
      ? {
          title: project.title,
          cmykText: project.cmykText,
          tonboText: project.tonboText,
          dataTypeText: project.dataTypeText,
          imgTypeText: project.imgTypeText,
          urlText: project.urlText,
          deadlineDate: project.deadlineDate.toDate(),
          cmykBool: project.cmykBool,
          tonboBool: project.tonboBool,
          dataTypeBool: project.dataTypeBool,
          imgTypeBool: project.imgTypeBool,
          koritsuBool: project.koritsuBool,
          createdAt: project.createdAt.toDate(),
        }
      : initialFormData
  );

  const [errorMessage, setErrorMessage] = useState({
    title: "",
    cmykText: "",
    tonboText: "",
    dataTypeText: "",
    imgTypeText: "",
    urlText: "",
  });

  const validationErrors = {
    //Possible errors and their corresponding error messages.
    userName: {
      tooShort: "User Name should be atleast 6 characters",
      patternMismatch: "User Name can only have alphabets",
      valueMissing: "User Name is required",
    },
    email: {
      typeMismatch: "Please enter a valid email",
      patternMismatch: "Please enter a valid email",
      valueMissing: "Email is required",
    },
    age: {
      rangeUnderflow: "User under 18 cannot sign up",
      valueMissing: "Age is required",
    },
    password: {
      tooShort: "Password should be atlease 8 characters",
      patternMismatch:
        "Password should have atleast one uppercase character, one lowercase character and a number",
      valueMissing: "Password is required",
    },
  };

  const onBlurValidation = (event) => {
    const validity = event.target.validity;
    if (validity.valid !== true) {
      for (let errorKey in validity) {
        if (validity[errorKey]) {
          setErrorMessage({
            ...errorMessage,
            [event.target.name]: validationErrors[event.target.name][errorKey],
          });
        }
      }
    } else {
      setErrorMessage({
        ...errorMessage,
        [event.target.name]: "",
      });
    }
  };

  const validationForm = () => {
    const errors = {};
    if (!formState.title) {
      errors.title = "titleを入力してください";
    } else if (formState.title.length > 30) {
      errors.title = "titleは30文字以内で入力してください";
      console.log(errors.title);
    }
    return errors;
  };
  // console.log(validationForm());

  const isEdit = project !== undefined;

  const handleTitleChange = (event) =>
    setFormState((prev) => ({ ...prev, title: event.target.value }));

  const handleDatePickerChange = (date) =>
    setFormState((prev) => ({ ...prev, deadlineDate: date }));

  const handleCmykCheckChange = () =>
    setFormState((prev) => ({ ...prev, cmykBool: !prev.cmykBool }));

  const handleCmykTextChange = (event) =>
    setFormState((prev) => ({ ...prev, cmykText: event.target.value }));

  const handleTonboCheckChange = () =>
    setFormState((prev) => ({ ...prev, tonboBool: !prev.tonboBool }));

  const handleTonboTextChange = (event) =>
    setFormState((prev) => ({ ...prev, tonboText: event.target.value }));

  const handleDataTypeChange = () =>
    setFormState((prev) => ({ ...prev, dataTypeBool: !prev.dataTypeBool }));

  const handleDataTypeTextChange = (event) =>
    setFormState((prev) => ({ ...prev, dataTypeText: event.target.value }));

  const handleImgTypeChange = () =>
    setFormState((prev) => ({ ...prev, imgTypeBool: !prev.imgTypeBool }));

  const handleImgTypeTextChange = (event) =>
    setFormState((prev) => ({ ...prev, imgTypeText: event.target.value }));

  const handleKoritsuCheckChange = () =>
    setFormState((prev) => ({ ...prev, koritsuBool: !prev.koritsuBool }));

  const handleUrlTextChange = (event) =>
    setFormState((prev) => ({ ...prev, urlText: event.target.value }));

  const onClickAdd = () => {
    if (
      30 < formState.title.length ||
      formState.cmykText == "" ||
      formState.tonboBool == "" ||
      formState.dataTypeText == "" ||
      formState.imgTypeText == ""
    ) {
      alert("正しい値を入力してください");
    } else {
      alert("保存が完了しました！");
      const docRef = project
        ? db.collection("projects").doc(project.id)
        : db.collection("projects").doc();
      docRef.set({
        uid: currentUser.uid,
        ...formState,
      });
    }
  };

  // const submitItemHandler = (e) => {
  //   e.preventDefault();
  //   if (30 < formState.title.length || formState.cmykText == "")
  //     alert("正しい値を入力してください");
  // };
  //validation 文字数 入力できる内容

  return (
    <>
      <Title
        title={formState.title}
        onChangeTitle={handleTitleChange}
        validationForm={validationForm}
        errorMessage={errorMessage}
        onBlurValidation={onBlurValidation}
        validationErrors={validationErrors}
      />

      <div className="deadline">
        <label>入稿締切</label>
        <DatePicker
          className="DatePicker"
          value={formState.deadlineDate}
          selected={formState.deadlineDate}
          onChange={handleDatePickerChange}
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
                  checked={formState.cmykBool}
                  onChange={handleCmykCheckChange}
                />
                <span>カラーモード</span>
              </label>

              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="RGB/CMYK"
                  value={formState.cmykText}
                  onChange={handleCmykTextChange}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={formState.tonboBool}
                  onChange={handleTonboCheckChange}
                />

                <span>トンボ形式</span>
              </label>
              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="アリ / ナシ"
                  value={formState.tonboText}
                  onChange={handleTonboTextChange}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={formState.dataTypeBool}
                  onChange={handleDataTypeChange}
                />
                <span>データ形式</span>
              </label>
              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="ai / PDF / psd"
                  value={formState.dataTypeText}
                  onChange={handleDataTypeTextChange}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={formState.imgTypeBool}
                  onChange={handleImgTypeChange}
                />

                <span>画像</span>
              </label>
              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="リンク / 埋め込み"
                  value={formState.imgTypeText}
                  onChange={handleImgTypeTextChange}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={formState.koritsuBool}
                  onChange={handleKoritsuCheckChange}
                />

                <span>孤立点</span>
              </label>
            </li>
          </ul>
        </div>

        <div className="URL">
          <h2>入稿所URL</h2>
          <textarea
            type="text"
            placeholder="URL"
            value={formState.urlText}
            onChange={handleUrlTextChange}
          />
        </div>
      </div>

      <SaveBtn onClickAdd={onClickAdd}>{isEdit ? "変更保存" : "保存"}</SaveBtn>
    </>
  );
};
