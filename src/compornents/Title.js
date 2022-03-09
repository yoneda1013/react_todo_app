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
            {title.length > 30 && (
              <span>タイトルは30字以内で入力してください</span>
            )}
          </div>
        </label>
      </form>
    </div>
  );
};
