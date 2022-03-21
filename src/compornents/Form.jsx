import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import firebase from "firebase/compat/app";

import { SaveBtn } from "./SaveBtn";
import { Title } from "./Title";
import { db } from "../firebase/firebase";
import { AuthContext } from "../auth/AuthProvider";
import { ProjectContext } from "../contexts/ProjectContext";

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
  const { onClickUpdate } = useContext(ProjectContext);

  const isEdit = project !== undefined;

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

  const onClickAdd = () => {
    if (30 < formState.title.length) {
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
                <label>
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
                <label>
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
                <label>
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

      <SaveBtn onClickAdd={(onClickAdd, onClickUpdate)}>
        {isEdit ? "変更保存" : "保存"}
      </SaveBtn>
    </>
  );
};
