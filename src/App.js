import "./App.css";
// import Calender from './compornents/Calender'
import { useState, useEffect, useContext } from "react";
import { Home } from "./compornents/Home";
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
import moment from 'moment';

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
  const [cmykBool, setCmykBool] = useState(false);
  const [tonboBool, setTonboBool] = useState(false);
  const [dataTypeBool, setDataTypeBool] = useState(false);
  const [imgTypeBool, setImgTypeBool] = useState(false);
  const [koritsuBool, setKoritsuBool] = useState(false);

  const [deadlineDate, setDeadlineDate] = useState(new Date());
  const [projectsParams, setProjectsParams] = useState(false);
  // const onClickCheck = (event) => setCmykInput(event.target.value);
  const onCheckCmyk = (event) => setCmykBool(!cmykBool);
  const onCheckTonbo = (event) => setTonboBool(!tonboBool);
  const onCheckDataType = (event) => setDataTypeBool(!dataTypeBool);
  const onCheckImgTypeBool = (event) => setImgTypeBool(!imgTypeBool);
  const onCheckKoritsu = (event) => setKoritsuBool(!koritsuBool);
  const onChangeTitle = (event) => setTitle(event.target.value);
  const params = useParams();
  const parseAsMoment = (deadlineDate) => {
    return moment.utc(deadlineDate, 'YYYY-MM-DD').utcOffset(9);}
    //momentのせいで現在時刻になってしまっている

  const onClickAdd = () => {
    alert("保存が完了しました！");
    console.log(db.collection("projects"));
    db.collection("projects").doc(docId).set({
      uid: currentUser.uid,
      title,
      cmykText,
      tonboText,
      dataTypeText,
      imgTypeText,
      cmykBool,
      tonboBool,
      dataTypeBool,
      imgTypeBool,
      koritsuBool,
      deadlineDate : parseAsMoment(deadlineDate).format("YYYY/MM/DD"),
    });
  };
  // console.log(parseAsMoment(deadlineDate).format("YYYY/MM/DD"))


  useEffect(() => {
    const projectsCollectionRef = collection(db, "projects");
    // console.log(projectsCollectionRef);
    //dbのコレクションを参照。
    getDocs(projectsCollectionRef).then((querySnapShot) => {
      // console.log(querySnapShot);
      //querySnapShotの中にあるdocsは配列。forEachで展開してdocを取り出す。doc.data()でdocのなかでネストになっているdataを取り出す。
      // querySnapShot.docs.forEach((doc) => console.log(doc.data()));
      //getDocsでコレクションの取得 querySnapShotのdocはarray
      setProjects(
        querySnapShot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
      );
    });
  }, []);
  const test = true;
  

  return (
    <>
      <AuthProvider>
        {/* <BrowserRouter> */}
        {projectsParams && "true"}
        <Routes>
          {/* <Route path="/" element ={<PrivateRoute><Home/></PrivateRoute>} /> */}
          <Route path="/" element={<PrivateRoute />}>
          <Route
              path="/"
              element={
                /*project[params.id]がfalseなら*/
                <Home
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
                  deadlineDate={deadlineDate}
                  setDeadlineDate={setDeadlineDate}
                  setProjectsParams={setProjectsParams}
                />
              }
            />
             {test ? <>
              <Route
              path="/"
              element={
                /*project[params.id]がfalseなら*/
                <Home
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
                  deadlineDate={deadlineDate}
                  setDeadlineDate={setDeadlineDate}
                  setProjectsParams={setProjectsParams}
                />
              }
            /></>
          :
          <Route
            path=":id"
            element={
              <Home
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
                deadlineDate={deadlineDate}
                setDeadlineDate={setDeadlineDate}
                projectsParams={projectsParams}
                setProjectsParams={setProjectsParams}
              />
            }
          />
          } 
  
            <Route
              path="/list"
              element={
                <List
                  projects={projects}
                  setProjects={setProjects}
                  docId={docId}
                  deadlineDate={deadlineDate}
                  setProjectsParams={setProjectsParams}
                  projectsParams={projectsParams}
                />
              }
            />
          </Route>
          {/* project[params.id]がtrueなら */}
          {/* <Route
            path=":id"
            element={
              <Home
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
                deadlineDate={deadlineDate}
                setDeadlineDate={setDeadlineDate}
                projectsParams={projectsParams}
                setProjectsParams={setProjectsParams}
              />
            }
          /> */}

          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>

        {/* </BrowserRouter> */}
      </AuthProvider>
    </>
  );
};
