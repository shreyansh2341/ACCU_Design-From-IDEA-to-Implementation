// import React from 'react'
// import { useAuth } from '@/context/AuthProvider'
// import { SLink } from '@/components/SLink';

// const Hero = () => {
//   const { blogs } = useAuth()

//   return (
//     <div className="container relative z-20 mx-auto px-4 py-8">
//       <h1 className="text-2xl font-semibold mb-6 text-center">Recent Blogs</h1>
//       <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
//         {blogs && blogs.length > 0 ? (
//           blogs.slice(0, 4).map((element) => (
//             <SLink
//               to="/blog"
//               key={element._id}
//               className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out h-[460px] flex flex-col"
//             >
//               {/* Image */}
//               <div className="relative h-64 overflow-hidden">
//                 <img
//                   src={element.blogImage.url}
//                   alt="blog"
//                   className="w-full h-full object-cover"
//                 />
//                 <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition duration-300 pointer-events-none" />
//                 <h1 className="absolute bottom-4 left-4 text-yellow-500 text-xl font-bold group-hover:text-blue-500 transition-colors duration-300 z-10">
//                   {element.title}
//                 </h1>
//               </div>

//               {/* Category - No Heading */}
//               <div className="absolute top-4 left-4 text-white bg-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
//                 {element.category}
//               </div>

//               {/* Admin Info */}
//               <div className="p-4 flex items-center mt-auto ">
//                 <img
//                   src={element.adminphoto}
//                   alt=""
//                   className="w-12 h-12 rounded-full border-2 border-blue-500"
//                 />
//                 <div className="ml-4">
//                   <p className="text-lg font-semibold text-gray-800">{element.adminName}</p>
//                 </div>
//               </div>
//             </SLink>
//           ))
//         ) : (
//           <div className="col-span-full text-center text-gray-500 text-2xl font-semibold">
//             No Blogs Available
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

// export default Hero

import React from 'react'
import { useAuth } from '@/context/AuthProvider'
import { SLink } from '@/components/SLink';

const Hero = () => {
  const { blogs } = useAuth()

  return (
    <div className="container relative z-20 mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center text-[#2479C2]">
        Recent Blogs
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 4).map((element) => (
            <SLink
              to="/blog"
              key={element._id}
              className="group bg-white/90 backdrop-blur-sm rounded-2xl border border-blue-50 
                         shadow-sm shadow-slate-200
                         hover:border-blue-200 hover:bg-gradient-to-br hover:from-blue-50/80 hover:via-white hover:to-blue-50
                         hover:shadow-[0_12px_30px_rgba(148,163,184,0.55)] transform hover:-translate-y-[3px]
                         transition-all duration-300 ease-out h-[460px] flex flex-col relative overflow-hidden"
            >
              {/* Category Tag */}
              <div className="absolute top-4 left-4 z-10">
                <span className="text-xs font-semibold text-white bg-blue-500/90 px-3 py-1 rounded-full shadow-sm shadow-blue-400/60">
                  {element.category}
                </span>
              </div>

              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={element.blogImage.url}
                  alt="blog"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/20 to-transparent opacity-80 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                <h1 className="absolute bottom-4 left-4 text-yellow-400 text-xl font-bold group-hover:text-blue-50 transition-colors duration-300 z-10 drop-shadow">
                  {element.title}
                </h1>
              </div>

              {/* Admin Info */}
              <div className="px-4 pt-3 flex items-center gap-3 mt-auto pb-4">
                <img
                  src={element.adminphoto}
                  alt=""
                  className="w-11 h-11 rounded-full border-2 border-blue-400 shadow-sm shadow-blue-200/80"
                />
                <div>
                  <p className="text-sm font-semibold text-gray-800">
                    {element.adminName}
                  </p>
                  <p className="text-[11px] text-gray-500">Author</p>
                </div>
              </div>
            </SLink>
          ))
        ) : (
          <div className="col-span-full text-center text-gray-500 text-2xl font-semibold">
            No Blogs Available
          </div>
        )}
      </div>
    </div>
  )
}

export default Hero
