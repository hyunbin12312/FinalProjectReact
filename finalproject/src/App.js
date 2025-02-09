import "./App.css";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./components/context/AuthContext";
import Login from "./components/Auth/Login/Login";
import KakaoMap from "./components/Kakaomap/Kakaomap";
import Kakaomap from "./components/Kakaomap/Kakaomap";
import MoveMap from "./components/Kakaomap/aaaaa";
import Main from "./components/Main/Main";

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/map" element={<KakaoMap />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </div>
  );
}

export default App;
