import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { SLink } from '@/components/SLink';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.18,
    },
  },
};

const AboutUs = () => {
  useEffect(() => {
    const sectionId = sessionStorage.getItem('scrollToAboutSection');
    if (sectionId) {
      setTimeout(() => {
        const el = document.getElementById(sectionId);
        if (el) {
          const yOffset = -80;
          const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
          window.scrollTo({ top: y, behavior: 'smooth' });
        }
        sessionStorage.removeItem('scrollToAboutSection');
      }, 300);
    }
  }, []);

  return (
    <motion.div
      className="font-['Poppins'] overflow-x-hidden bg-[#f5f7fb]"
      initial="hidden"
      animate="visible"
      variants={staggerContainer}
    >
      {/* Hero Section */}
      <section
        className="bg-[rgba(0,0,0,0.7)] bg-cover bg-top bg-no-repeat bg-blend-darken
        bg-[url('https://res.cloudinary.com/dxrryep5y/image/upload/v1753295709/website_static_media/Mask_group_2.png')]
        w-screen overflow-hidden"
      >
        <motion.div
          className="min-h-[40vh] md:min-h-[46vh] w-full flex justify-center items-center flex-col px-4 py-16 md:py-20"
          variants={fadeInUp}
        >
          <div className="about">
            <h1 className="text-white text-3xl sm:text-4xl md:text-5xl text-center font-light tracking-wide">
              About Us
            </h1>
          </div>
        </motion.div>
      </section>

      {/* About ACCU DESIGN */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <div className="flex flex-col md:flex-row-reverse items-center md:items-start gap-10">
          {/* Text Section */}
          <motion.div
            className="w-full md:w-1/2 space-y-4"
            variants={fadeInUp}
          >
            <h1 className="text-3xl md:text-4xl mb-2 text-center md:text-left pt-1 font-semibold tracking-tight">
              About <span className="text-[#007AFF] font-semibold">ACCU</span> DESIGN
            </h1>
            <p className="text-justify text-sm md:text-base leading-relaxed text-gray-700">
              We at <strong>ACCU DESIGN</strong> specialize in precision manufacturing and the development of indigenous engineering solutions tailored to meet the unique needs of our clients. With a commitment to quality and innovation, we provide a comprehensive range of manufacturing capabilities—from product design and prototyping to full-scale production. Our advanced facilities and skilled team ensure high standards across all stages of manufacturing, enabling us to deliver reliable, efficient, and customized solutions for various industries. Whether it's creating complex parts or large-scale assemblies, ACCU DESIGN is dedicated to helping our clients bring their ideas to life with accuracy and excellence.
            </p>
          </motion.div>

          {/* Image Section */}
          <motion.div
            className="w-full md:w-1/2 flex justify-center"
            variants={fadeInUp}
          >
            <motion.img
              src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753295621/website_static_media/about_us.png"
              alt="About ACCU DESIGN"
              className="w-full max-w-sm md:max-w-md h-auto mx-auto p-2 rounded-2xl shadow-lg bg-white
               transition-shadow duration-500 ease-in-out
               hover:shadow-[0_0_30px_rgba(36,121,194,0.7)]"
              loading="lazy"
              whileHover={{ scale: 1.02 }}
            />
          </motion.div>
        </div>
      </section>

      {/* Vision & Mission Heading */}
      <motion.div
        id="mission"
        className="text-center max-w-6xl mx-auto px-4 md:px-6 lg:px-8 mt-4 mb-6"
        variants={fadeInUp}
      >
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
          Vision & <span className="text-[#007AFF] font-bold">Mission</span>
        </h1>
      </motion.div>

      {/* Vision & Mission Timeline */}
      <section className="bg-[#e6f0f8]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <div className="flex flex-col md:flex-row justify-center items-start space-y-10 md:space-y-0 md:space-x-10">
            {[
              {
                heading: 'Our Mission Statement',
                items: [
                  {
                    title: 'Precision',
                    desc: 'We are committed to delivering reliable and precise components that meet international standards, leveraging cutting-edge technology and the expertise of skilled professionals.',
                  },
                  {
                    title: 'Innovation',
                    desc: "We strive for continuous improvement and innovation, offering highly customized solutions that align with our clients' evolving needs.",
                  },
                  {
                    title: 'Customer Satisfaction',
                    desc: 'We are committed to delivering reliable and precise components that meet international standards, leveraging cutting-edge technology and the expertise of skilled professionals.',
                  },
                ],
              },
              {
                heading: 'Our Vision Statement',
                items: [
                  {
                    title: 'Integrity',
                    desc: 'We strive to be a beacon of integrity in the manufacturing industry, upholding the highest ethical standards and practicing responsible operations.',
                  },
                  {
                    title: 'Investment',
                    desc: 'We are dedicated to continual investment in our workforce, technology, and processes, ensuring we remain at the forefront of innovative manufacturing solutions.',
                  },
                  {
                    title: 'Leadership',
                    desc: 'We aspire to be recognized as a market leader by consistently delivering high-quality, precision products that surpass our customers\' expectations.',
                  },
                ],
              },
            ].map((sectionData, idx) => (
              <motion.div
                key={idx}
                className="flex flex-col items-start w-full md:w-1/2 relative"
                variants={fadeInUp}
              >
                <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center w-full tracking-tight">
                  {sectionData.heading}
                </h2>
                <div className="relative flex flex-col items-start pl-8 space-y-12">
                  {/* Vertical Line */}
                  <div className="absolute left-[12px] top-0 bottom-0 w-[3px] bg-[#2479C2] z-0 rounded-full" />

                  {/* Timeline Items */}
                  {sectionData.items.map((item, itemIdx) => (
                    <motion.div
                      key={itemIdx}
                      className="flex items-start relative z-10"
                      whileHover={{ x: 4 }}
                    >
                      {/* Dot */}
                      <div className="w-4 h-4 bg-[#2479C2] rounded-full absolute left-0 top-2 z-10 shadow-md" />
                      {/* Card */}
                      <div className="w-full p-6 border-[1.5px] border-[#2479C2] rounded-xl min-h-[160px] ml-6 bg-white shadow-sm">
                        <h3 className="text-lg md:text-xl font-bold mb-2">{item.title}</h3>
                        <p className="text-base md:text-lg text-gray-700">{item.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand Values */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
        <motion.div
          id="brand-values"
          className="text-center mb-8 md:mb-10"
          variants={fadeInUp}
        >
          <h1 className="text-3xl md:text-4xl font-semibold leading-snug tracking-tight">
            The <span className="text-[#007AFF] font-bold">ACCU</span> DESIGN <br className="hidden sm:block" />Brand Values
          </h1>
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-between gap-5 md:gap-6 mb-4 md:mb-6"
          variants={staggerContainer}
        >
          {[
            {
              title: 'Integrity',
              desc: 'At the heart of our operations, integrity guides every decision we make. We are dedicated to upholding the highest ethical standards, ensuring transparency and trust in all our relationships.',
            },
            {
              title: 'Fairness',
              desc: 'We believe in treating everyone with fairness and respect. We foster an environment where equal opportunities are provided, and decisions are made based on merit and ethical considerations.',
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className="flex-1 min-w-[260px] p-5 box-border text-justify bg-gray-100 rounded-2xl border border-[#FFA500] shadow-sm"
              variants={fadeInUp}
              whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
            >
              <h2 className="mb-2.5 font-semibold text-xl">{card.title}</h2>
              <p className="mb-3.5 text-justify text-lg text-gray-700">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="flex flex-wrap justify-between gap-5 md:gap-6"
          variants={staggerContainer}
        >
          {[
            {
              title: 'Honesty',
              desc: 'We prioritize open, truthful communication with our clients, partners, and employees. Our commitment to honesty ensures that every interaction is built on trust and mutual respect.',
            },
            {
              title: 'Accountability',
              desc: 'We take full responsibility for our actions, ensuring that every project is executed with precision and excellence. We hold ourselves accountable for the quality of our work, and our commitment to delivering reliable results is unwavering.',
            },
          ].map((card, idx) => (
            <motion.div
              key={idx}
              className="flex-1 min-w-[260px] p-5 box-border text-justify bg-gray-100 rounded-2xl border border-[#FFA500] shadow-sm"
              variants={fadeInUp}
              whileHover={{ y: -4, boxShadow: '0 10px 25px rgba(0,0,0,0.08)' }}
            >
              <h2 className="mb-2.5 font-semibold text-xl">{card.title}</h2>
              <p className="mb-3.5 text-justify text-lg text-gray-700">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* About Services */}
      <section className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 pb-12 md:pb-16">
        <motion.div
          id="about-services"
          className="font-sans leading-6 text-gray-700 p-6 md:p-8 border border-[#FFA500] rounded-3xl bg-white shadow-sm"
          variants={fadeInUp}
        >
          <p className="mb-4 text-lg">
            Welcome to ACCU DESIGN, your premier Manufacturing as a Service (MaaS) provider, where we prioritize seamless manufacturing and product development services according to your needs.
          </p>
          <p className="mb-4 text-lg">
            At Accu Design, we turn your ideas into reality. We’re dedicated to simplifying the manufacturing and product development journey for startups, mechanical companies, and engineering enthusiasts like you. We serve as a launchpad for your creativity, allowing you to experiment, innovate, and bring your visions to life.
          </p>
          <h3 className="text-xl mb-2.5 mt-10 text-[#007bff] border-b border-gray-300 pb-1.5 font-semibold">
            1. Manufacturing Service:
          </h3>
          <p className="mb-4 mt-3 text-lg">
            Experience efficiency and quality in our demand-driven manufacturing services. With state-of-the-art facilities and a network of reliable vendors, we ensure prompt delivery without compromising on quality. Whether you require CNC/VMC machining, Laser cutting and bending, Fabrication(), 3D printing, casting, forging, or any other manufacturing process, we have the expertise and resources to meet your requirements.
          </p>
          <h3 className="text-xl mb-2.5 mt-10 text-[#007bff] border-b border-gray-300 pb-1.5 font-semibold">
            2. Product Development Service:
          </h3>
          <p className="mb-4 mt-3 text-lg">
            Our experienced design team is here to guide you through every step of the product development process. From concept to completion, we’re committed to transforming your ideas into tangible solutions. Whether you’re facing design challenges or seeking innovative solutions, we’re here to support you every step of the way.
          </p>
          <h3 className="text-xl mb-2.5 mt-10 text-[#007bff] border-b border-gray-300 pb-1.5 font-semibold">
            3. Your Partner in Simplifying Manufacturing:
          </h3>
          <p className="mb-4 mt-3 text-lg">
            At Accu Design, we don’t just provide services; we become your partners in simplifying the manufacturing process. Our mission is to empower you to realize your vision efficiently and effectively. With our collaborative approach and commitment to excellence, we strive to exceed your expectations and bring your ideas to fruition.
          </p>
          <p className="mb-1 text-lg">
            Join us at Accu Design and experience a new era of manufacturing and product development. Together, let’s revolutionize your creation process and make your ideas a reality.
          </p>
        </motion.div>
      </section>

      {/* Careers */}
      <section className="bg-[#f7f7f7]">
        <div className="max-w-6xl mx-auto px-4 md:px-6 lg:px-8 py-12 md:py-16">
          <motion.div
            id="careers"
            className="mb-8"
            variants={fadeInUp}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-4 tracking-tight">
              Careers at <span className="text-[#007AFF]">ACCU</span> DESIGN
            </h2>
            <p className="text-lg text-center max-w-3xl mx-auto mb-8 text-gray-700 leading-relaxed">
              Join a team that thrives on innovation, precision, and collaboration. At ACCU DESIGN, we believe in nurturing talent and fostering a culture of growth, learning, and empowerment. Whether you’re an engineer, designer, or business professional, there’s a place for you here.
            </p>
          </motion.div>

          <motion.div
            className="flex flex-col md:flex-row gap-6 justify-center items-stretch"
            variants={staggerContainer}
          >
            <motion.div
              className="bg-white border border-[#FFA500] rounded-2xl p-6 md:p-7 shadow-md w-full md:w-[45%] flex flex-col justify-between"
              variants={fadeInUp}
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
            >
              <h3 className="text-xl font-semibold mb-3">Why Work With Us?</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-base">
                <li>Opportunity to work on cutting-edge manufacturing technologies.</li>
                <li>Collaborative and growth-oriented work culture.</li>
                <li>Continuous learning and professional development.</li>
                <li>Inclusive and supportive team environment.</li>
              </ul>
            </motion.div>

            <motion.div
              className="bg-white border border-[#FFA500] rounded-2xl p-6 md:p-7 shadow-md w-full md:w-[45%] flex flex-col justify-between"
              variants={fadeInUp}
              whileHover={{ y: -4, boxShadow: '0 12px 30px rgba(0,0,0,0.08)' }}
            >
              <h3 className="text-xl font-semibold mb-3">Open Positions</h3>
              <ul className="list-disc pl-5 text-gray-700 space-y-2 text-base">
                <li>Mechanical Design Engineer</li>
                <li>Manufacturing Technician</li>
                <li>Product Development Intern</li>
                <li>Sales & Marketing Executive</li>
              </ul>
              <p className="mt-4 text-sm text-gray-600">
                Interested candidates can send their resumes to:{' '}
                <span className="text-[#007AFF] font-medium">careers@accudesign.com</span>
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Back to top (still commented, as in your original) */}
      {/* <SLink to="/about-us">
        <img
          src="https://res.cloudinary.com/dxrryep5y/image/upload/v1753296077/website_static_media/upward-arrow.png"
          alt=""
          className="fixed right-[1%] top-[90%] w-[50px] pb-[5%]"
        />
      </SLink> */}
    </motion.div>
  );
};

export default AboutUs;
