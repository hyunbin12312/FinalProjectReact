import "./App.css";
import { useState, useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";

import Login from "./components/Member/Login/Login";
import Main from "./components/Main/Main";
import KakaoMapInfo from "./components/Kakaomap/KakaomapInfo";
import Header from "./components/Header/Header";
import Join from "./components/Member/Join/Join";
import MyPage from "./components/Member/MyPage/MyPage";
import UpdateInfo from "./components/Member/UpdateInfo/UpdateInfo";
import AdMain from "./components/Admin/AdMain/AdMain";
import AdMember from "./components/Admin/AdMember/AdMember";
import ViewMyPlan from "./components/Kakaomap/ViewMyPlan/ViewMyPlan";

import FindInfo from "./components/Member/FindInfo/FindInfo";
import FindPwd from "./components/Member/FindInfo/FindPwd";
import axios from "axios";

function App() {
  // const [response, setResponse] = useState("");
  const auth = useContext(AuthProvider);

  // useEffect(() => {
  //   const token = localStorage.getItem("refreshToken");
  //   axios.interceptors.response.use(
  //     async (response) => {
  //       const e = await axios.post(
  //         "http://localhost/member/refresh",
  //         token,
  //         null
  //       );
  //       return response;
  //     },
  //     async (error) => {
  //       if (error.response.status === 401) {
  //         const run = async () => {
  //           const response = await axios
  //             .post("http://localhost/member/refresh", token, null)
  //             .then((response) => {
  //               localStorage.setItem("username", response.data.username);
  //               localStorage.setItem("accessToken", response.data.accessToken);
  //               localStorage.setItem(
  //                 "refreshToken",
  //                 response.data.refreshToken
  //               );
  //               localStorage.setItem("role", response.data.role);
  //             });
  //         };
  //         run();
  //       } else {
  //         console.error("서버 오류 발생: ", error.response.data);
  //       }
  //       return Promise.reject(error);
  //     }
  //   );
  // }, [response]);

  return (
    <div className="App">
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/map" element={<KakaoMapInfo />} />
          <Route path="/map/list" element={<ViewMyPlan />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/myPage" element={<MyPage />} />
          <Route path="/updateInfo" element={<UpdateInfo />} />
          <Route path="/admin" element={<AdMain />} />
          <Route path="/admin/findMember" element={<AdMember />} />
          <Route path="/findInfo" element={<FindInfo />} />
          <Route path="/findPwd" element={<FindPwd />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
