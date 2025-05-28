"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"

type ToolsPageProps = {}

const tools = [
    { name: "HTML", color: "#E34F26", icon: "🌐" },
    { name: "CSS", color: "#1572B6", icon: "🎨" },
    { name: "JavaScript", color: "#F7DF1E", icon: "⚡" },
    { name: "React", color: "#61DAFB", icon: "⚛️" },
    { name: "TypeScript", color: "#3178C6", icon: "📘" },
    { name: "Python", color: "#3776AB", icon: "🐍" },
    { name: "Figma", color: "#F24E1E", icon: "🎯" },
]

const ToolsPage: React.FC<ToolsPageProps> = () => {
    const [currentTool, setCurrentTool] = useState(0)

    const nextTool = () => {
        setCurrentTool((prev) => (prev + 1) % tools.length)
    }

    const prevTool = () => {
        setCurrentTool((prev) => (prev - 1 + tools.length) % tools.length)
    }

    return (
        <div className="w-full h-screen bg-neutral-900 flex flex-col items-center justify-center p-8">
            {/* Title */}
            <motion.h1
                className="text-6xl font-extralight text-white mb-16 italic"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                I can use...
            </motion.h1>

            <div className="flex items-center gap-12 mb-16">
                <motion.button
                    className="w-15 h-15 bg-white bg-opacity-10 border-2 border-white border-opacity-30 rounded-full flex items-center justify-center text-white hover:bg-opacity-20 transition-all"
                    onClick={prevTool}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronLeft size={30} />
                </motion.button>

                <div className="w-80 h-40 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={currentTool}
                            className="text-6xl font-bold text-center"
                            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                            transition={{ duration: 0.5 }}
                            style={{ color: tools[currentTool].color }}
                        >
                            {tools[currentTool].name}
                        </motion.div>
                    </AnimatePresence>
                </div>

                <motion.button
                    className="w-15 h-15 bg-white bg-opacity-10 border-2 border-white border-opacity-30 rounded-full flex items-center justify-center text-white hover:bg-opacity-20 transition-all"
                    onClick={nextTool}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                >
                    <ChevronRight size={30} />
                </motion.button>
            </div>

            <div className="grid grid-cols-4 gap-8 max-w-2xl">
                {tools.map((tool, index) => (
                    <motion.div
                        key={tool.name}
                        className={`w-20 h-20 rounded-2xl flex items-center justify-center cursor-pointer transition-all ${
                            index === currentTool ? "opacity-100 shadow-lg shadow-white/30" : "opacity-70"
                        }`}
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: index === currentTool ? 1 : 0.7, y: 0 }}
                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        onClick={() => setCurrentTool(index)}
                        style={{ backgroundColor: tool.color }}
                    >
                        <span className="text-2xl">{tool.icon}</span>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}

export default ToolsPage
