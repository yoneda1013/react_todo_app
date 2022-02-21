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

import { collection, getDocs } from "firebase/firestore";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

export const List = ({ projects, setProjects, docId }) => {
  const navigate = useNavigate();
  // console.log(projects);
  // console.log(Object.keys(projects));
  //projectsはObj
  // const onClickDelete = () => {
  //   db.collection("projects").doc(index).delete();
  //   // ↑ここがdocIdではない。docIdはただ単にIdをつくるだけの関数
  // };
  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    // console.log(projectsCollectionRef);
    //dbのコレクションを参照。
    getDocs(projectsCollectionRef).then((querySnapShot) => {
      // console.log(querySnapShot);
      //querySnapShotの中にあるdocsは配列。forEachで展開してdocを取り出す。doc.data()でdocのなかでネストになっているdataを取り出す。
      //   querySnapShot.docs.forEach((doc) => console.log(doc.data()));
      //getDocsでコレクションの取得 querySnapShotのdocはarray
      //   setProjects(querySnapShot.docs.map((doc) => ({...doc.data(), id: doc.id })));
      //forEachは戻り値がないので,useStateで定義したprojectsに保存するにはmapを使用する。idをdoc.data()とマージ。これでprojectsというarrのなかでfirestoreの値が取得。
    });
  }, []);


  return (
    <>
      <Button
        size="small"
        variant="contained"
        style={{ margin: "5px", fontSize: "8px", padding: "0" }}
        component={Link}
        to="/"
      >
        新規作成
      </Button>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>案件名</TableCell>
              <TableCell>入稿日</TableCell>
              <TableCell>詳細ページ</TableCell>
              <TableCell>削除</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {projects.map((row, index) => (
              <TableRow key={index}>
                <TableCell>{row.title}</TableCell>
                <TableCell>{row.id}</TableCell>
                {/* <TableCell>{row.deadlineDate}</TableCell> */}
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    style={{ margin: "5px", fontSize: "8px", padding: "0" }}
                    onClick={() => navigate(`/${index}`)}
                    //indexを/に渡したい。そうすればkey={index}をできる
                  >
                    詳細ページへ
                  </Button>
                </TableCell>
                <TableCell>
                  <Button
                    size="small"
                    variant="contained"
                    style={{ margin: "5px", fontSize: "8px", padding: "0" }}
                    // onClick={db.collection("projects").doc(row.id).delete()}
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
