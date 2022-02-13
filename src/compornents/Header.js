import React from 'react';
import Button from '@material-ui/core/Button';
import { Link } from "react-router-dom";

export const Header =(projects) => {
    console.log(projects)
    //ここまでは配列の値が渡ってきている
    return (
        <>
        <div className="headerList">
        {/* ここからprojectsの配列が渡せていないのが問題 */}
        
        <Button
          size="small"
          variant="contained"
          color="#000066"
          component={Link}
          to="/list"
          projects = { projects }
          style={{ margin: "5px", fontSize: "20px", padding: "0" }}
        >
        ←
        </Button>
        <button type="submit" class="button">Sign Out</button>
        <h1>
            入稿要件管理表
        </h1>
        
        {/* <button type="submit" class="button">1</button>
        <button type="submit" class="button">2</button>
        <button type="submit" class="button">3</button>
        <button type="submit" class="button">4</button>
        <button type="submit" class="button">＋</button> */}
        </div>
        </>
    )
}