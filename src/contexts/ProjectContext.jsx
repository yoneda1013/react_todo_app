import React, { useState, useEffect, useContext } from "react";
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
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firebase/firebase";

const ProjectContext = React.createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    let isMounted = true;
    setIsLoading(true);
    const projectsCollectionRef = collection(db, "projects");

    const first = query(
      projectsCollectionRef,
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    getDocs(first).then((querySnapShot) => {
      const lastVisible = querySnapShot.docs[querySnapShot.docs.length - 1];
      console.log("last", lastVisible);
      const next = query(
        collection(db, "projects"),
        where("uid", "==", currentUser.uid),
        orderBy("createdAt", "desc"),
        startAfter(lastVisible),
        limit(10)
      );

      // const fetchMoreProjects = getDocs(next).then((querySnapShot) => {
      //   if (isMounted) {
      //     setProjects(
      //       querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      //     );
      //     setIsLoading(false);
      //   }
      // });

      if (isMounted) {
        setProjects(
          querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setIsLoading(false);
      }
    });

    return () => (isMounted = false);
  }, [currentUser.uid]);

  return (
    <ProjectContext.Provider value={{ projects, isLoading, setProjects }}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
