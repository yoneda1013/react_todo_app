import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import styled from "styled-components";

export const Header = () => {
  return (
    <>
      <Wrapper>
        <Box>
          <Button
            size="small"
            variant="contained"
            component={Link}
            to="/list"
            style={{
              border: 0,
              borderRadius: 3,
              margin: "5px",
              fontSize: "11px",
              padding: "10px",
              color: "#3636B3",
              background: "#FFFFFF",
              "&:hover": {
                backgroundColor: "#000066",
              },
            }}
          >
            一覧へ
          </Button>
        </Box>

        <Title>入稿要件管理表</Title>
      </Wrapper>
    </>
  );
};

const Wrapper = styled.div`
  background: -moz-linear-gradient(bottom, #a4a4e5, #fff);
  background: -webkit-linear-gradient(bottom, #a4a4e5, #fff);
  background: linear-gradient(to top, #a4a4e5, 80%, #fff);
`;

const Title = styled.h1`
  text-align: center;
  font-size: var(--font--size--h1);
  padding-bottom: 1.5vh;
  color: #ffffff;
`;

const Box = styled.div`
  padding: 10vh 0 0 10vh;
`;
