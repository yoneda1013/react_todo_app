import React from "react";
import { useState, useEffect } from "react";
import { db } from "../firebase/firebase.js";
import { collection, getDocs, QuerySnapshot } from "firebase/firestore";
import { Title } from "./Title.js";

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
  // console.log(cmykText);
  //ここがundefined
 
  return (
    <>    
    {projects.map((row,index) =>{
      <ul key={index}>
        <li>
          {projects.title}
        </li>
      </ul>
    })}
      <div className="ItemList">
        <div className="CheckList">
          <h2>入稿前チェックリスト</h2>
          <ul>
            <li>
              <label>
                <input
                  type="checkbox"
                  checked={cmykBool}
                  onClick={onCheckCmyk}
                />
                カラーモード
              </label>
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
                トンボ形式
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
                データ形式
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
                画像
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
                孤立点
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
