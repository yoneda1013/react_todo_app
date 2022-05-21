import React, { useContext } from "react";
import { Header } from "./Header";
import { Form } from "./Form";
import { ProjectContext } from "../contexts/ProjectContext";
import { useParams } from "react-router-dom";

export const Edit = () => {
  const { id } = useParams();
  const { projects, isLoading } = useContext(ProjectContext);

  return (
    <>
      <Header />
      {!isLoading && <Form project={projects[id]} />}
    </>
  );
};
