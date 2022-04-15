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

console.log("----context start-----");
const ProjectContext = React.createContext();

const LIMIT = 5;

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [cursor, setCursor] = useState(0);
  const [nextCursor, setNextCursor] = useState(undefined);
  const [prevCursor, setPrevCursor] = useState(undefined);
  const [isLastPage, setIsPastPage] = useState(false);

  const initialFormData = {
    title: "",
    cmykText: "",
    tonboText: "",
    dataTypeText: "",
    imgTypeText: "",
    urlText: "",
    deadlineDate: new Date(),
    cmykBool: false,
    tonboBool: false,
    dataTypeBool: false,
    imgTypeBool: false,
    koritsuBool: false,
    cmykTextHasError: false,
    cmykTextTouched: false,
    tonboTextHasError: false,
    tonboTextTouched: false,
    dataTypeTextHasError: false,
    dataTypeTextTouched: false,
    imgTypeTextHasError: false,
    imTypeTextTouched: false,
    urlTextHasError: false,
    urlTextTouched: false,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
  };
  let { id } = useParams();
  const isEdit = id !== undefined;
  console.log("id", id);
  const targetProject = id && projects.find((v) => v.id === id);
  console.log(targetProject);
  //targetProjectはとれてる
  const [formState, setFormState] = useState(
    id
      ? {
          title: targetProject.title,
          cmykText: targetProject.cmykText,
          tonboText: targetProject.tonboText,
          dataTypeText: targetProject.dataTypeText,
          imgTypeText: targetProject.imgTypeText,
          urlText: targetProject.urlText,
          deadlineDate: targetProject.deadlineDate.toDate(),
          cmykBool: targetProject.cmykBool,
          tonboBool: targetProject.tonboBool,
          dataTypeBool: targetProject.dataTypeBool,
          imgTypeBool: targetProject.imgTypeBool,
          koritsuBool: targetProject.koritsuBool,
          createdAt: targetProject.createdAt.toDate(),
          cmykTextHasError: false,
          cmykTextTouched: false,
          tonboTextHasError: false,
          tonboTextTouched: false,
          dataTypeTextHasError: false,
          dataTypeTextTouched: false,
          imgTypeTextHasError: false,
          imTypeTextTouched: false,
          urlTextHasError: false,
          urlTextTouched: false,
        }
      : initialFormData
  );
  console.log(formState.title);
  console.log(targetProject.title);

  const { currentUser } = useContext(AuthContext);
  const isMountedRef = useRef(false);

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
        console.log("fetch", projects);
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
          startAt(prevCursor),
          limit(LIMIT)
        );
        fetch(q);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    const copyProjects = Object.assign([], projects);

    const index = projects.findIndex((projects) => projects.id === rowId);

    copyProjects.splice(index, 1);
    setProjects(copyProjects);
  };

  const onClickAdd = () => {
    if (30 < formState.title.length) {
      alert("正しい値を入力してください");
    } else {
      alert("保存が完了しました！");
      const docRef = isEdit
        ? db.collection("projects").doc(targetProject.id)
        : db.collection("projects").doc();

      const newDoc = docRef.id;

      docRef.set({
        ...formState,
        uid: currentUser.uid,
        deadlineDate: firebase.firestore.Timestamp.fromDate(
          formState.deadlineDate
        ),
        // createdAt: firebase.firestore.Timestamp.fromDate(formState.createdAt),
      });
      console.log("onClickAdd内のfetch前", projects);
      // let q = query(
      //   collection(db, "projects"),
      //   where("uid", "==", currentUser.uid),
      //   orderBy("createdAt", "desc"),
      //   startAt(prevCursor),
      //   //↑修正
      //   limit(5)
      // );
      // fetch(q);
      // console.log("onClickAdd内のfetch後", projects);

      if (isEdit) {
        const index = projects.findIndex((p) => p.id === id);

        setProjects((prev) => {
          const projects = [...prev];
          projects[index] = {
            ...formState,
            id,
            deadlineDate: firebase.firestore.Timestamp.fromDate(
              formState.deadlineDate
            ),
            createdAt: firebase.firestore.Timestamp.fromDate(
              formState.createdAt
            ),
          };

          return projects;
        });
      } else {
        const copyProjects = [...projects];

        const copyFormState = {
          ...formState,
          id: newDoc,
          deadlineDate: firebase.firestore.Timestamp.fromDate(
            formState.deadlineDate
          ),
          createdAt: firebase.firestore.Timestamp.now(),
        };

        copyProjects.unshift(copyFormState);

        setProjects(copyProjects);
      }
    }
    console.log("setProjects後", projects);
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
  console.log("----context fin-----");

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
        formState,
        setFormState,
        isEdit,
        onClickAdd,
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
