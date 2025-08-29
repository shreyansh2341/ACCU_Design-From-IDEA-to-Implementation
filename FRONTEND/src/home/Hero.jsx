import React from 'react'
import { useAuth } from '@/context/AuthProvider'
import { SLink } from '@/components/SLink';

const Hero = () => {
  const { blogs } = useAuth()

  return (
    <div className="container relative z-20 mx-auto px-4 py-8">
      <h1 className="text-2xl font-semibold mb-6 text-center">Recent Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {blogs && blogs.length > 0 ? (
          blogs.slice(0, 4).map((element) => (
            <SLink
              to="/blog"
              key={element._id}
              className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out h-[460px] flex flex-col"
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                <img
                  src={element.blogImage.url}
                  alt="blog"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-75 group-hover:opacity-100 transition duration-300 pointer-events-none" />
                <h1 className="absolute bottom-4 left-4 text-yellow-500 text-xl font-bold group-hover:text-blue-500 transition-colors duration-300 z-10">
                  {element.title}
                </h1>
              </div>

              {/* Category - No Heading */}
              <div className="absolute top-4 left-4 text-white bg-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
                {element.category}
              </div>

              {/* Admin Info */}
              <div className="p-4 flex items-center mt-auto ">
                <img
                  src={element.adminphoto}
                  alt=""
                  className="w-12 h-12 rounded-full border-2 border-blue-500"
                />
                <div className="ml-4">
                  <p className="text-lg font-semibold text-gray-800">{element.adminName}</p>
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