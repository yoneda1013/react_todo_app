import React from "react";
import { useState, useContext, useEffect } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { db } from "../firebase/firebase";


import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const List = ({
  projects,
  setProjects,
}) => {
  const navigate = useNavigate();


  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    getDocs(projectsCollectionRef).then((querySnapShot) => {
      setProjects(
        querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
    
    }, 
    // [projects]
    );
  


  return (
    <>
      <Button
        size="small"
        variant="contained"
        style={{
          margin: "2vh",
          fontSize: "14px",
          padding: "0.5vh",
          color: "#FFFFFF",
          background: "#3636B3",
          "&:hover": {
            backgroundColor: "#000066",
          },
        }}
        component={Link}
        to="/"
      >
        新規作成
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow className="ListRow">
              <TableCell>案件名</TableCell>
              {/* <TableCell>入稿日</TableCell> */}
              <TableCell>詳細ページ</TableCell>
              <TableCell>削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="ListBody">
            {projects.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.title}</TableCell>
                {/* <TableCell>{row.deadlineDate}</TableCell> */}
                {/* timestampだと表示できなさそうなので、firestoreに文字列で保存する作戦 */}
                {/* <TableCell>{row.deadlineDate.toString()}</TableCell>  */}
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      margin: "5px",
                      fontSize: "12px",
                      padding: "0.3vh",
                      color: "#FFFFFF",
                      background: "#3636B3",
                      "&:hover": {
                        backgroundColor: "#000066",
                      },
                    }}
                    onClick={() => {
                      navigate(`/${index}`);
                    }}
                  >
                    詳細ページへ
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      margin: "5px",
                      fontSize: "12px",
                      padding: "0.3vh",
                      color: "#FFFFFF",
                      background: "#3636B3",
                      "&:hover": {
                        backgroundColor: "#000066",
                      },
                    }}
                    onClick={()=>{
                      alert('削除が完了しました')
                      db.collection("projects").doc(row.id).delete()
                    }
                      
                      
                    }
                    //↑collection丸ごと消えてしまうから該当のドキュメントのみ消したい
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
