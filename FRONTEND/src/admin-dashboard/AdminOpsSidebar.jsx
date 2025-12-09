// import React from "react";
// import { useLocation } from "react-router-dom";
// import { SLink } from "@/components/SLink";
// import {
//   FaClipboardList,
//   FaUsers,
//   FaHome,
//   FaTachometerAlt,
//   FaComments,
//   FaBan,
//   FaStarHalfAlt,
// } from "react-icons/fa";

// const AdminOpsSidebar = () => {
//   const location = useLocation();

//   const navItems = [
//     {
//       label: "Orders",
//       path: "/manage-orders",
//       icon: <FaClipboardList />,
//     },
//     {
//       label: "Chats",
//       path: "/manage-chats",
//       icon: <FaComments />,
//     },
//     {
//       label: "Cancel Requests",
//       path: "/manage-cancellations",
//       icon: <FaBan />,
//     },
//     {
//       label: "Users & Vendors",
//       path: "/manage-users",
//       icon: <FaUsers />,
//     },
//     {
//       label: "CMS Dashboard",
//       path: "/admin-dashboard",
//       icon: <FaTachometerAlt />,
//     },
//     {
//       label: "Back to Website",
//       path: "/",
//       icon: <FaHome />,
//     },
//     {
//       label: "Order Reviews",
//       key: "reviews",
//       icon: <FaStarHalfAlt />,
//     },
//   ];

//   const isActive = (path) =>
//     location.pathname === path ||
//     (path.includes("/admin/order") &&
//       location.pathname.startsWith("/admin/order"));

//   return (
//     <aside
//       className="hidden md:flex flex-col w-64 min-h-screen p-4
//                  bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]
//                  border-r border-blue-50"
//     >
//       {/* Logo + Title */}
//       <div className="mb-4 flex items-center gap-3 px-2 py-2.5 rounded-2xl bg-white/70 border border-blue-50 shadow-sm shadow-slate-200">
//         <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/40 overflow-hidden">
//           <img
//             src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295781/website_static_media/ad_logo.svg"
//             alt="ACCU Design"
//             className="w-8 h-8 object-contain"
//           />
//         </div>
//         <div>
//           <h1 className="text-sm font-semibold text-gray-800">
//             ACCU <span className="text-blue-500">Design</span>
//           </h1>
//           <p className="text-[11px] text-gray-500">Admin Ops Dashboard</p>
//         </div>
//       </div>

//       {/* Nav Items */}
//       <nav className="flex-1 space-y-2 mt-1">
//         {navItems.map((item) => {
//           const active = isActive(item.path);
//           return (
//             <SLink
//               key={item.path}
//               to={item.path}
//               className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium
//                           border transition-all duration-200
//                           ${active
//                   ? "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white border-transparent shadow-[0_10px_25px_rgba(37,99,235,0.6)]"
//                   : "bg-white border-blue-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:border-blue-300 hover:text-blue-700 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(148,163,184,0.45)] active:translate-y-0 active:shadow-md"
//                 }`}
//             >
//               <span
//                 className={`flex items-center justify-center w-7 h-7 rounded-full text-xs
//                             ${active
//                     ? "bg-white/20"
//                     : "bg-blue-50 text-blue-500"
//                   }`}
//               >
//                 {item.icon}
//               </span>
//               <span className="truncate">{item.label}</span>
//             </SLink>
//           );
//         })}
//       </nav>

//       {/* Footer */}
//       <div className="mt-3 text-center text-[10px] text-gray-400">
//         &copy; {new Date().getFullYear()} ACCU DESIGN • Admin Ops
//       </div>
//     </aside>
//   );
// };

// export default AdminOpsSidebar;

import React from "react";
import { useLocation } from "react-router-dom";
import { SLink } from "@/components/SLink";
import {
  FaClipboardList,
  FaUsers,
  FaHome,
  FaTachometerAlt,
  FaComments,
  FaBan,
  FaStarHalfAlt,
} from "react-icons/fa";

const AdminOpsSidebar = () => {
  const location = useLocation();

  const navItems = [
    {
      label: "Orders",
      path: "/manage-orders",
      icon: <FaClipboardList />,
    },
    {
      label: "Chats",
      path: "/manage-chats",
      icon: <FaComments />,
    },
    {
      label: "Cancel Requests",
      path: "/manage-cancellations",
      icon: <FaBan />,
    },
    {
      label: "Users & Vendors",
      path: "/manage-users",
      icon: <FaUsers />,
    },
    {
      label: "CMS Dashboard",
      path: "/admin-dashboard",
      icon: <FaTachometerAlt />,
    },
    {
      label: "Back to Website",
      path: "/",
      icon: <FaHome />,
    },
    {
      label: "Order Reviews",
      path: "/admin/reviews", // ✅ add proper path so it doesn't break
      icon: <FaStarHalfAlt />,
    },
  ];

  const isActive = (path) => {
    if (!path) return false; // ✅ guard against undefined

    return (
      location.pathname === path ||
      (path.includes("/admin/order") &&
        location.pathname.startsWith("/admin/order"))
    );
  };

  return (
    <aside
      className="hidden md:flex flex-col w-64 min-h-screen p-4
                 bg-white shadow-[0_10px_30px_rgba(15,23,42,0.12)]
                 border-r border-blue-50"
    >
      {/* Logo + Title */}
      <div className="mb-4 flex items-center gap-3 px-2 py-2.5 rounded-2xl bg-white/70 border border-blue-50 shadow-sm shadow-slate-200">
        <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-500 flex items-center justify-center shadow-md shadow-blue-500/40 overflow-hidden">
          <img
            src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295781/website_static_media/ad_logo.svg"
            alt="ACCU Design"
            className="w-8 h-8 object-contain"
          />
        </div>
        <div>
          <h1 className="text-sm font-semibold text-gray-800">
            ACCU <span className="text-blue-500">Design</span>
          </h1>
          <p className="text-[11px] text-gray-500">Admin Ops Dashboard</p>
        </div>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 space-y-2 mt-1">
        {navItems.map((item) => {
          const active = isActive(item.path);
          return (
            <SLink
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-xl text-sm font-medium
                          border transition-all duration-200
                          ${
                            active
                              ? "bg-gradient-to-r from-blue-500 via-blue-600 to-indigo-500 text-white border-transparent shadow-[0_10px_25px_rgba(37,99,235,0.6)]"
                              : "bg-white border-blue-100 text-gray-700 hover:bg-gradient-to-r hover:from-blue-50 hover:via-white hover:to-blue-100 hover:border-blue-300 hover:text-blue-700 hover:-translate-y-[1px] hover:shadow-[0_8px_18px_rgba(148,163,184,0.45)] active:translate-y-0 active:shadow-md"
                          }`}
            >
              <span
                className={`flex items-center justify-center w-7 h-7 rounded-full text-xs
                            ${
                              active
                                ? "bg-white/20"
                                : "bg-blue-50 text-blue-500"
                            }`}
              >
                {item.icon}
              </span>
              <span className="truncate">{item.label}</span>
            </SLink>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="mt-3 text-center text-[10px] text-gray-400">
        &copy; {new Date().getFullYear()} ACCU DESIGN • Admin Ops
      </div>
    </aside>
  );
};

export default AdminOpsSidebar;
