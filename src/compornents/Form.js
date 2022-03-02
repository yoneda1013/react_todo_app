import React from "react";

import { useState, useEffect } from "react";
import { db } from "../firebase/firebase.js";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { Title } from "./Title.js";
import { useParams } from "react-router-dom";


export const Form = ({
  cmykText,
  onChangeCmykText,
  tonboText,
  onChangeTonboText,
  dataTypeText,
  onChangeDataTypeText,
  imgTypeText,
  onChangeImgTypeText,
  cmykBool,
  tonboBool,
  dataTypeBool,
  imgTypeBool,
  koritsuBool,
  onCheckCmyk,
  onCheckTonbo,
  onCheckDataType,
  onCheckImgTypeBool,
  onCheckKoritsu,
  projects,
  deadlineDate,
  urlText,
  onChangeUrlText
}) => {
  const input = document.querySelector("input");
  const params = useParams();
  // useEffect(() => {
  //   setProjectsParams(paramsId);
  // }, []);
  

  return (
    <>
      <div className="ItemList">
        <div className="CheckList">
          <h2>入稿前チェックリスト</h2>
          <ul>
            <li>
              <label className="checkBox">
                <input
                  type="checkbox"
                  checked={cmykBool}
                  onClick={onCheckCmyk}
                />
                <span>カラーモード</span>
              </label>

              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="RGB/CMYK"
                  value={cmykText}
                  onChange={onChangeCmykText}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={tonboBool}
                  onClick={onCheckTonbo}
                />

                <span>トンボ形式</span>
              </label>
              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="アリ / ナシ"
                  value={tonboText}
                  onChange={onChangeTonboText}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={dataTypeBool}
                  onClick={onCheckDataType}
                />

                <span>データ形式</span>
              </label>
              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="ai / PDF / psd"
                  value={dataTypeText}
                  onChange={onChangeDataTypeText}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={imgTypeBool}
                  onClick={onCheckImgTypeBool}
                />

                <span>画像</span>
              </label>
              <div className="CheckListInput">
                <input
                  type="text"
                  placeholder="リンク / 埋め込み"
                  value={imgTypeText}
                  onChange={onChangeImgTypeText}
                />
              </div>
            </li>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={koritsuBool}
                  onClick={onCheckKoritsu}
                />

                <span>孤立点</span>
              </label>
            </li>
          </ul>
        </div>

        <div className="URL">
          <h2>入稿所URL</h2>
          <textarea type="text" placeholder="URL" value={urlText} onChange={onChangeUrlText}
          />
        </div>
      </div>
    </>
  );
};
