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
}) => {
  const input = document.querySelector("input");
  const params = useParams();
  console.log(projects[params.id]);
  //projects[params.id]がundefinedの時は新規作成。projects[params.id]がtrueの時はmap。
  // console.log(projects[params.id].title)
  return (
    <>
      <div></div>
      <div className="ItemList">
        <div className="CheckList">
          <h2>入稿前チェックリスト</h2>
          <ul>
            <li>
              {projects[params.id] && (
                <>
                  <label>
                    <input
                      type="checkbox"
                      checked={cmykBool}
                      onClick={onCheckCmyk}
                    />
                    <span>カラーモード</span>
                  </label>
                </>
              )}

              <div className="CheckListInput">
                <input
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

        <div className="MemoList">
          <h2>入稿所URL</h2>
          <textarea name="url" cols="30" row="5" type="text"></textarea>
        </div>
      </div>
    </>
  );
};
