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
  startAt,
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

  let { id } = useParams();
  const isEdit = id !== undefined;

  const { currentUser } = useContext(AuthContext);
  const isMountedRef = useRef(false);
  //DOMツリーにDOMノードが追加されているか

  const fetch = (q, callback) => {
    getDocs(q).then(async (querySnapShot) => {
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
        const docCheck = await getDocs(
          query(
            collection(db, "projects"),
            where("uid", "==", currentUser.uid),
            orderBy("createdAt", "desc"),
            startAfter(nextCursor),
            limit(1)
          )
        );
        if (!docCheck.size) {
          setIsPastPage(true);
        }

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
    console.log(isLastPage);
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
      if (isLastPage) {
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
        setCursor,
        LIMIT,
        cursor,
        isLastPage,
        onClickAddFetch,
        setPrevCursor,
        setIsPastPage,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
