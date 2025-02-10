import "./App.css";

import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import Login from "./components/Auth/Login/Login";
import KakaoMap from "./components/Kakaomap/Kakaomap";
import Kakaomap from "./components/Kakaomap/Kakaomap";
import MoveMap from "./components/Kakaomap/aaaaa";
import Main from "./components/Main/Main";
import styled from "styled-components";
import KakaoMapInfo from "./components/Kakaomap/KakaomapInfo";
import Header from "./components/Header/Header";

function App() {
  const AppContent = styled.div`
    padding-top: 80px; /* 헤더 높이만큼 여백 추가 */
  `;

  return (
    <div className="App">

      <AuthProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/map" element={<KakaoMap />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>

      <Header />
      <KakaoMapInfo />
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
