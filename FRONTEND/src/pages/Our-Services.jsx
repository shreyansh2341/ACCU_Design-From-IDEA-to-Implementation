import React from 'react';
import { SLink } from '@/components/SLink';

const services = [
    { title: 'Machining', image: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753296055/website_static_media/parent_service_machinr.jpg' },
    { title: 'Laser Cutting', image: ' https://res.cloudinary.com/dxrryep5y/image/upload/v1753296048/website_static_media/parent_service_leaser_cutting.png' },
    { title: 'Bending', image: ' https://res.cloudinary.com/dxrryep5y/image/upload/v1753295966/website_static_media/parent_service_bending.jpg' },
    { title: '3D Printing', image: ' https://res.cloudinary.com/dxrryep5y/image/upload/v1753295958/website_static_media/parent_service_3d_printing.png' },
    // { title: 'Fabrication', image: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295810/website_static_media/fabrication2.png' },
    { title: 'Casting', image: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753295980/website_static_media/parent_service_casting.jpg' },
    { title: 'Gear Manufacturing', image: ' https://res.cloudinary.com/dxrryep5y/image/upload/v1753296045/website_static_media/parent_service_gear_manifacturing.jpg' },
    { title: 'Wire Cutting', image: 'https://res.cloudinary.com/dxrryep5y/image/upload/v1753296060/website_static_media/parent_service_wire_cuttig.jpg' },
];

export default function OurServices() {
    return (
        <>
            <section className="w-screen bg-black/70 bg-[url('https://res.cloudinary.com/dxrryep5y/image/upload/v1753295645/website_static_media/Blog.png')] bg-cover bg-blend-darken">
                <div className="h-[46vh] w-full flex flex-col justify-center items-center">
                    <h1 className="text-white text-5xl font-light text-center">Services</h1>
                </div>
            </section>

            <section className="bg-gray-100 px-5 py-10">
                <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {services.map(({ title, image }) => (
                        <div key={title} className="border p-5 bg-white text-center transition-transform duration-200 ease-in-out hover:scale-105 hover:shadow-md">
                            <img src={image} alt={title} className="max-w-[80%] mx-auto mb-3" loading="lazy"/>
                            <h3 className="mb-4 text-gray-800 text-lg font-medium">{title}</h3>
                            <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-800 transition">
                                <SLink to="#">Book Now</SLink>
                            </button>
                        </div>
                    ))}
                </div>
            </section>

            <section className="text-center mt-8 mb-20">
                <a
                    href="/machining"
                    className="inline-block bg-blue-700 text-white text-lg px-6 py-3 rounded hover:bg-blue-900 transition"
                >
                    EXPLORE MORE
                </a>
            </section>


            {/* <a href="#" className="fixed right-4 bottom-5">
                <img src=" https://res.cloudinary.com/dxrryep5y/image/upload/v1753296077/website_static_media/upward-arrow.png" alt="upward-arrow button" className="w-[50px] pb-[5%]" />
            </a> */}
        </>
    );
}
