import React from 'react';
import {useState} from 'react';

export const ItemList =({}) =>{
    const[ colorModeText,setColorModeText ]  = useState('RGB/CMYK');
    const [cmykText, setCmykText] = useState('');
    const onChangeCmykText = (event) => setCmykText(event.target.value);
    const input = document.querySelector('input');

    return(
        <>
        <h2>チェックリスト</h2>
        <div>
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
        </div>
        
        </>
    );
}