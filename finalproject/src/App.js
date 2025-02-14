import "./App.css";

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import Login from "./components/Auth/Login/Login";
import Main from "./components/Main/Main";
import styled from "styled-components";
import KakaoMapInfo from "./components/Kakaomap/KakaomapInfo";
import KakaoMapIn from "./components/Kakaomap/Kakaomap";
import Header from "./components/Header/Header";
import Join from "./components/Auth/Join/Join";
import MyPage from "./components/Auth/MyPage/MyPage";
import UpdateInfo from "./components/Auth/UpdateInfo/UpdateInfo";
import AdMain from "./components/Admin/AdMain/AdMain";
import AdMember from "./components/Admin/AdMember/AdMember";
import ViewMyPlan from "./components/Kakaomap/ViewMyPlan/ViewMyPlan";

function App() {
  const AppContent = styled.div`
    padding-top: 80px; /* 헤더 높이만큼 여백 추가 */
  `;

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
        </Routes>
      </AuthProvider>

      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
    </div>
  );
}

export default App;
