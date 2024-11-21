import React, { useState } from 'react';

const LoginPage = () => {
  // 상태 관리: userId와 password
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  // 로그인 버튼 클릭 시 처리 함수
  const handleLogin = (e) => {
    e.preventDefault();
    console.log('User ID:', userId);
    console.log('Password:', password);
    // 실제 로그인 로직은 여기서 처리 (예: API 호출)
  };

  // 회원가입 버튼 클릭 시 처리 함수
  const handleRegister = () => {
    console.log('Redirect to register page');
    // 실제 회원가입 페이지로 이동 로직은 여기서 처리
  };

  return (
    <div className="login-container"> {/* Flexbox 중앙 정렬 적용 */}
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">User Login</h2>

        {/* User ID 입력 */}
        <label htmlFor="userId" className="block text-gray-700 mb-2">User ID</label>
        <input
          type="text"
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter your user ID"
          className="w-full p-2 mb-4 border border-gray-300 rounded"
        />

        {/* Password 입력 */}
        <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          className="w-full p-2 mb-6 border border-gray-300 rounded"
        />

        {/* Login 버튼 */}
        <button
          onClick={handleLogin}
          className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200 mb-4"
        >
          Login
        </button>

        {/* Register 버튼 */}
        <button
          onClick={handleRegister}
          className="w-full bg-gray-500 text-white py-2 rounded hover:bg-gray-600 transition duration-200"
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default LoginPage;