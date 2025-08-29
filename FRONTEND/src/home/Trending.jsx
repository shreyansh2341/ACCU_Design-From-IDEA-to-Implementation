import React from 'react'
import { useAuth } from '@/context/AuthProvider'
import { SLink } from '@/components/SLink';
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'

const Trending = () => {
  const { blogs } = useAuth()

  const responsive = {
    superLargeDesktop: {
      breakpoint: { max: 4000, min: 3000 },
      items: 5,
    },
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 4,
    },
    tablet: {
      breakpoint: { max: 1024, min: 640 },
      items: 2,
    },
    mobile: {
      breakpoint: { max: 640, min: 0 },
      items: 1,
    },
  }

  return (
    <div className=" mx-auto z-10 px-4 py-16">
      <h1 className="text-2xl font-semibold mb-6 text-center">Trending</h1>
      <div className="relative max-w-7xl mx-auto z-1000">
        <Carousel responsive={responsive} itemClass="px-4">
          {blogs && blogs.length > 0 ? (
            blogs.slice(0, 6).map((element) => (
              <SLink
                to="/blog"
                key={element._id}
                className="group bg-white rounded-xl shadow-md hover:shadow-xl overflow-hidden transform hover:scale-105 transition duration-300 ease-in-out h-[420px] flex flex-col"
              >
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

                <div className="absolute top-4 left-4 text-white bg-blue-500 px-3 py-1 rounded-full text-sm font-semibold">
                  {element.category}
                </div>

                <div className="p-4 flex items-center mt-auto">
                  <img
                    src={element.adminphoto}
                    alt=""
                    className="w-12 h-12 rounded-full border-2 border-blue-500"
                  />
                  <div className="ml-4">
                    <p className="text-lg font-semibold text-gray-800">{element.adminName}</p>
                    <p className="text-xs text-gray-400">New</p>
                  </div>
                </div>
              </SLink>
            ))
          ) : (
            <div className="text-center text-gray-500">
              No blogs available
            </div>
          )}
        </Carousel>
      </div>
    </div>
  )
}

export default Trending

