import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  // Client 메뉴의 Sub Menu 표시 여부를 관리하는 상태
  const [showClientSubMenu, setShowClientSubMenu] = useState(false);

  // Client 버튼 클릭 시 Sub Menu 표시/숨기기 토글 함수
  const toggleClientSubMenu = (e) => {
    e.preventDefault(); // Link의 기본 동작을 막음
    setShowClientSubMenu(!showClientSubMenu);
  };

  // 다른 메뉴 클릭 시 Client Sub Menu를 닫는 함수
  const closeClientSubMenu = () => {
    if (showClientSubMenu) {
      setShowClientSubMenu(false); // Sub Menu가 열려 있으면 닫음
    }
  };

  return (
    <nav className="navbar h-screen bg-gray-800 text-white w-58 flex flex-col items-start p-4">
      <h1 className="text-3xl font-bold mb-8">BODA SYSTEM</h1>
      <ul className="flex flex-col space-y-4">
        <li>
          {/* Home 버튼 클릭 시 Sub Menu 닫기 */}
          <Link to="/" onClick={closeClientSubMenu} className="hover:bg-gray-700 p-2 rounded block">
            Home
          </Link>
        </li>
        <li>
          {/* Client 버튼도 Link로 구현 */}
          <Link to="/client" onClick={toggleClientSubMenu} className="hover:bg-gray-700 p-2 rounded block">
            Client
          </Link>

          {/* Sub Menu: Client 버튼이 클릭되면 표시 */}
          {showClientSubMenu && (
            <ul className="ml-6 mt-4 space-y-6"> {/* ml-6은 left margin, mt-4는 top margin, space-y-4로 수직 간격 설정 */}
              <li>
                <Link to="/client/view" className="hover:underline">View</Link>
              </li>
              <li>
                <Link to="/client/manage" className="hover:underline">Manage</Link>
              </li>
            </ul>
          )}
        </li>
        <li>
          {/* History 버튼 클릭 시 Sub Menu 닫기 */}
          <Link to="/history" onClick={closeClientSubMenu} className="hover:bg-gray-700 p-2 rounded block">
            History
          </Link>
        </li>
        <li>
          {/* Login 버튼 클릭 시 Sub Menu 닫기 */}
          <Link to="/login" onClick={closeClientSubMenu} className="hover:bg-gray-700 p-2 rounded block">
            Login
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;