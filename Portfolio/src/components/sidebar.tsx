"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { PageType } from "../App"

interface SidebarProps {
    isOpen: boolean
    onToggle: () => void
    currentPage: PageType
    onNavigate: (page: PageType) => void
    isInitialLoad: boolean
}

const menuItems: { key: PageType; label: string; delay: number }[] = [
    { key: "profile", label: "Profile", delay: 0.1 },
    { key: "tools", label: "Tools I use", delay: 0.2 },
    { key: "roadmap", label: "Roadmap", delay: 0.3 },
    { key: "contacts", label: "Contacts", delay: 0.4 },
]

const Sidebar: React.FC<SidebarProps> = ({ isOpen, onToggle, currentPage, onNavigate, isInitialLoad }) => {
    const [showShockwave, setShowShockwave] = useState(false)
    const [isAnimating, setIsAnimating] = useState(false)

    const handleToggle = () => {
        setShowShockwave(true)
        setIsAnimating(true)
        setTimeout(() => setShowShockwave(false), 600)
        setTimeout(() => setIsAnimating(false), 600)
        onToggle()
    }

    return (
        <motion.div
            className="fixed left-0 top-0 h-screen z-50 overflow-hidden"
            initial={isInitialLoad ? { width: 0 } : false}
            animate={{
                width: isOpen ? "348px" : "60px",
            }}
            transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
            }}
        >
            {/* Background with color transition */}
            <motion.div
                className="absolute inset-0 rounded-r-[50px] shadow-2xl"
                initial={isInitialLoad ? { scaleX: 0 } : false}
                animate={{
                    scaleX: 1,
                    backgroundColor: isOpen ? "#ffffff" : "#000000",
                }}
                transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1],
                    delay: isInitialLoad ? 0.2 : 0,
                }}
                style={{ transformOrigin: "left center" }}
            />

            {/* Gradient overlay for smooth transition */}
            <motion.div
                className="absolute inset-0 rounded-r-[50px]"
                animate={{
                    background: isOpen
                        ? "linear-gradient(90deg, rgba(255,255,255,1) 0%, rgba(255,255,255,1) 100%)"
                        : "linear-gradient(90deg, rgba(0,0,0,0.95) 0%, rgba(0,0,0,0.8) 80%, transparent 100%)",
                }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
            />

            {/* Content */}
            <div className="relative h-full p-8 flex flex-col z-10">
                {/* Header */}
                <motion.div
                    className="mb-8"
                    initial={isInitialLoad ? { opacity: 0, y: -20 } : false}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.6,
                        delay: isInitialLoad ? 0.8 : 0,
                    }}
                >
                    <AnimatePresence mode="wait">
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0, y: -20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{
                                    duration: 0.4,
                                    ease: [0.4, 0, 0.2, 1],
                                }}
                            >
                                <button
                                    onClick={() => onNavigate("home")}
                                    className="text-left hover:opacity-70 transition-opacity w-full group"
                                >
                                    <motion.h1
                                        className="text-4xl font-extralight text-zinc-950 text-center leading-tight"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.2 }}
                                    >
                                        SeJin
                                        <br />
                                        Kim
                                    </motion.h1>
                                </button>

                                {/* Animated division line */}
                                <motion.div
                                    className="w-full h-0.5 bg-black mt-4"
                                    initial={{ scaleX: 0 }}
                                    animate={{ scaleX: 1 }}
                                    exit={{ scaleX: 0 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: 0.2,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    style={{ transformOrigin: "left center" }}
                                />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Menu Items */}
                <motion.nav className="flex-1 flex flex-col gap-8 mt-8">
                    <AnimatePresence mode="wait">
                        {isOpen &&
                            !isAnimating &&
                            menuItems.map((item, index) => (
                                <motion.button
                                    key={item.key}
                                    className={`text-center py-3 text-3xl font-extralight transition-all hover:text-gray-600 hover:translate-x-2 w-full relative overflow-hidden ${
                                        currentPage === item.key ? "text-gray-800 font-medium" : "text-black"
                                    }`}
                                    onClick={() => onNavigate(item.key)}
                                    initial={{ opacity: 0, x: -50, rotateY: -15 }}
                                    animate={{ opacity: 1, x: 0, rotateY: 0 }}
                                    exit={{ opacity: 0, x: -50, rotateY: -15 }}
                                    transition={{
                                        duration: 0.5,
                                        delay: isInitialLoad ? 1.0 + item.delay : 0.1 + index * 0.1,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                    whileHover={{
                                        scale: 1.05,
                                        transition: { duration: 0.2 },
                                    }}
                                >
                                    {/* Background highlight for current page */}
                                    {currentPage === item.key && (
                                        <motion.div
                                            className="absolute inset-0 bg-gray-100 rounded-lg -z-10"
                                            layoutId="activeTab"
                                            transition={{ duration: 0.3, ease: "easeInOut" }}
                                        />
                                    )}

                                    {/* Text with stagger animation */}
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{
                                            duration: 0.3,
                                            delay: isInitialLoad ? 1.2 + item.delay : 0.2 + index * 0.1,
                                        }}
                                    >
                                        {item.label}
                                    </motion.span>
                                </motion.button>
                            ))}
                    </AnimatePresence>
                </motion.nav>

                {/* Silhouette for closed state */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            initial={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
                            exit={{ opacity: 0, scale: 0.8, rotateY: 90 }}
                            transition={{ duration: 0.5, delay: 0.3, ease: [0.4, 0, 0.2, 1] }}
                        >
                            <motion.svg
                                width="24"
                                height="36"
                                viewBox="0 0 40 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                whileHover={{ scale: 1.1 }}
                                transition={{ duration: 0.2 }}
                            >
                                <motion.path
                                    d="M20 8C22.5 8 24.5 10 24.5 12.5C24.5 15 22.5 17 20 17C17.5 17 15.5 15 15.5 12.5C15.5 10 17.5 8 20 8ZM28 20C28 18 26 16 24 16H16C14 16 12 18 12 20V35H15V55H25V35H28V20Z"
                                    fill="white"
                                    fillOpacity="0.9"
                                    initial={{ pathLength: 0 }}
                                    animate={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            </motion.svg>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button at Bottom */}
                <motion.button
                    className="relative w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 mt-auto mx-auto"
                    style={{
                        backgroundColor: isOpen ? "#171717" : "#ffffff",
                    }}
                    animate={{
                        backgroundColor: isOpen ? "#171717" : "#ffffff",
                        boxShadow: isOpen ? "0 4px 20px rgba(0,0,0,0.3)" : "0 4px 20px rgba(255,255,255,0.3)",
                    }}
                    onClick={handleToggle}
                    whileTap={{ scale: 0.9 }}
                    whileHover={{
                        scale: 1.15,
                        transition: { duration: 0.2 },
                    }}
                    transition={{ duration: 0.4 }}
                >
                    <motion.div
                        animate={{
                            rotate: isOpen ? 180 : 0,
                            color: isOpen ? "#ffffff" : "#000000",
                        }}
                        transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                        className="text-xl font-bold"
                    >
                        →
                    </motion.div>

                    {/* Enhanced Shockwave Effect */}
                    <AnimatePresence>
                        {showShockwave && (
                            <>
                                <motion.div
                                    className="absolute inset-0 border-2 rounded-full pointer-events-none"
                                    style={{
                                        borderColor: isOpen ? "#ffffff" : "#000000",
                                    }}
                                    initial={{ scale: 1, opacity: 1 }}
                                    animate={{ scale: 4, opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.6, ease: "easeOut" }}
                                />
                                <motion.div
                                    className="absolute inset-0 rounded-full pointer-events-none"
                                    style={{
                                        backgroundColor: isOpen ? "rgba(255,255,255,0.3)" : "rgba(0,0,0,0.3)",
                                    }}
                                    initial={{ scale: 1, opacity: 0.5 }}
                                    animate={{ scale: 3, opacity: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                />
                            </>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </motion.div>
    )
}

export default Sidebar
