import React from "react";
import styled from "styled-components";

export const Title = ({ title, onChangeTitle }) => {
  return (
    <div>
      <form>
        <label htmlFor="projects">
          <div>
            <Input
              name="projects"
              type="text"
              value={title}
              onChange={onChangeTitle}
              placeholder="案件名を入力"
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

const Input = styled.input`
  width: 70%;
  margin: 30px 15%;
  font-size: 1.8rem;
  box-sizing: border-box;
  padding: 0.6em;
  transition: 0.3s;
  letter-spacing: 1px;
  background-color: #e8e7e7;
  &:focus {
    border-bottom: 2px solid #000066;
    outline: none;
  }
  @media screen and (max-width: 740px) {
    margin-bottom: 0;
  }
`;
