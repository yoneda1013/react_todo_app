import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";
import { auth } from "../firebase/firebase";

export const Header =() => {

    return (
        <>
        <div className="headerList">

        
        <Button
          size="small"
          variant="contained"
          component={Link}
          to="/list"
          style={{ margin: "5px", fontSize: "20px", padding: "0" }}
        >
        ←
        </Button>
        <Button
          size="small"
          variant="contained"
          style={{ margin: "5px", fontSize: "20px", padding: "5px", fontSize:"14px" }}
          onClick={()=> auth.signOut()}
        >
        Sign Out
        </Button>
        <h1>
            入稿要件管理表
        </h1>
        </div>
        </>
    )
}
