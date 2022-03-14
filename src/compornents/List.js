import React, { useContext, useEffect, useState } from "react";
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
import ReactPaginate from "react-paginate";

import { AuthContext } from "../auth/AuthProvider";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  where,
  getDocs,
  DocumentSnapshot,
  startAt,
  startAfter,
} from "firebase/firestore";
export const List = () => {
  const { projects } = useContext(ProjectContext);
  const navigate = useNavigate();

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
      <TableContainer>
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
            {Object.values(projects)
              // .slice(start, start + perPage)
              .map((row, index) => (
                <TableRow key={index}>
                  <TableCell
                    style={{ textAlign: "center", fontSize: "1.5rem" }}
                  >
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
                        db.collection("projects").doc(row.id).delete();
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
        // onClick={}
      >
        次の5件を表示する
      </Button>
      {/* <ReactPaginate
        pageCount={Math.ceil(Object.keys(projects).length / perPage)}
        marginPagesDisplayed={3}
        pageRangeDisplayed={3}
        onPageChange={pageChange}
        containerClassName="pagination"
        pageClassName="page-item"
        pageLinkClassName="page-link"
        activeClassName="active"
        previousLabel="back"
        nextLabel="next"
        previousClassName="page-item"
        nextClassName="page-item"
        previousLinkClassName="page-link"
        nextLinkClassName="page-link"
        disabledClassName="disabled"
        breakLabel="..."
        breakClassName="page-item"
        breakLinkClassName="page-link"
      /> */}
    </>
  );
};
