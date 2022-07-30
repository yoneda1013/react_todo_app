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
  endBefore,
} from "firebase/firestore";
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firebase/firebase";
import { useParams } from "react-router-dom";

const ProjectContext = React.createContext();

const LIMIT = 5;

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(undefined);
  const [prevCursor, setPrevCursor] = useState(undefined);
  const [isLastPage, setIsPastPage] = useState(false);
  const [pjSize, setPjSize] = useState(0);

  let { id } = useParams();
  const isEdit = id !== undefined;

  const { currentUser } = useContext(AuthContext);
  const isMountedRef = useRef(false);
  //DOMツリーにDOMノードが追加されているか

  const fetch = (q, callback) => {
    getDocs(q).then((querySnapShot) => {
      if (isMountedRef.current) {
        const nextCursor = querySnapShot.docs[querySnapShot.docs.length - 1];
        const prevCursor = querySnapShot.docs[0];
        setNextCursor(nextCursor);
        setPrevCursor(prevCursor);
        setProjects(
          querySnapShot.docs.map((doc) => ({
            ...doc.data({ serverTimestamps: "estimate" }),
            id: doc.id,
          }))
        );
        setIsLoading(false);
        callback && callback();
      }
    });
  };

  const onClickUpdate = () => {
    let q = query(
      collection(db, "projects"),
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      // startAt(prevCursor),
      limit(LIMIT)
    );

    fetch(q);
  };
  const onClickAddFetch = () => {
    let q = query(
      collection(db, "projects"),
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      // startAt(prevCursor),
      limit(LIMIT)
    );

    fetch(q);
  };

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);
  //cleanup function メモリーリーク防止

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

  const pjRef = db.collection("projects").where("uid", "==", currentUser.uid);

  pjRef.get().then((querySnapShot) => {
    const pjSize = querySnapShot.docs.length;
    setPjSize(pjSize);
  });

  const prevDisabled = cursor === 0;
  const nextDisabled =
    Object.keys(projects).length < LIMIT || isLastPage || pjSize === LIMIT;

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
      if (cursor + 2 === pjSize / LIMIT) {
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
        projects,
        isLoading,
        setProjects,
        next,
        prev,
        prevDisabled,
        nextDisabled,
        fetch,
        setIsLoading,
        prevCursor,
        isEdit,
        onClickUpdate,
        pjSize,
        setCursor,
        LIMIT,
        cursor,
        isLastPage,
        onClickAddFetch,
        setPrevCursor,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
