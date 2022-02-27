import React from "react";
import { useState, useContext, useEffect } from "react";
import { styled } from "@material-ui/core/styles";
import Box from "@material-ui/core/Box";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { db } from "../firebase/firebase";
import { AuthContext } from "../auth/AuthProvider";

import { collection, getDocs, deleteDoc } from "firebase/firestore";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const List = ({
  projects,
  setProjects,
  docId,
  deadlineDate,
}) => {
  const navigate = useNavigate();

  // const getStringFromDate = (deadlineDate) => {
  //   var year_str = deadlineDate.getFullYear();
  //   var month_str = 1 + deadlineDate.getMonth();
  //   var day_str = deadlineDate.getDate();
  //   var hour_str = deadlineDate.getHours();
  //   var format_str = "YYYY年MM月DD日 hh時";
  //   var format_str = format_str.replace(/YYYY/g, year_str);
  //   var format_str = format_str.replace(/MM/g, month_str);
  //   var format_str = format_str.replace(/DD/g, day_str);
  //   var format_str = format_str.replace(/hh/g, hour_str);
  //   return format_str;
  // };

  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    // console.log(projectsCollectionRef);
    //dbのコレクションを参照。
    getDocs(projectsCollectionRef).then((querySnapShot) => {
      // console.log(querySnapShot);
      //querySnapShotの中にあるdocsは配列。forEachで展開してdocを取り出す。doc.data()でdocのなかでネストになっているdataを取り出す。
        // querySnapShot.docs.forEach((doc) => console.log(doc.data()));
      //getDocsでコレクションの取得 querySnapShotのdocはarray
      //   setProjects(querySnapShot.docs.map((doc) => ({...doc.data(), id: doc.id })));
      //forEachは戻り値がないので,useStateで定義したprojectsに保存するにはmapを使用する。idをdoc.data()とマージ。これでprojectsというarrのなかでfirestoreの値が取得。
      setProjects(
        querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
      
    });
  }, []);

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
              <TableCell>入稿日</TableCell>
              <TableCell>詳細ページ</TableCell>
              <TableCell>削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="ListBody">
            {projects.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.deadlineDate}</TableCell>
                {/* <TableCell>{row.cmykBool}</TableCell> */}
                {/* <TableCell>{row.deadlineDate.toString()}</TableCell>  */}
                {/* <TableCell>{row.deadlineDate.unix(projects.createdAt.seconds).format('MM/DD')}</TableCell> */}
                {/* <TableCell>{row.deadlineDate}</TableCell> */}
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
                    // onClick={db.collection("projects").doc(db, "projects", row.id).deleteDoc()}
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
