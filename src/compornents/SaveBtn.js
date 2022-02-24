import React from "react";
import Button from "@material-ui/core/Button";

export const SaveBtn = ({ onClickAdd }) => {
  return (
    <div className="SaveBtnContainer">
      <Button
        size="small"
        variant="contained"
        onClick={onClickAdd}
        style={{
          margin: "5px",
          fontSize: "20px",
          padding: "0.5vh",
          color: "#FFFFFF",
          background: "#3636B3",
          "&:hover": {
            backgroundColor: "#000066",
          }
        }}
      >
        保存
      </Button>
    </div>
  );
};
