import React from "react";
import styled from "styled-components";

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
