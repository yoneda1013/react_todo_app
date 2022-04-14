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
  startAt,
  endBefore,
} from "firebase/firestore";
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firebase/firebase";
import firebase from "firebase/compat/app";

const ProjectContext = React.createContext();

const LIMIT = 5;
console.log("Context start");
const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(undefined);
  const [prevCursor, setPrevCursor] = useState(undefined);
  const [isLastPage, setIsPastPage] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const isMountedRef = useRef(false);
  console.log("context", projects);
  //onClickAddの際これ↑がLIMITを超えてしまう。
  //onDeleteの際、これが4になる
  const fetch = (q, callback) => {
    getDocs(q).then((querySnapShot) => {
      if (isMountedRef.current) {
        const nextCursor = querySnapShot.docs[querySnapShot.docs.length - 1];
        const prevCursor = querySnapShot.docs[0];

        setNextCursor(nextCursor);
        setPrevCursor(prevCursor);
        console.log("in fetch", projects);
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

    const index = projects.findIndex((projects) => projects.id === rowId);

    copyProjects.splice(index, 1);
    setProjects(copyProjects);

    let q = query(
      collection(db, "projects"),
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      startAt(prevCursor),
      limit(LIMIT)
    );
    fetch(q);
    console.log("afterFetch", projects);
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

  const prevDisabled = cursor === 0;
  const nextDisabled = Object.keys(projects).length < LIMIT || isLastPage;

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
  console.log("Context fin");
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
