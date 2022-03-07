import React from "react";

export const Title = ({
  title,
  onChangeTitle,
  validationForm,
  errorMessage,
  onBlurValidation,
  validationErrors,
}) => {
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
              onBlur={onBlurValidation}
            />
            {/* {console.log(validationForm.formState.title)} */}
            {validationForm.title && <p>{errorMessage.title}</p>}
          </div>
        </label>
      </form>
    </div>
  );
};
