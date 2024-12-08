import React from "react";
import { motion } from "framer-motion";
import { FaCode, FaUsers, FaLightbulb } from "react-icons/fa";

export default function AboutUsPage() {
    return (
        <div className="min-h-screen bg-gray-100">
            {/* Banner Section */}
            <motion.div
                initial={{ opacity: 0, y: -50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                className="bg-white py-12"
            >
                <div className="container mx-auto text-center">
                    <h1 className="text-6xl font-bold text-secondary mt-16">
                        ABOUT <span className="text-primary">US</span>
                    </h1>
                    <p className="mt-4 text-lg text-gray-600">
                        Turning an Idea into a Functional Reality
                    </p>
                </div>
            </motion.div>

            {/* Content Section */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="container mx-auto mt-12 px-4 lg:px-8 text-dark leading-relaxed"
            >
                <div className="bg-white rounded-lg shadow-md p-8">
                    <h2 className="text-3xl font-bold text-secondary mb-6">
                        Meet the Team Behind <span className="text-primary">SkillConnect</span>
                    </h2>
                    <p className="text-lg mb-4">
                        SkillConnect is not just another freelancing panel; it’s a result of
                        collaboration, creativity, and a lot of debugging. This platform was
                        developed as part of our final project for the Web Engineering
                        course, bringing together the talents of three classmates from SE-F.
                    </p>
                    <div className="flex flex-wrap gap-6 mt-6 justify-evenly">
                        {/* Developer 1 */}
                        <div className="flex items-center gap-4">
                            <FaCode className="text-primary text-3xl" />
                            <div>
                                <h3 className="text-lg font-bold text-secondary">Maham Imran</h3>
                                <p className="text-sm text-gray-600">
                                    Developer of the Freelancer Panel
                                </p>
                            </div>
                        </div>

                        {/* Developer 3 */}
                        <div className="flex items-center gap-4">
                            <FaLightbulb className="text-primary text-3xl" />
                            <div>
                                <h3 className="text-lg font-bold text-secondary">Hashir Ayaz</h3>
                                <p className="text-sm text-gray-600">
                                    Developer of the Job Provider Panel
                                </p>
                            </div>
                        </div>

                        {/* Developer 2 */}
                        <div className="flex items-center gap-4">
                            <FaUsers className="text-primary text-3xl" />
                            <div>
                                <h3 className="text-lg font-bold text-secondary">Fatima Wajahat</h3>
                                <p className="text-sm text-gray-600">
                                    Developer of the Admin Panel
                                </p>
                            </div>
                        </div>
                    </div>

                    <h2 className="text-3xl font-bold text-secondary mt-12 mb-6">
                        Our Story 🌟
                    </h2>
                    <p className="text-lg mb-4">
                        SkillConnect was born out of necessity. With a tight deadline looming
                        over us, we didn’t have the luxury to overthink. It was a classic
                        case of "do or die (your grades)." From brainstorming in class to
                        debugging late at night, we managed to bring this platform to life.
                        Yes, there were bugs. Yes, we lost sleep. But somehow, it all came
                        together.
                    </p>


                    <h2 className="text-3xl font-bold text-secondary mt-12 mb-6">
                        Why SkillConnect? 🤔
                    </h2>
                    <ul className="list-disc pl-6 text-lg">
                        <li className="mb-2">
                            Built by students who know the hustle, for professionals who live
                            it.
                        </li>
                        <li className="mb-2">
                            A user-friendly interface that doesn’t require a Ph.D. in
                            freelancing.
                        </li>
                        <li className="mb-2">
                            Three dedicated developers who have personally tested its
                            reliability (trust us, we clicked a lot of buttons).
                        </li>
                    </ul>

                    <h2 className="text-3xl font-bold text-secondary mt-12 mb-6">
                        Our Mission 🚀
                    </h2>
                    <p className="text-lg mb-4">
                        To create a platform that bridges the gap between opportunity and
                        talent, empowering freelancers and job providers alike. And if we
                        can make you smile while you navigate through our panels, well,
                        that’s just a bonus.
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
