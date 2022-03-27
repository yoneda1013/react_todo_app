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
} from "firebase/firestore";
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firebase/firebase";

const ProjectContext = React.createContext();

const LIMIT = 5;

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(undefined);
  const [prevCursor, setPrevCursor] = useState(undefined);
  const [isLastPage, setIsPastPage] = useState(false);

  const { currentUser } = useContext(AuthContext);
  const isMountedRef = useRef(false);

  const fetch = (q, callback) => {
    getDocs(q).then((querySnapShot) => {
      if (isMountedRef.current) {
        const nextCursor = querySnapShot.docs[querySnapShot.docs.length - 1];
        const prevCursor = querySnapShot.docs[0];
        setNextCursor(nextCursor);
        setPrevCursor(prevCursor);
        console.log(nextCursor);
        console.log(prevCursor);
        // console.log(projects.length);
        // console.log(projects[4]);
        // console.log(projects[1]);
        setProjects(
          querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setIsLoading(false);
        callback && callback();
      }
    });
  };

  const onClickDelete = (q, rowId, rowIndex) => {
    db.collection("projects")
      .doc(rowId)
      .delete()
      .then(() => {
        console.log("successfully");
      })
      .catch((error) => {
        console.log("Error", error);
      });

    // const copyProjects = Object.assign({}, projects);
    const copyProjects = Object.assign({}, projects);
    delete copyProjects[rowIndex];
    setProjects(copyProjects);
    fetch(q);
  };

  const onClickUpdate = (q) => {
    fetch(q);
  };

  // const onClickAdd = () => {
  //   if (30 < formState.title.length) {
  //     alert("正しい値を入力してください");
  //   } else {
  //     alert("保存が完了しました！");

  //     const docRef = isEdit
  //       ? db.collection("projects").doc(targetProject.id)
  //       : db.collection("projects").doc();

  //     docRef.set({
  //       uid: currentUser.uid,
  //       ...formState,
  //     });
  //     //firebaseの書き換えはできているので、ProjectContextの書き換えを行う
  //     //projectContextの追加
  //     const copyProjects = Object.assign({}, projects);
  //     console.log(copyProjects);
  //     // console.log(projects);
  //     // console.log(formState);

  //     //copyProjectsというobjにformStateを追加/更新する・
  //     // 追加はできているので、更新

  //     // const copyProjectsArr = Object.keys(copyProjects).map(function (key) {
  //     //   return copyProjects[key];
  //     // });
  //     // console.log(copyProjectsArr);
  //     // console.log(copyProjectsArr[0]);
  //     // const targetCopyProject = copyProjectsArr.find((v) => v.id === id);

  //     if (isEdit) {
  //       // setProjects({ targetCopyProject = formState });
  //       console.log("更新されました");
  //     } else {
  //       setProjects(...copyProjects, formState);
  //     }
  //   }
  // };

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
      endAt(prevCursor),
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
        setProjects,
        fetch,
        setIsLoading,
        onClickUpdate,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
