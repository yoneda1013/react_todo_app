import React from "react";
import styled from "styled-components";

// const Input = styled.input`
//   width: 70%;
//   margin: 3vh 15%;
//   font-size: 1.8rem;
//   box-sizing: border-box;
//   padding: 0.6em;
//   transition: 0.3s;
//   letter-spacing: 1px;
//   background-color: #e8e7e7;
// `;

export const Title = ({ title, onChangeTitle }) => {
  return (
    <div>
      <form>
        <label htmlFor="projects">
          <div>
            <input
              name="projects"
              type="text"
              value={title}
              onChange={onChangeTitle}
              placeholder="案件名を入力"
              className="titleInput"
            />
            {title.length > 30 && (
              <span>タイトルは30字以内で入力してください</span>
            )}
          </div>
        </label>
      </form>
    </div>
  );
};
