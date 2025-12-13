import React from 'react';
import { SLink } from '@/components/SLink';

const SolarBatteryLearnMore = () => {
    return (
        <section className="w-full min-h-screen bg-gradient-to-r from-blue-50 to-blue-100 py-12 px-6 md:px-20">
            <div className="max-w-4xl mx-auto text-center">
                <h1 className="text-4xl md:text-5xl font-bold text-blue-800 mb-4">
                    Learn More About Our Solar Battery Solutions
                </h1>
                <p className="text-lg md:text-xl text-blue-700 mb-8">
                    Explore how our cutting-edge solar battery systems provide reliable,
                    sustainable, and efficient energy storage for residential, commercial,
                    and industrial applications.
                </p>
                <img
                    src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753339757/website_static_media/Solar_Storage.jpg"
                    alt="Solar Battery Technology"
                    className="w-full rounded-2xl shadow-lg mb-8 border-4 border-transparent bg-clip-padding bg-gradient-to-r from-blue-400 via-blue-500 to-blue-700 p-1 hover:shadow-[0_0_25px_rgba(59,130,246,0.7)] transition-all duration-300"
                />
            </div>

            <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
                {[
                    {
                        title: "Why Choose Us",
                        text: "We combine advanced battery technology with intelligent energy management systems to ensure maximum storage efficiency, longer lifespan, and consistent power supply for your needs."
                    },
                    {
                        title: "Our Capabilities",
                        text: "From lithium-ion and lead-acid battery solutions to hybrid storage systems, we offer a range of products designed for high performance, safety, and reliability under various environmental conditions."
                    },
                    {
                        title: "Commitment to Quality",
                        text: "Our products undergo rigorous testing and comply with international safety and performance standards to deliver dependable energy storage for years to come."
                    }
                ].map((card, i) => (
                    <div
                        key={i}
                        className="bg-white rounded-2xl p-6 shadow-lg border border-transparent hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300"
                    >
                        <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                            {card.title}
                        </h2>
                        <p className="text-blue-700">{card.text}</p>
                    </div>
                ))}

                <div className="bg-white rounded-2xl p-6 shadow-lg border border-transparent hover:border-blue-500 hover:shadow-[0_0_20px_rgba(59,130,246,0.6)] transition-all duration-300">
                    <h2 className="text-2xl font-semibold text-blue-800 mb-2">
                        Get in Touch
                    </h2>
                    <p className="text-blue-700 mb-4">
                        Looking for the perfect solar battery solution? Contact us today and
                        let’s design a system that fits your energy needs.
                    </p>
                    <SLink
                        to="/contact-us"
                        className="relative inline-block overflow-hidden rounded-lg font-semibold py-3 px-6 shadow-lg bg-blue-700 text-white transition-all duration-300 group"
                    >
                        {/* Hover Gradient Layer */}
                        <span className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-800 translate-x-[-100%] group-hover:translate-x-0 transition-transform duration-500 ease-out"></span>

                        {/* Text */}
                        <span className="relative z-10">
                            Contact Us →
                        </span>
                    </SLink>
                </div>
            </div>
        </section>
    );
};

export default SolarBatteryLearnMore;
