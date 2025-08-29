import React from 'react';

const UserSidebar = ({ component, setComponent }) => {
  return (
    <div className="w-64 h-screen fixed bg-green-800 text-white">
      <div className="p-4 font-bold text-xl">User Panel</div>
      <ul>
        <li className="p-4 hover:bg-green-700 cursor-pointer" onClick={() => setComponent('My Profile')}>
          My Profile
        </li>
      </ul>
    </div>
  );
};

export default UserSidebar;
