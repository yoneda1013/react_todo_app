import React from 'react';
import {useState} from 'react';

export const ItemList =({}) =>{
    const[ colorModeText,setColorModeText ]  = useState('RGB/CMYK');
    const [cmykText, setCmykText] = useState('');
    const onChangeCmykText = (event) => setCmykText(event.target.value);
    const input = document.querySelector('input');
    const [tonboText, setTonboText] = useState('');
    const onChangeTonboText = (event) => setTonboText(event.target.value);
    const [dataTypeText, setDataTypeText] = useState('');
    const onChangeDataTypeText = (event) => setDataTypeText(event.target.value);
    const [imgTypeText, setImgTypeText] = useState('');
    const onChangeImgTypeText = (event) => setImgTypeText(event.target.value);

    return(
        <>
        <div className='ItemList'>

        <div className='CheckList'>
        <h2>Check List</h2>
        <ul>
            <li>
            <label>
            <input
            type='checkbox'
            value='カラーモード'
            />
            <p>カラーモード</p>
            </label>        
            <input 
            placeholder="RGB/CMYK" 
            value={cmykText} 
            disabled ={ (event) =>{
                if(event.key === 'Enter'){
                    return 'true'
                }}
            }
            onChange={onChangeCmykText} 
            onKeyPress={ (event) => 
                {if(event.key == 'Enter'){
                    alert(`カラーモードは${cmykText}です`)
                    const validCmylText = () =>{
                    input.disabled = true;
                    }    
                }}}
            />
            </li>
            <li>
            <label>
            <input
            type='checkbox'
            value='トンボ形式'
            />
            <p>トンボ形式</p>
            </label>        
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
            </li>

            <li>
            <label>
            <input
            type='checkbox'
            value='データ形式'
            />
            <p>データ形式</p>
            </label>        
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
            </li>
            <li>
            <label>
            <input
            type='checkbox'
            value='データ形式'
            />
            <p>孤立店</p>
            </label>   
            </li>
            <li>
            <label>
            <input
            type='checkbox'
            value='画像'
            />
            <p>画像</p>
            </label>        
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
            </li>
        </ul>    
        </div>

        <div className='MemoList'>
        <h2>Memo</h2>
        <input type="text"></input>
        </div>
        </div>
        </>
    );
}