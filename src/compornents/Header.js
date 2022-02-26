import React from "react";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

export const Header = (setProjectsParams, projectsParams) => {
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
              color: "#FFFFFF",
              background: "#3636B3",
              "&:hover": {
                backgroundColor: "#000066",
              },
            }}

            // onClick={()=>setProjectsParams(!projectsParams)}
          >
            一覧へ
          </Button>
          <Button
            size="small"
            variant="contained"
            style={{
              margin: "5px 15px",
              padding: "10px",
              fontSize: "11px",
              color: "#FFFFFF",
              background: "#3636B3",
              "&:hover": {
                backgroundColor: "#000066",
              },
            }}
            onClick={() => auth.signOut()}
          >
            Sign Out
          </Button>
        </div>

        <h1>入稿要件管理表</h1>
      </div>
    </>
  );
};
