import React from 'react';
import { useAuth } from '@/context/AuthProvider.jsx';
import { useNavigate } from 'react-router-dom';

const gotoHome = () => {
  navigateTo('/');
};

const VendorSidebar = ({ component, setComponent }) => {
  return (
    <div className="w-64 h-screen fixed bg-blue-800 text-white">
      <div className="p-4 font-bold text-xl">Vendor Panel</div>
      <ul>
        <li className="p-4 hover:bg-blue-700 cursor-pointer" onClick={() => setComponent('My Profile')}>
          My Profile
        </li>
        <button onClick={gotoHome} className="w-full px-4 py-2 bg-orange-500 rounded-lg hover:bg-orange-700 transition duration-300">HOME</button>
      </ul>
    </div>
  );
};

export default VendorSidebar;
