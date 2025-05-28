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

    const handleToggle = () => {
        setShowShockwave(true)
        setTimeout(() => setShowShockwave(false), 600)
        onToggle()
    }

    return (
        <motion.div
            className="fixed left-0 top-0 h-screen z-50 overflow-hidden"
            initial={isInitialLoad ? { width: 0 } : false}
            animate={{
                width: isOpen ? "348px" : "40px",
            }}
            transition={{
                duration: 0.6,
                ease: [0.4, 0, 0.2, 1],
            }}
        >
            {/* Background */}
            <motion.div
                className="absolute inset-0 bg-white rounded-r-[50px]"
                initial={isInitialLoad ? { scaleX: 0 } : false}
                animate={{ scaleX: 1 }}
                transition={{
                    duration: 0.8,
                    ease: [0.4, 0, 0.2, 1],
                    delay: isInitialLoad ? 0.2 : 0,
                }}
                style={{ transformOrigin: "left center" }}
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
                    <AnimatePresence>
                        {isOpen && (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                <button
                                    onClick={() => onNavigate("home")}
                                    className="text-left hover:opacity-70 transition-opacity w-full"
                                >
                                    <h1 className="text-4xl font-extralight text-zinc-950 text-center leading-tight">
                                        SeJin
                                        <br />
                                        Kim
                                    </h1>
                                </button>
                                <div className="w-full h-0.5 bg-black mt-4" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.div>

                {/* Menu Items */}
                <motion.nav className="flex-1 flex flex-col gap-8 mt-8">
                    <AnimatePresence>
                        {isOpen &&
                            menuItems.map((item, index) => (
                                <motion.button
                                    key={item.key}
                                    className={`text-center py-3 text-3xl font-extralight transition-all hover:text-gray-600 hover:translate-x-2 w-full ${
                                        currentPage === item.key ? "text-gray-800 font-medium" : "text-black"
                                    }`}
                                    onClick={() => onNavigate(item.key)}
                                    initial={{ opacity: 0, x: -30 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -30 }}
                                    transition={{
                                        duration: 0.4,
                                        delay: isInitialLoad ? 1.0 + item.delay : 0.1 * index,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    {item.label}
                                </motion.button>
                            ))}
                    </AnimatePresence>
                </motion.nav>

                {/* Silhouette for closed state */}
                <AnimatePresence>
                    {!isOpen && (
                        <motion.div
                            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            transition={{ duration: 0.4, delay: 0.2 }}
                        >
                            <svg width="20" height="30" viewBox="0 0 40 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    d="M20 8C22.5 8 24.5 10 24.5 12.5C24.5 15 22.5 17 20 17C17.5 17 15.5 15 15.5 12.5C15.5 10 17.5 8 20 8ZM28 20C28 18 26 16 24 16H16C14 16 12 18 12 20V35H15V55H25V35H28V20Z"
                                    fill="black"
                                    fillOpacity="0.8"
                                />
                            </svg>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Toggle Button at Bottom */}
                <motion.button
                    className="relative w-10 h-8 bg-neutral-950 rounded-full flex items-center justify-center cursor-pointer transition-all hover:scale-110 mt-auto mx-auto"
                    onClick={handleToggle}
                    whileTap={{ scale: 0.9 }}
                >
                    <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.3 }} className="text-white">
                        →
                    </motion.div>

                    {/* Shockwave Effect */}
                    <AnimatePresence>
                        {showShockwave && (
                            <motion.div
                                className="absolute inset-0 border-2 border-black rounded-full pointer-events-none"
                                initial={{ scale: 1, opacity: 1 }}
                                animate={{ scale: 3, opacity: 0 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.6, ease: "easeOut" }}
                            />
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>
        </motion.div>
    )
}

export default Sidebar
