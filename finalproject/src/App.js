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
  const [response, setResponse] = useState("");
  const auth = useContext(AuthProvider);
  useEffect(() => {
    axios.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          console.log("인터셉터 호출");
          /*
            1. accessToken만료로 401 발생
            2. axios interceptors에서 현재 사용자의 refToken(auth에서 가져와 식별) 서버로 보냄
            3. refToken 만료 안됐다면 새 토큰 발급 받아서 반환 받고 localStorage에 set
            4. 다시 발급받은 accessToken으로 재요청 or refToken 만료면 로그아웃 시키려 했으나..
               필터를 못넘어감
          */
          axios
            .post("http://localhost/member/refresh", auth.refreshToken, {
              headers: { "Content-Type": "text/plain" },
            })
            .then((response) => {
              console.log(response.data.refreshToken);
              localStorage.setItem("username", response.data.username);
              localStorage.setItem("accessToken", response.data.accessToken);
              localStorage.setItem("refreshToken", response.data.refreshToken);
              localStorage.setItem("role", response.data.role);
            });
        } else {
          console.error("서버 오류 발생: ", error.response.data);
        }
        return Promise.reject(error);
      }
    );
  }, [response]);

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
