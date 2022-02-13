import React from 'react';

export const SaveBtn =({ title , onClickAdd }) =>{
    

    return(
        <div className='SaveBtnContainer'>
        <button 
        className='SaveBtn'
        onClick = {onClickAdd}>
        保存
        </button>
        <button 
        className='SaveBtn'
        // onClick = {}
        >
        削除
        </button>
        </div>
    )
}
