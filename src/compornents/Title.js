import React from 'react';

export const Title =({}) =>{
    // const onChangeTitleText = (event) => setTitleText(event.target.value);
    return(
        <>
        <div>
        <label for="title" className='labelTitleInput'>
        <input type= "text"
        placeholder="Projcet Title" 
        className="titleInput"
        // value={titleText} 
        // onChange={onChangeTitleText}
        />            
        </label>
        <button className="button">確定</button>
        </div>
        </>
        
    )
}