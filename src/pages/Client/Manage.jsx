import { useState } from 'react';
import axios from 'axios';

const Manage = () => {
  const [clientType, setClientType] = useState('');
  const [ipAddress, setIpAddress] = useState('');
  const [description, setDescription] = useState('');
  const [createAt, setCreateAt] = useState('');
  const [ipError, setIpError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false); // 요청 성공 여부 상태

  const validateIpAddress = (ip) => {
    const ipPattern = /^(\d{1,3}\.){3}\d{1,3}$/;
    if (!ipPattern.test(ip)) {
      return false;
    }
    const parts = ip.split('.');
    return parts.every(part => parseInt(part) >= 0 && parseInt(part) <= 255);
  };

  const handleIpChange = (e) => {
    const value = e.target.value;
    setIpAddress(value);
    if (value && !validateIpAddress(value)) {
      setIpError('유효하지 않은 IP 주소입니다.');
    } else {
      setIpError('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (ipError) {
      return;
    }

    const clientData = {
      clientType,
      ipAddress,
      description,
      createAt: new Date(createAt).toISOString()
    };

    try {
      const response = await axios.post('https://localhost:7052/api/clients', clientData);
      console.log('Client added successfully:', response.data);

      // 요청 성공 시 상태를 업데이트하여 폼을 숨기고 메시지를 표시
      setIsSuccess(true);
    } catch (error) {
      console.error('Error adding client:', error);
      // 오류 메시지 표시
    }
  };

    // 성공 메시지를 클릭했을 때 폼으로 돌아가기
    const handleSuccessClick = () => {
      // 상태 초기화
      setIsSuccess(false);
      setClientType('');
      setIpAddress('');
      setDescription('');
      setCreateAt('');
    };

  return (
    <div className="login-container">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
        {/* 요청 성공 여부에 따라 다른 UI 표시 */}
        {isSuccess ? (
          <h2 className="text-2xl font-bold text-center text-green-500 cursor-pointer"
            onClick={handleSuccessClick}> Data Saved Successfully. Click here to add another client. </h2>
          ) : (
          <>
            <h2 className="text-2xl font-bold mb-6 text-center text-black">Manage Client</h2>

            <form onSubmit={handleSubmit}>
              {/* Client Type Combo Box */}
              <label htmlFor="clientType" className="block text-gray-700 mb-2">Client Type</label>
              <select
                id="clientType"
                value={clientType}
                onChange={(e) => setClientType(e.target.value)}
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                style={{ backgroundColor: '#f8f8f8' }}
                required
              >
                <option value="">Select Client Type</option>
                <option value="vision">Vision</option>
                <option value="amr">AMR</option>
                <option value="robot">Robot</option>
                <option value="smart glass">Smart Glass</option>
                <option value="tablet vision">Tablet Vision</option>
              </select>

              {/* IP Address 입력 */}
              <label htmlFor="ipAddress" className="block text-gray-700 mb-2">IP Address</label>
              <input
                type="text"
                id="ipAddress"
                value={ipAddress}
                onChange={handleIpChange}
                placeholder="Enter IP Address"
                className={`w-full p-2 mb-1 border rounded ${ipError ? 'border-red-500' : 'border-gray-300'}`}
                style={{ backgroundColor: '#f8f8f8' }}
                required
              />
              {ipError && <p className="text-red-500 text-sm mb-4">{ipError}</p>}

              {/* Description 입력 */}
              <label htmlFor="description" className="block text-gray-700 mb-2">Description</label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Enter Description"
                className="w-full p-2 mb-4 border border-gray-300 rounded"
                style={{ backgroundColor: '#f8f8f8' }}
              />

              {/* CreateAt 입력 */}
              <label htmlFor="createAt" className="block text-gray-700 mb-2">CreateAt</label>
              <input
                type="datetime-local"
                id="createAt"
                value={createAt}
                onChange={(e) => setCreateAt(e.target.value)}
                className="w-full p-2 mb-6 border border-gray-300 rounded"
                style={{ backgroundColor: '#f8f8f8' }}
                required
              />

              {/* 적용 버튼 */}
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-200"
                disabled={!!ipError}
              >
                Add Client
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default Manage;