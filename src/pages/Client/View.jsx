import { useState } from 'react';
import axios from 'axios';

const ClientView = () => {
  const [clients, setClients] = useState([]); // 클라이언트 정보를 저장할 상태
  const [loading, setLoading] = useState(false); // 로딩 상태 관리

  // 조회 버튼 클릭 시 호출되는 함수
  const fetchClients = async () => {
    setLoading(true); // 로딩 시작
    try {
      const response = await axios.get('https://localhost:7052/api/clients'); // RESTful API 호출
      setClients(response.data); // 응답 데이터를 상태에 저장
    } catch (error) {
      console.error('Error fetching clients:', error);
      alert('Failed to fetch client data.');
    } finally {
      setLoading(false); // 로딩 종료
    }
  };

  return (
    <div className="client-view-container">
      <h2 className="text-2xl font-bold text-center text-white mb-6">Client Information</h2>

      {/* 조회 버튼 */}
      <button 
        onClick={fetchClients} 
        className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-200"
      >
        {loading ? 'Loading...' : '조회'}
      </button>

      {/* 데이터 그리드 */}
      <div className="mt-6">
        {clients.length > 0 ? (
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border border-gray-300 px-4 py-2 text-white">ID</th>
                <th className="border border-gray-300 px-4 py-2 text-white">Client Type</th>
                <th className="border border-gray-300 px-4 py-2 text-white">IP Address</th>
                <th className="border border-gray-300 px-4 py-2 text-white">Description</th>
                <th className="border border-gray-300 px-4 py-2 text-white">Created At</th>
              </tr>
            </thead>
            <tbody>
              {clients.map((client) => (
                <tr key={client.id}>
                  <td className="border border-gray-300 px-4 py-2 text-white">{client.id}</td>
                  <td className="border border-gray-300 px-4 py-2 text-white">{client.clientType}</td>
                  <td className="border border-gray-300 px-4 py-2 text-white">{client.ipAddress}</td>
                  <td className="border border-gray-300 px-4 py-2 text-white">{client.description}</td>
                  <td className="border border-gray-300 px-4 py-2 text-white">{new Date(client.createAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          !loading && <p>No client data available.</p> // 데이터가 없을 때 메시지 표시
        )}
      </div>
    </div>
  );
};

export default ClientView;