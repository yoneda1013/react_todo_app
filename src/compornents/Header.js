import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

export const Header = () => {
  return (
    <>
      <div className="headerList">
        <div className="headerBtn">
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

            // onClick={()=>setProjectsParams(!projectsParams)}
          >
            一覧へ
          </Button>
        </div>

        <h1>入稿要件管理表</h1>
      </div>
    </>
  );
};
