import React, { useState, useEffect } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from "firebase/firestore";

import { db } from "../firebase/firebase";

const ProjectContext = React.createContext();

const ProjectProvider = ({ children }) => {
  const [projects, setProjects] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    const q = query(
      projectsCollectionRef,
      orderBy("createdAt", "desc"),
      limit(10)
    );
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