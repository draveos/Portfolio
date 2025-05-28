
import type React from "react"
import { motion } from "framer-motion"

type RoadmapPageProps = {}

const RoadmapPage: React.FC<RoadmapPageProps> = () => {
    return (
        <div className="w-full h-screen bg-neutral-900 relative overflow-hidden">
            {/* Starry background */}
            <div className="absolute inset-0">
                {Array.from({ length: 100 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-1 h-1 bg-white rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 1, 0] }}
                        transition={{
                            duration: 2 + Math.random() * 3,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </div>

            {/* Title */}
            <motion.h1
                className="absolute top-16 left-1/2 transform -translate-x-1/2 text-8xl font-thin text-white tracking-widest z-10"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                ROADMAP
            </motion.h1>

            {/* Connection Lines SVG */}
            <svg className="absolute inset-0 w-full h-full z-5" style={{ zIndex: 5 }}>
                {/* Line from Project Node to Current */}
                <motion.line
                    x1="25%"
                    y1="35%"
                    x2="45%"
                    y2="55%"
                    stroke="white"
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1.2, duration: 1.5 }}
                />
                {/* Line from Current to CAS */}
                <motion.line
                    x1="45%"
                    y1="55%"
                    x2="70%"
                    y2="40%"
                    stroke="white"
                    strokeWidth="3"
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{ delay: 1.8, duration: 1.5 }}
                />
            </svg>

            {/* Project Node */}
            <motion.div
                className="absolute z-10"
                style={{ left: "15%", top: "25%" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 w-48 h-48 bg-white opacity-20 rounded-full blur-xl transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />

                {/* Node Content */}
                <div className="relative w-40 h-40 bg-white bg-opacity-10 border-2 border-white border-opacity-30 rounded-full flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm">
                    <h3 className="text-white text-sm font-bold mb-1">CAS : Project Node</h3>
                    <p className="text-gray-300 text-xs mb-1">Frontend / Designer</p>
                    <span className="text-gray-400 text-xs leading-tight">
            UI / UX Develop
            <br />
            Interaction Design Develop
          </span>
                </div>
            </motion.div>

            {/* Current Node (청룡톤) */}
            <motion.div
                className="absolute z-10"
                style={{ left: "35%", top: "45%" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 w-56 h-56 bg-white opacity-30 rounded-full blur-2xl transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />

                {/* Node Content */}
                <div className="relative w-44 h-44 bg-white bg-opacity-15 border-2 border-white border-opacity-40 rounded-full flex flex-col items-center justify-center text-center p-4 backdrop-blur-sm">
                    <h3 className="text-white text-base font-bold mb-2">청룡톤</h3>
                    <p className="text-gray-300 text-sm">Frontend / Designer</p>
                </div>
            </motion.div>

            {/* CAS Node */}
            <motion.div
                className="absolute z-10"
                style={{ left: "60%", top: "30%" }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.0, duration: 0.8 }}
            >
                {/* Glow Effect */}
                <div className="absolute inset-0 w-64 h-64 bg-white opacity-40 rounded-full blur-3xl transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2" />

                {/* Node Content */}
                <div className="relative w-48 h-48 bg-white bg-opacity-20 border-3 border-white border-opacity-50 rounded-full flex flex-col items-center justify-center text-center p-6 backdrop-blur-sm">
                    <h3 className="text-white text-lg font-bold mb-2">CAS</h3>
                    <p className="text-gray-300 text-sm mb-1">Beginner Team</p>
                    <span className="text-gray-400 text-xs">Web Development Coach</span>
                </div>
            </motion.div>

            {/* Explanation Text */}
            <motion.div
                className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-center text-gray-300 z-10 max-w-4xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.0, duration: 0.8 }}
            >
                <p className="text-xl mb-4 font-light">Explanation...blah blah</p>
                <p className="text-lg leading-relaxed">
                    I have done this,.. that... and mostly about those things at this. This was such a great experience.
                </p>
            </motion.div>

            {/* Additional floating particles */}
            <div className="absolute inset-0 pointer-events-none">
                {Array.from({ length: 20 }).map((_, i) => (
                    <motion.div
                        key={`particle-${i}`}
                        className="absolute w-2 h-2 bg-white bg-opacity-20 rounded-full"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.2, 0.8, 0.2],
                        }}
                        transition={{
                            duration: 4 + Math.random() * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 3,
                        }}
                    />
                ))}
            </div>
        </div>
    )
}

export default RoadmapPage
