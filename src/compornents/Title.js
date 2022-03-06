import React from "react";

export const Title = ({ title, onChangeTitle }) => {
  return (
    <div>
      <p></p>
      <form>
        <label htmlFor="projects" className="labelTitleInput">
          <div className="conrainerTitleInput">
            <input
              name="projects"
              type="text"
              value={title}
              onChange={onChangeTitle}
              placeholder="案件名を入力"
              className="titleInput"
            />
          </div>
        </label>
      </form>
    </div>
  );
};