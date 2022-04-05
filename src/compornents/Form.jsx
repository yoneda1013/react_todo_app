import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import firebase from "firebase/compat/app";

import { SaveBtn } from "./SaveBtn";
import { Title } from "./Title";
import { db } from "../firebase/firebase";
import { AuthContext } from "../auth/AuthProvider";
import { ProjectContext } from "../contexts/ProjectContext";
import { useParams } from "react-router-dom";

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
  cmykTextHasError: false,
  cmykTextTouched: false,
  tonboTextHasError: false,
  tonboTextTouched: false,
  dataTypeTextHasError: false,
  dataTypeTextTouched: false,
  imgTypeTextHasError: false,
  imTypeTextTouched: false,
  urlTextHasError: false,
  urlTextTouched: false,
  createdAt: firebase.firestore.FieldValue.serverTimestamp(),
};

export const Form = ({}) => {
  const { currentUser } = useContext(AuthContext);
  const { projects, setProjects } = useContext(ProjectContext);

  let { id } = useParams();

  const targetProject = id && projects.find((v) => v.id === id);

  const [formState, setFormState] = useState(
    id
      ? {
          title: targetProject.title,
          cmykText: targetProject.cmykText,
          tonboText: targetProject.tonboText,
          dataTypeText: targetProject.dataTypeText,
          imgTypeText: targetProject.imgTypeText,
          urlText: targetProject.urlText,
          deadlineDate: targetProject.deadlineDate.toDate(),
          cmykBool: targetProject.cmykBool,
          tonboBool: targetProject.tonboBool,
          dataTypeBool: targetProject.dataTypeBool,
          imgTypeBool: targetProject.imgTypeBool,
          koritsuBool: targetProject.koritsuBool,
          createdAt: targetProject.createdAt.toDate(),
          cmykTextHasError: false,
          cmykTextTouched: false,
          tonboTextHasError: false,
          tonboTextTouched: false,
          dataTypeTextHasError: false,
          dataTypeTextTouched: false,
          imgTypeTextHasError: false,
          imTypeTextTouched: false,
          urlTextHasError: false,
          urlTextTouched: false,
        }
      : initialFormData
  );

  const isEdit = id !== undefined;

  const handleTitleChange = (event) =>
    setFormState((prev) => ({ ...prev, title: event.target.value }));

  const handleDatePickerChange = (date) =>
    setFormState((prev) => ({ ...prev, deadlineDate: date }));

  const handleCmykCheckChange = () =>
    setFormState((prev) => ({ ...prev, cmykBool: !prev.cmykBool }));

  const handleCmykTextChange = (event) => {
    let cmykTextHasError = false;
    if (event.target.value != "RGB" && event.target.value != "CMYK") {
      cmykTextHasError = true;
    } else {
      cmykTextHasError = false;
    }
    setFormState((prev) => ({
      ...prev,
      cmykText: event.target.value,
      cmykTextHasError,
    }));
  };

  const blurCmykHandler = () => {
    setFormState((prev) => ({
      ...prev,
      cmykTextTouched: true,
    }));
  };

  const handleTonboCheckChange = () =>
    setFormState((prev) => ({ ...prev, tonboBool: !prev.tonboBool }));

  const handleTonboTextChange = (event) => {
    let tonboTextHasError = false;
    if (event.target.value != "アリ" && event.target.value != "ナシ") {
      tonboTextHasError = true;
    } else {
      tonboTextHasError = false;
    }
    setFormState((prev) => ({
      ...prev,
      tonboText: event.target.value,
      tonboTextHasError,
    }));
  };

  const blurTonboHandler = () => {
    setFormState((prev) => ({ ...prev, tonboTextTouched: true }));
  };

  const handleDataTypeChange = () =>
    setFormState((prev) => ({ ...prev, dataTypeBool: !prev.dataTypeBool }));

  const handleDataTypeTextChange = (event) => {
    let dataTypeTextHasError = false;
    if (
      event.target.value != "ai" &&
      event.target.value != "PDF" &&
      event.target.value != "psd"
    ) {
      dataTypeTextHasError = true;
    } else {
      dataTypeTextHasError = false;
    }
    setFormState((prev) => ({
      ...prev,
      dataTypeText: event.target.value,
      dataTypeTextHasError,
    }));
  };
  const blurDataTypeHandler = () => {
    setFormState((prev) => ({ ...prev, dataTypeTextTouched: true }));
  };

  const handleImgTypeChange = () =>
    setFormState((prev) => ({ ...prev, imgTypeBool: !prev.imgTypeBool }));

  const handleImgTypeTextChange = (event) => {
    let imgTypeTextHasError = false;
    if (event.target.value != "リンク" && event.target.value != "埋め込み") {
      imgTypeTextHasError = true;
    } else {
      imgTypeTextHasError = false;
    }
    setFormState((prev) => ({
      ...prev,
      imgTypeText: event.target.value,
      imgTypeTextHasError,
    }));
  };
  const blurImgTypeHandler = () => {
    setFormState((prev) => ({ ...prev, imgTypeTextTouched: true }));
  };

  const handleKoritsuCheckChange = () =>
    setFormState((prev) => ({ ...prev, koritsuBool: !prev.koritsuBool }));

  const handleUrlTextChange = (event) => {
    let urlTextHasError = false;
    if (event.target.value.size > 50) {
      urlTextHasError = true;
    } else {
      urlTextHasError = false;
    }
    setFormState((prev) => ({
      ...prev,
      urlText: event.target.value,
      urlTextHasError,
    }));
  };
  const urlTextTypeHandler = () => {
    setFormState((prev) => ({ ...prev, urlTextTouched: true }));
  };
  console.log(formState.deadlineDate);
  console.log(projects);
  const onClickAdd = () => {
    if (30 < formState.title.length) {
      alert("正しい値を入力してください");
    } else {
      alert("保存が完了しました！");

      const docRef = isEdit
        ? db.collection("projects").doc(targetProject.id)
        : db.collection("projects").doc();

      docRef.set({
        uid: currentUser.uid,
        ...formState,
      });

      const copyProjects = Object.assign([], projects);
      //ネスト構造を持つオブジェクトなので浅いコピーではなく深いコピーが必要
      if (isEdit) {
        copyProjects.find((v) => v.id === id).title = formState.title;
        copyProjects.find((v) => v.id === id).cmykText = formState.cmykText;
        copyProjects.find((v) => v.id === id).tonboText = formState.tonboText;
        copyProjects.find((v) => v.id === id).dataTypeText =
          formState.dataTypeText;
        copyProjects.find((v) => v.id === id).imgTypeText =
          formState.imgTypeText;
        copyProjects.find((v) => v.id === id).urlText = formState.urlText;
        copyProjects.find((v) => v.id === id).cmykBool = formState.cmykBool;
        copyProjects.find((v) => v.id === id).tonboBool = formState.tonboBool;
        copyProjects.find((v) => v.id === id).dataTypeBool =
          formState.dataTypeBool;
        copyProjects.find((v) => v.id === id).imgTypeBool =
          formState.imgTypeBool;
        copyProjects.find((v) => v.id === id).koritsuBool =
          formState.koritsuBool;

        copyProjects.find((v) => v.id === id).deadlineDate =
          formState.deadlineDate;

        // console.log(
        //   "変更前",
        //   copyProjects.find((v) => v.id === id).deadlineDate
        // );
        // console.log("変更後", formState.deadlineDate);
        // // console.log(
        // //   "変更前",
        // //   copyProjects.find((v) => v.id === id).deadlineDate.toDate()
        // // );
        // console.log(copyProjects);
        setProjects(copyProjects);
      } else {
        copyProjects.unshift(formState);
        setProjects(copyProjects);
      }
    }
  };

  return (
    <>
      <Title title={formState.title} onChangeTitle={handleTitleChange} />

      <div className="deadline">
        <label>入稿締切</label>
        <DatePicker
          className="DatePicker"
          value={formState.deadlineDate}
          selected={formState.deadlineDate}
          onChange={handleDatePickerChange}
        />
      </div>
      <div className="itemList">
        <div className="checkList">
          <h2>入稿前チェックリスト</h2>
          <ul>
            <li>
              <div className="checkListItem">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    checked={formState.cmykBool}
                    onChange={handleCmykCheckChange}
                  />
                  <span>カラーモード</span>
                </label>

                <div className="checkListInput Input">
                  <input
                    type="text"
                    placeholder="RGB/CMYK"
                    value={formState.cmykText}
                    onChange={handleCmykTextChange}
                    onBlur={blurCmykHandler}
                  />
                </div>
              </div>
              {formState.cmykTextTouched && formState.cmykTextHasError && (
                <div className="errorMessage">
                  <span>カラーモードを入力してください</span>
                </div>
              )}
            </li>

            <li>
              <div className="checkListItem">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    checked={formState.tonboBool}
                    onChange={handleTonboCheckChange}
                  />
                  <span>トンボ形式</span>
                </label>
                <div className="checkListInput Input">
                  <input
                    type="text"
                    placeholder="アリ / ナシ"
                    value={formState.tonboText}
                    onChange={handleTonboTextChange}
                    onBlur={blurTonboHandler}
                  />
                </div>
              </div>
              {formState.tonboTextTouched && formState.tonboTextHasError && (
                <div className="errorMessage">
                  <span>トンボの有無を入力してください</span>
                </div>
              )}
            </li>

            <li>
              <div className="checkListItem">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    checked={formState.dataTypeBool}
                    onChange={handleDataTypeChange}
                  />
                  <span>データ形式</span>
                </label>
                <div className="checkListInput Input">
                  <input
                    type="text"
                    placeholder="ai / PDF / psd"
                    value={formState.dataTypeText}
                    onChange={handleDataTypeTextChange}
                    onBlur={blurDataTypeHandler}
                  />
                </div>
              </div>
              {formState.dataTypeTextTouched && formState.dataTypeTextHasError && (
                <div className="errorMessage">
                  <span>指定の拡張子を入力してください</span>
                </div>
              )}
            </li>

            <li>
              <div className="checkListItem">
                <label className="checkBox">
                  <input
                    type="checkbox"
                    checked={formState.imgTypeBool}
                    onChange={handleImgTypeChange}
                  />

                  <span>画像</span>
                </label>
                <div className="checkListInput Input">
                  <input
                    type="text"
                    placeholder="リンク / 埋め込み"
                    value={formState.imgTypeText}
                    onChange={handleImgTypeTextChange}
                    onBlur={blurImgTypeHandler}
                  />
                </div>
              </div>
              {formState.imgTypeTextTouched && formState.imgTypeTextHasError && (
                <div className="errorMessage">
                  <span>画像の扱いを入力してください</span>
                </div>
              )}
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

        <div className="url Input">
          <h2>入稿所URL（50字以内）</h2>
          <textarea
            type="text"
            placeholder="URL"
            value={formState.urlText}
            onChange={handleUrlTextChange}
            onBlur={urlTextTypeHandler}
          />
          {formState.urlTextTouched && formState.urlTextHasError && (
            <div className="errorMessage">
              <span>正しいURLを入力してください</span>
            </div>
          )}
        </div>
      </div>

      <SaveBtn onClickAdd={onClickAdd}>{isEdit ? "変更保存" : "保存"}</SaveBtn>
    </>
  );
};
