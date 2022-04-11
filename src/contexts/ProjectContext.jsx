import React, { useState, useEffect, useContext, useRef } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  where,
  getDocs,
  startAfter,
  limitToLast,
  endAt,
  endBefore,
} from "firebase/firestore";
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firebase/firebase";
import firebase from "firebase/compat/app";

const ProjectContext = React.createContext();

const LIMIT = 5;

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(undefined);
  const [prevCursor, setPrevCursor] = useState(undefined);
  const [isLastPage, setIsPastPage] = useState(false);
  const [projectsLength, setProjectsLength] = useState(0);

  const { currentUser } = useContext(AuthContext);
  const isMountedRef = useRef(false);

  const fetch = (q, callback) => {
    getDocs(q).then((querySnapShot) => {
      if (isMountedRef.current) {
        const nextCursor = querySnapShot.docs[querySnapShot.docs.length - 1];
        const prevCursor = querySnapShot.docs[0];
        console.log("next", nextCursor);
        console.log("prev", prevCursor);
        setNextCursor(nextCursor);
        setPrevCursor(prevCursor);

        setProjects(
          querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );

        setIsLoading(false);
        callback && callback();
      }
    });
  };

  const onClickDelete = (rowId) => {
    db.collection("projects")
      .doc(rowId)
      .delete()
      .then(() => {
        console.log("successfully");
      })
      .catch((error) => {
        console.log("Error", error);
      });

    const copyProjects = Object.assign([], projects);

    //再レンダリングを正常に機能させるためにミューテートを伴わない方法（直接変更ではなく、データをコピーし参照元を変更する）で行う。
    //indexをkeyとして使用しているため、ページネーションの際に再描画されていない→idに一致したインデックスを返す
    const index = projects.findIndex((projects) => projects.id === rowId);

    copyProjects.splice(index, 1);
    setProjects(copyProjects);
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    const q = query(
      collection(db, "projects"),
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      limit(LIMIT)
    );

    setIsLoading(true);
    fetch(q);
  }, [currentUser.uid]);

  // db.collection("projects")
  //   .get()
  //   .then((querySnapShot) => {
  //     const projectsLength = querySnapShot.docs.length - 1;
  //     setProjectsLength(projectsLength);
  //     console.log(projectsLength);
  //   });

  const prevDisabled = cursor === 0;
  // const nextDisabled = projectsLength <= LIMIT || isLastPage;
  const nextDisabled = 6 <= LIMIT || isLastPage;
  // const nextDisabled = Object.keys(projects).length <= LIMIT || isLastPage;

  const next = () => {
    if (!nextCursor || nextDisabled) return;

    let q = query(
      collection(db, "projects"),
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      startAfter(nextCursor),
      limit(LIMIT)
    );

    fetch(q, async () => {
      setCursor((cursor) => cursor + 1);
      const docCheck = await getDocs(query(q, limit(1)));
      if (!docCheck.size) {
        setIsPastPage(true);
      }
    });
  };

  const prev = () => {
    if (!prevCursor || prevDisabled) return;
    let q = query(
      collection(db, "projects"),
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      endBefore(prevCursor),
      limitToLast(LIMIT)
    );
    fetch(q, () => {
      setCursor((cursor) => cursor - 1);
      setIsPastPage(false);
    });
  };

  return (
    <ProjectContext.Provider
      value={{
        onClickDelete,
        projects,
        isLoading,
        setProjects,
        next,
        prev,
        prevDisabled,
        nextDisabled,
        fetch,
        setIsLoading,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
