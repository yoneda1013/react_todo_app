import React from "react";
import Button from "@material-ui/core/Button";

export const SaveBtn = ({ onClickAdd, onClickDelete }) => {
  return (
    <div className="SaveBtnContainer">
      <Button
        size="small"
        variant="contained"
        onClick={onClickAdd}
        style={{ margin: "5px", fontSize: "20px", padding: "0" }}
      >
        保存
      </Button>
    </div>
  );
};
