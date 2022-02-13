import React from 'react';
import {useState} from 'react';
import { db } from "../firebase/firebase.js"
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore';

export const ItemList =({cmykText, onChangeCmykText, tonboText, onChangeTonboText, dataTypeText, onChangeDataTypeText, imgTypeText, onChangeImgTypeText, cmykInput, tonboInput, dataTypeInput, imgTypeInput, checkInput}) =>{

    const input = document.querySelector('input');
    console.log(cmykText);
    //ここがundefined
    return(
        <>
        <div className='ItemList'>
        <div className='CheckList'>
        <h2>入稿前チェックリスト</h2>
        <ul>
            <li>
            <label>
            <input type='checkbox' value='カラーモード' checked={cmykInput} />
            カラーモード
            </label>
            <div className='CheckListInput'>
            <input
            placeholder="RGB/CMYK"
            value={cmykText} 
            onChange={onChangeCmykText} 
            onKeyPress={ (event) => 
                {if(event.key == 'Enter'){
                    alert(`カラーモードは${cmykText}です`)
                }}}
            />
            </div>
            </li>
            <li>
            <label>
            <input
            type='checkbox'
            value='トンボ形式'
            />
            トンボ形式
            </label>
            <div className='CheckListInput'>
            <input 
            placeholder="アリ / ナシ" 
            value={tonboText} 
            disabled ={ (event) =>{
                if(event.key === 'Enter'){
                    return 'true'
                }}
            }
            onChange={onChangeTonboText} 
            onKeyPress={ (event) => 
                {if(event.key == 'Enter'){
                    alert(`カラーモードは${cmykText}です`)
                    const validtonboText = () =>{
                    input.disabled = true;
                    }
                }}}
            />
            </div>
            </li>
            <li>
            <label>
            <input
            type='checkbox'
            value='データ形式'
            />
            データ形式
            </label>
            <div className='CheckListInput'>
            <input 
            placeholder="ai / PDF / psd" 
            value={dataTypeText} 
            disabled ={ (event) =>{
                if(event.key === 'Enter'){
                    return 'true'
                }}
            }
            onChange={onChangeDataTypeText} 
            onKeyPress={ (event) => 
                {if(event.key == 'Enter'){
                    alert(`カラーモードは${dataTypeText}です`)
                    const validCmylText = () =>{
                    input.disabled = true;
                    }    
                }}}
            />
            </div>  
            </li>
            <li>
            <label>
            <input
            type='checkbox'
            value='データ形式'
            />
            孤立点
            </label>
            </li>
            <li>
            <label>
            <input
            type='checkbox'
            value='画像'
            />
            画像
            </label>
            <div className='CheckListInput'>
            <input 
            placeholder="リンク / 埋め込み" 
            value={imgTypeText} 
            disabled ={ (event) =>{
                if(event.key === 'Enter'){
                    return 'true'
                }}
            }
            onChange={onChangeImgTypeText} 
            onKeyPress={ (event) => 
                {if(event.key == 'Enter'){
                    alert(`カラーモードは${imgTypeText}です`)
                    const validImgText = () =>{
                    input.disabled = true;
                    }    
                }}}
            />
            </div>        
            </li>
        </ul>    
        </div>

        <div className='MemoList'>
        <h2>備考</h2>
        <textarea name="memo" cols="30" row="5" type="text"></textarea>
        </div>
        </div>
        </>
    );
}