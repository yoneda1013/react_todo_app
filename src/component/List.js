import React, { useContext } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { db } from "../firebase/firebase";
import { auth } from "../firebase/firebase";

import { collection, query, orderBy, limit, where } from "firebase/firestore";
import Button from "@material-ui/core/Button";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { ProjectContext } from "../contexts/ProjectContext";

import { AuthContext } from "../auth/AuthProvider";
import styled from "styled-components";

export const List = () => {
  const { currentUser } = useContext(AuthContext);
  const {
    projects,
    next,
    prev,
    prevDisabled,
    nextDisabled,
    setCursor,
    setProjects,
    LIMIT,
    fetch,
    pjSize,
  } = useContext(ProjectContext);
  const navigate = useNavigate();

  const onClickDelete = (rowId) => {
    db.collection("projects")
      .doc(rowId)
      .delete()
      .then(() => {
        let q = query(
          collection(db, "projects"),
          where("uid", "==", currentUser.uid),
          orderBy("createdAt", "desc"),
          // startAt(prevCursor),
          limit(LIMIT)
        );

        fetch(q);
      })
      .catch((error) => {});

    const copyProjects = Object.assign([], projects);

    const index = projects.findIndex((projects) => projects.id === rowId);

    if (pjSize % 6 === 0) {
      setCursor((cursor) => cursor - 1);
    }
    setCursor(0);

    copyProjects.splice(index, 1);
    setProjects(copyProjects);
  };

  return (
    <>
      <ButtonBox>
        <Button
          size="small"
          variant="contained"
          style={{
            margin: "15px",
            fontSize: "14px",
            padding: "5px",
            color: "#3636B3",
            background: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#000066",
            },
          }}
          component={Link}
          to="/"
        >
          ????????????
        </Button>
        <Button
          size="small"
          variant="contained"
          style={{
            margin: "15px",
            fontSize: "14px",
            padding: "5px",
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
      </ButtonBox>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow style={{ background: "#A4A4E5", color: "#ffffff" }}>
              <TableCell
                style={{
                  background: "#A4A4E5",
                  color: "#ffffff",
                  fontWeight: "bold",
                  textAlign: "center",
                  fontSize: "var(--font--size--p)",
                }}
              >
                ?????????
              </TableCell>
              <TableCell
                style={{
                  background: "#A4A4E5",
                  color: "#ffffff",
                  fontWeight: "bold",
                  textAlign: "center",
                }}
              >
                ???????????????
              </TableCell>
              <TableCell
                style={{
                  textAlign: "center",
                  background: "#A4A4E5",
                  color: "#ffffff",
                  fontWeight: "bold",
                }}
              >
                ??????
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody style={{ fontSize: "var(--font--size--p)" }}>
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
                      padding: "3px",
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
                    ??????????????????
                  </Button>
                </TableCell>
                <TableCell style={{ textAlign: "center" }}>
                  <Button
                    size="small"
                    variant="contained"
                    style={{
                      margin: "5px",
                      fontSize: "12px",
                      padding: "3px",
                      color: "#FFFFFF",
                      background: "#3636B3",
                      "&:hover": {
                        backgroundColor: "#000066",
                      },
                    }}
                    onClick={() => {
                      alert("???????????????????????????");
                      const rowId = row.id;
                      const rowIndex = index;
                      onClickDelete(rowId, rowIndex);
                    }}
                  >
                    ??????
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
            margin: "10px",
            fontSize: "14px",
            padding: "5px",
            color: "#3636B3",
            background: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#000066",
            },
          }}
          onClick={prev}
        >
          ??????5??????????????????
        </Button>
      )}

      {!nextDisabled && (
        <Button
          size="small"
          variant="contained"
          style={{
            margin: "10px",
            fontSize: "14px",
            padding: "5px",
            color: "#3636B3",
            background: "#FFFFFF",
            "&:hover": {
              backgroundColor: "#000066",
            },
          }}
          onClick={next}
        >
          ??????5??????????????????
        </Button>
      )}
    </>
  );
};

const ButtonBox = styled.div`
  background: -moz-linear-gradient(bottom, #a4a4e5, #fff);
  background: -webkit-linear-gradient(bottom, #a4a4e5, #fff);
  background: linear-gradient(to top, #a4a4e5, 70%, #fff);
  padding: 20px 20px 0;
`;
