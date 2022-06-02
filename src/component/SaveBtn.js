import React from "react";
import Button from "@material-ui/core/Button";
import styled from "styled-components";

export const SaveBtn = ({ onClickAdd, children }) => {
  return (
    <Wrapper>
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
          },
        }}
      >
        {children}
      </Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  text-align: right;
  padding-right: 20px;
  margin-top: 2vh;
  margin-right: 10%;
`;
