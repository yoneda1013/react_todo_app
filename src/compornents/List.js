import React, { useContext, useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

import PaginationOutlined from "./Pagenation";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../contexts/ProjectContext";
import Pagination from "@material-ui/lab/Pagination";

export const List = () => {
  const { projects } = useContext(ProjectContext);
  const navigate = useNavigate();
  const [page, setPage] = useState(1);
  console.log(Object.keys(projects).length);

  return (
    <>
      <div className="ListBtn">
        <Button
          size="small"
          variant="contained"
          style={{
            margin: "2vh",
            fontSize: "14px",
            padding: "0.5vh",
            color: "#3636B3",
            background: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#000066",
            },
          }}
          component={Link}
          to="/"
        >
          新規作成
        </Button>
        <Button
          size="small"
          variant="contained"
          style={{
            margin: "2vh",
            fontSize: "14px",
            padding: "0.5vh",
            color: "#3636B3",
            background: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#000066",
            },
          }}
          onClick={() => auth.signOut()}
        >
          Sign Out
        </Button>
      </div>
      <TableContainer
      // style={{ marginTop: "3.5vh" }}
      >
        <Table>
          <TableHead>
            <TableRow
              className="ListRow"
              style={{ background: "#A4A4E5", color: "#ffffff" }}
            >
              <TableCell
                style={{
                  background: "#A4A4E5",
                  color: "#ffffff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                案件名
              </TableCell>
              <TableCell
                style={{
                  background: "#A4A4E5",
                  color: "#ffffff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                詳細ページ
              </TableCell>
              <TableCell
                style={{
                  textAlign: "center",
                  background: "#A4A4E5",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                削除
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody className="ListBody">
            {Object.values(projects).map((row, index) => (
              <TableRow key={index}>
                <TableCell style={{ textAlign: "center", fontSize: "1.5rem" }}>
                  {row.title}
                </TableCell>
                {/* <TableCell>{row.deadlineDate}</TableCell> */}
                {/* timestampだと表示できなさそうなので、firestoreに文字列で保存する作戦 */}
                {/* <TableCell>{row.deadlineDate.toString()}</TableCell>  */}
                <TableCell style={{ textAlign: "center" }}>
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
                      navigate(`/${row.id}`);
                    }}
                  >
                    詳細ページへ
                  </Button>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
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
                      alert("削除が完了しました");
                      db.collection("projects").doc(row.id).delete();
                    }}
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
      <PaginationOutlined />
      {/* <Pagination count={5} page={page} variant="outlined" /> */}
    </>
  );
};
