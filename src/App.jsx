import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './component/Navbar';
import Home from './pages/Home';
import View from './pages/Client/View';
import Manage from './pages/Client/Manage';
import History from './pages/History';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <div className="flex">
        {/* 수직 네비게이션 바 */}
        <Navbar />

        {/* 로그인 페이지 또는 다른 페이지 */}
        <div className="flex-grow p-8">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/client/view" element={<View />} />
            <Route path="/client/manage" element={<Manage />} />
            <Route path="/history" element={<History />} />

            {/* 로그인 페이지는 화면 중앙에 배치 */}
            <Route
              path="/login"
              element={
                <div className="login-container">
                  <Login />
                </div>
              }
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;