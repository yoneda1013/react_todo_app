import React from "react";

export const Title = ({ title, onChangeTitle, validationForm }) => {
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
            {validationForm.formState.title && <p>{errors.title}</p>}
          </div>
        </label>
      </form>
    </div>
  );
};
