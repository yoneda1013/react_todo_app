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
import { useParams } from "react-router-dom";

const ProjectContext = React.createContext();

const LIMIT = 5;

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  //fetchでprojectsに値が入っているか否か
  const [cursor, setCursor] = useState(0);
  //現在のページ数
  const [nextCursor, setNextCursor] = useState(undefined);
  //ページ内一番最後のobj
  const [prevCursor, setPrevCursor] = useState(undefined);
  //ページ内一番最初のobj
  const [isLastPage, setIsPastPage] = useState(false);
  //次ページに遷移できるか（データがあるか）否か
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
        let q = query(
          collection(db, "projects"),
          where("uid", "==", currentUser.uid),
          orderBy("createdAt", "desc"),
          // startAt(prevCursor),
          limit(LIMIT)
        );
        fetch(q);
        console.log("Delete");
      })
      .catch((error) => {
        console.log("Error", error);
      });

    const copyProjects = Object.assign([], projects);

    const index = projects.findIndex((projects) => projects.id === rowId);

    copyProjects.splice(index, 1);
    setProjects(copyProjects);
  };

  const onClickUpdate = () => {
    let q = query(
      collection(db, "projects"),
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
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
  //ログインユーザーが変わるごとにfetchをして、前のユーザーのデータが残らないようにする

  const pjRef = db.collection("projects").where("uid", "==", currentUser.uid);
  //Collection Reference　コレクションを参照する
  console.log(pjRef);

  pjRef.get().then((querySnapShot) => {
    const pjSize = querySnapShot.docs.length;
  });

  const prevDisabled = cursor === 0;
  const nextDisabled = Object.keys(projects).length < LIMIT || isLastPage;

  const next = () => {
    if (!nextCursor || nextDisabled) return;
    //もし5番目のpjがfalseもしくはnextDisableがtrueだったら処理を止める
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
        prevCursor,
        isEdit,
        onClickUpdate,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
