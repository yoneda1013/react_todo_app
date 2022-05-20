import React, { useContext, useState } from "react";
import DatePicker from "react-datepicker";
import firebase from "firebase/compat/app";

import { SaveBtn } from "./SaveBtn";
import { Title } from "./Title";
import { db } from "../firebase/firebase";
import { AuthContext } from "../auth/AuthProvider";
import { ProjectContext } from "../contexts/ProjectContext";
import { useParams } from "react-router-dom";
import styled from "styled-components/macro";

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

export const Form = () => {
  const { currentUser } = useContext(AuthContext);
  const { projects, setProjects, isEdit, onClickUpdate, onClickAddFetch } =
    useContext(ProjectContext);

  let { id } = useParams();

  const targetProject = id && projects.find((p) => p.id === id);

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

  const handleTitleChange = (event) =>
    setFormState((prev) => ({ ...prev, title: event.target.value }));

  const handleDatePickerChange = (date) =>
    setFormState((prev) => ({ ...prev, deadlineDate: date }));

  const handleCmykCheckChange = () =>
    setFormState((prev) => ({ ...prev, cmykBool: !prev.cmykBool }));

  const handleCmykTextChange = (event) => {
    let cmykTextHasError = false;
    if (event.target.value !== "RGB" && event.target.value !== "CMYK") {
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
    if (event.target.value !== "アリ" && event.target.value !== "ナシ") {
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
      event.target.value !== "ai" &&
      event.target.value !== "PDF" &&
      event.target.value !== "psd"
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
    if (event.target.value !== "リンク" && event.target.value !== "埋め込み") {
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
      const docRef = isEdit
        ? db.collection("projects").doc(targetProject.id)
        : db.collection("projects").doc();

      const newDoc = docRef.id;

      docRef.set({
        ...formState,
        uid: currentUser.uid,
        deadlineDate: firebase.firestore.Timestamp.fromDate(
          formState.deadlineDate
        ),

        createdAt: formState.createdAt,
      });

      if (isEdit) {
        onClickUpdate();
        const index = projects.findIndex((p) => p.id === id);
        //paramsでとってきたidを持つobjの位置 pはprojects
        setProjects((prev) => {
          const projects = [...prev];

          projects[index] = {
            ...formState,
            id,
            deadlineDate: firebase.firestore.Timestamp.fromDate(
              formState.deadlineDate
            ),
            createdAt: firebase.firestore.Timestamp.fromDate(
              formState.createdAt
            ),
          };

          return projects;
        });
      } else {
        onClickAddFetch();
        const copyProjects = [...projects];

        const copyFormState = {
          ...formState,
          id: newDoc,
          deadlineDate: firebase.firestore.Timestamp.fromDate(
            formState.deadlineDate
          ),
          createdAt: firebase.firestore.Timestamp.now(),
        };

        copyProjects.unshift(copyFormState);
        setProjects(copyProjects);
      }
    }
  };

  return (
    <>
      <Title title={formState.title} onChangeTitle={handleTitleChange} />

      <DeadlineWrapper>
        <DeadlineLabel>入稿締切</DeadlineLabel>
        <DeadlineContent>
          <DatePicker
            value={formState.deadlineDate}
            selected={formState.deadlineDate}
            onChange={handleDatePickerChange}
          />
        </DeadlineContent>
      </DeadlineWrapper>
      <Wrapper>
        <div
          css="width: 40%;  
          @media screen and (max-width: 740px) {
              width:100%;
              margin-bottom: 5vh;
            } ;"
          className="checkList"
        >
          <h2>入稿前チェックリスト</h2>
          <ul css="padding: 0;">
            <List>
              <ListItem>
                <Label>
                  <input
                    type="checkbox"
                    checked={formState.cmykBool}
                    onChange={handleCmykCheckChange}
                  />
                  <span>カラーモード</span>
                </Label>

                <div
                  css="display: inline-block;
                  @media screen and (max-width: 1040px){
                  margin-bottom: 1vh;
                  width: 100%;
                }"
                >
                  <Input
                    type="text"
                    placeholder="RGB/CMYK"
                    value={formState.cmykText}
                    onChange={handleCmykTextChange}
                    onBlur={blurCmykHandler}
                  />
                </div>
              </ListItem>
              {formState.cmykTextTouched && formState.cmykTextHasError && (
                <Error>カラーモードを入力してください</Error>
              )}
            </List>

            <List>
              <ListItem>
                <Label>
                  <input
                    type="checkbox"
                    checked={formState.tonboBool}
                    onChange={handleTonboCheckChange}
                  />
                  <span>トンボ形式</span>
                </Label>
                <div
                  css="display: inline-block;
                  @media screen and (max-width: 1040px){
                  margin-bottom: 1vh;
                  width: 100%;
                }"
                >
                  <Input
                    type="text"
                    placeholder="アリ / ナシ"
                    value={formState.tonboText}
                    onChange={handleTonboTextChange}
                    onBlur={blurTonboHandler}
                  />
                </div>
              </ListItem>
              {formState.tonboTextTouched && formState.tonboTextHasError && (
                <Error>トンボの有無を入力してください</Error>
              )}
            </List>

            <List>
              <ListItem>
                <Label>
                  <input
                    type="checkbox"
                    checked={formState.dataTypeBool}
                    onChange={handleDataTypeChange}
                  />
                  <span>データ形式</span>
                </Label>
                <div
                  css="display: inline-block;
                  @media screen and (max-width: 1040px){
                  margin-bottom: 1vh;
                  width: 100%;
                }"
                >
                  <Input
                    type="text"
                    placeholder="ai / PDF / psd"
                    value={formState.dataTypeText}
                    onChange={handleDataTypeTextChange}
                    onBlur={blurDataTypeHandler}
                  />
                </div>
              </ListItem>
              {formState.dataTypeTextTouched &&
                formState.dataTypeTextHasError && (
                  <Error>指定の拡張子を入力してください</Error>
                )}
            </List>

            <List>
              <ListItem>
                <Label>
                  <input
                    type="checkbox"
                    checked={formState.imgTypeBool}
                    onChange={handleImgTypeChange}
                  />

                  <span>画像</span>
                </Label>
                <div
                  css="display: inline-block;
                  @media screen and (max-width: 1040px){
                  margin-bottom: 1vh;
                  width: 100%;
                }"
                >
                  <Input
                    type="text"
                    placeholder="リンク / 埋め込み"
                    value={formState.imgTypeText}
                    onChange={handleImgTypeTextChange}
                    onBlur={blurImgTypeHandler}
                  />
                </div>
              </ListItem>
              {formState.imgTypeTextTouched &&
                formState.imgTypeTextHasError && (
                  <Error>画像の扱いを入力してください</Error>
                )}
            </List>

            <List>
              <label>
                <input
                  type="checkbox"
                  checked={formState.koritsuBool}
                  onChange={handleKoritsuCheckChange}
                />

                <span>孤立点</span>
              </label>
            </List>
          </ul>
        </div>

        <div
          css="width: 50%;
        @media screen and (max-width: 740px) {
          width: 100%;
          margin-bottom: 1vh;
        };
        "
        >
          <h2>入稿所URL（50字以内）</h2>
          <Textarea
            type="text"
            placeholder="URL"
            value={formState.urlText}
            onChange={handleUrlTextChange}
            onBlur={urlTextTypeHandler}
          />
          {formState.urlTextTouched && formState.urlTextHasError && (
            <Error>正しいURLを入力してください</Error>
          )}
        </div>
      </Wrapper>

      <SaveBtn onClickAdd={onClickAdd}>{isEdit ? "変更保存" : "保存"}</SaveBtn>
    </>
  );
};

const DeadlineWrapper = styled.div`
  margin: 3.5vh 15% 0 15%;
  display: flex;
`;
const DeadlineLabel = styled.label`
  width: 7%;
`;

const DeadlineContent = styled.div`
  justify-content: center;
  background-color: var(--cl--gray);
  padding: 1vh;
  font-size: var(--font--size--p);
`;

const Error = styled.span`
  font-size: 1rem;
  margin-right: 0;
  text-align: right;
  display: block;
  color: red;
`;

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 4vh 15% 0 15%;
  @media screen and (max-width: 740px) {
    display: block;
  } ;
`;

const List = styled.li`
  height: 7vh;
  @media screen and (max-width: 1040px) {
    height: 8vh;
    :last-child {
      margin-bottom: 0;
      height: 2vh;
    }
  @media screen and (max-width: 740px) {
    height: 6vh;
  } ;
`;

const ListItem = styled.div`
  margin-bottom: 0.1vh;
  height: 3vh;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 1040px) {
    display: block;
    margin-bottom: 3vh;
  } ;
`;

const Label = styled.label`
  display: inline-block;
  @media screen and (max-width: 1040px) {
    width: 100%;
  } ;
`;

const Textarea = styled.textarea`
  height: 25vh;
  width: 100%;
  background-color: var(--cl--gray);
  padding: 2vh;
  @media screen and (max-width: 740px) {
    height: 10vh;
  } ;
`;

const Input = styled.input`
  font-size: var(--font--size--p);
  box-sizing: border-box;
  padding: 0.5vh;
  transition: 0.3s;
  letter-spacing: 1px;
  background-color: var(--cl--gray);
  width: 100%;
  margin-left: 2vh;
  height: 22px;
  :focus {
    border-bottom: 2px solid #000066;
    outline: none;
  }
  @media screen and (max-width: 1040px) {
    margin-left: 0;
  }
  @media screen and (max-width: 740px) {
    margin-left: 0;
  } ;
`;
