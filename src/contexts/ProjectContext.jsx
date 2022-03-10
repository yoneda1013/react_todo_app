import React, { useState, useEffect, useContext } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  where,
  getDocs,
} from "firebase/firestore";
import { AuthContext } from "../auth/AuthProvider";
import { db } from "../firebase/firebase";

const ProjectContext = React.createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useContext(AuthContext);
  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    const q = query(
      projectsCollectionRef,
      where("uid", "==", currentUser.uid),
      orderBy("createdAt", "desc"),
      limit(10)
    );
    // getDocs(
    //   query(
    //     projectsCollectionRef,
    //     where("uid", "==", currentUser.uid),
    //     orderBy("createdAt", "desc"),
    //     limit(10)
    //   ).then((querySnapShot) => {
    //     setProjects(
    //       querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
    //     );
    //   })
    // );
    const unsubscribe = onSnapshot(q, {
      next: (querySnapShot) => {
        const projects = querySnapShot.docs.reduce(
          (acc, doc) => ({ ...acc, [doc.id]: { ...doc.data(), id: doc.id } }),
          {}
        );
        setProjects(projects);
        setIsLoading(false);
      },
    });
    return () => unsubscribe();
  }, []);

  return (
    <ProjectContext.Provider value={{ projects, isLoading }}>
      {children}
    </ProjectContext.Provider>
  );
};

export { ProjectContext, ProjectProvider };
