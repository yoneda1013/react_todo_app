import "./App.css";
// import Calender from './compornents/Calender'
import { useState, useEffect, useContext } from "react";
import { Home } from "./compornents/Home";
import { Edit } from "./compornents/Edit";
import { AuthProvider, AuthContext } from "./auth/AuthProvider";
import { Login } from "./auth/Login";
import SignUp from "./auth/SignUp";
import { PrivateRoute } from "./auth/PrivateRoute";
import { List } from "./compornents/List";
import { db } from "./firebase/firebase";
import { collection, getDocs } from "firebase/firestore";
import { Route, Routes } from "react-router-dom";
import { useParams } from "react-router-dom";
import "react-datepicker/dist/react-datepicker.css";

export const App = () => {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState("");
  const { currentUser } = useContext(AuthContext);
  const docId = Math.random().toString(32).substring(2);
  const [cmykText, setCmykText] = useState("");
  const onChangeCmykText = (event) => setCmykText(event.target.value);
  const [tonboText, setTonboText] = useState("");
  const onChangeTonboText = (event) => setTonboText(event.target.value);
  const [dataTypeText, setDataTypeText] = useState("");
  const onChangeDataTypeText = (event) => setDataTypeText(event.target.value);
  const [imgTypeText, setImgTypeText] = useState("");
  const onChangeImgTypeText = (event) => setImgTypeText(event.target.value);
  const [urlText, setUrlText] = useState("");
  const onChangeUrlText = (event) => setUrlText(event.target.value);

  const [cmykBool, setCmykBool] = useState(false);
  const [tonboBool, setTonboBool] = useState(false);
  const [dataTypeBool, setDataTypeBool] = useState(false);
  const [imgTypeBool, setImgTypeBool] = useState(false);
  const [koritsuBool, setKoritsuBool] = useState(false);


  const [deadlineDate, setDeadlineDate] = useState(new Date());

  const onCheckCmyk = (event) => setCmykBool(!cmykBool);
  const onCheckTonbo = (event) => setTonboBool(!tonboBool);
  const onCheckDataType = (event) => setDataTypeBool(!dataTypeBool);
  const onCheckImgTypeBool = (event) => setImgTypeBool(!imgTypeBool);
  const onCheckKoritsu = (event) => setKoritsuBool(!koritsuBool);
  const onChangeTitle = (event) => setTitle(event.target.value);
  const params = useParams();
  
  const onClickAdd = () => {
    alert("保存が完了しました！");
    console.log(db.collection("projects"));
  
    db.collection("projects")
      .doc(docId)
      .set({
        uid: currentUser.uid,
        title,
        cmykText,
        tonboText,
        dataTypeText,
        imgTypeText,
        urlText,
        cmykBool,
        tonboBool,
        dataTypeBool,
        imgTypeBool,
        koritsuBool,
        deadlineDate,
      });
      setTitle("");
      setCmykText("");
      setTonboText("");
      setDataTypeText("");
      setImgTypeText("");
      setUrlText("");
      setDeadlineDate(new Date());
  }; 

  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    getDocs(projectsCollectionRef).then((querySnapShot) => {
      setProjects(
        querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);

  return (
    <>
      <AuthProvider>
        {/* <BrowserRouter> */}
        <Routes>
          <Route path="/" element={<PrivateRoute />}>
            <Route
              path="/"
              element={
                
                <Home
                  setProjects={setProjects}
                  title={title}
                  onChangeCmykText={onChangeCmykText}
                  onChangeTonboText={onChangeTonboText}
                  onChangeDataTypeText={onChangeDataTypeText}
                  onChangeImgTypeText={onChangeImgTypeText}
                  cmykBool={cmykBool}
                  tonboBool={tonboBool}
                  dataTypeBool={dataTypeBool}
                  imgTypeBool={imgTypeBool}
                  koritsuBool={koritsuBool}
                  onCheckCmyk={onCheckCmyk}
                  onCheckTonbo={onCheckTonbo}
                  onCheckDataType={onCheckDataType}
                  onCheckImgTypeBool={onCheckImgTypeBool}
                  onCheckKoritsu={onCheckKoritsu}
                  onChangeTitle={onChangeTitle}
                  onClickAdd={onClickAdd}
                  urlText={urlText}
                  onChangeUrlText={onChangeUrlText}
                  cmykText={cmykText}
                  tonboText={tonboText}
                  dataTypeText={dataTypeText}
                  imgTypeText={imgTypeText}
                  deadlineDate={deadlineDate}
                  setDeadlineDate={setDeadlineDate}
                />
              }
            />

            <Route
              path=":id"
              element={
                <Edit
                  projects={projects}
                  setProjects={setProjects}
                  title={title}
                  onChangeCmykText={onChangeCmykText}
                  onChangeTonboText={onChangeTonboText}
                  onChangeDataTypeText={onChangeDataTypeText}
                  onChangeImgTypeText={onChangeImgTypeText}
                  cmykBool={cmykBool}
                  tonboBool={tonboBool}
                  dataTypeBool={dataTypeBool}
                  imgTypeBool={imgTypeBool}
                  koritsuBool={koritsuBool}
                  onCheckCmyk={onCheckCmyk}
                  onCheckTonbo={onCheckTonbo}
                  onCheckDataType={onCheckDataType}
                  onCheckImgTypeBool={onCheckImgTypeBool}
                  onCheckKoritsu={onCheckKoritsu}
                  onChangeTitle={onChangeTitle}
                  onClickAdd={onClickAdd}
                  urlText={urlText}
                  onChangeUrlText={onChangeUrlText}
                  deadlineDate={deadlineDate}
                  setDeadlineDate={setDeadlineDate}
                />
              }
            />

            <Route
              path="/list"
              element={
                <List
                  projects={projects}
                  setProjects={setProjects}
                  docId={docId}
                  // deadlineDate={deadlineDate}
                />
              }
            />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        {/* </BrowserRouter> */}
      </AuthProvider>
    </>
  );
};
