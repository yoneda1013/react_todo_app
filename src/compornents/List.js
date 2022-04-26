import React, { useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../contexts/ProjectContext";

import { AuthContext } from "../auth/AuthProvider";

export const List = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    projects,
    next,
    prev,
    prevDisabled,
    nextDisabled,
    onClickDelete,
    pjSize,
  } = useContext(ProjectContext);
  const navigate = useNavigate();
  console.log("list", pjSize);
  return (
    <>
      <div className="listBtn">
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
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow
              className="listRow"
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
          <TableBody className="listBody">
            {Object.values(projects).map((row, index) => (
              <TableRow key={index}>
                <TableCell style={{ textAlign: "center", fontSize: "1.5rem" }}>
                  {row.title}
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
                      const rowId = row.id;
                      const rowIndex = index;
                      onClickDelete(rowId, rowIndex);
                    }}
                  >
                    削除
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {!prevDisabled && (
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
          onClick={prev}
        >
          前の5件を表示する
        </Button>
      )}
      {/* nextDisabledかつpjSizeが5の倍数の時、表示させない */}
      {!nextDisabled && !(pjSize % 5 == 0) && (
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
          onClick={next}
        >
          次の5件を表示する
        </Button>
      )}
    </>
  );
};
