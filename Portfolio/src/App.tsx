"use client"

import { useState, useEffect } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Sidebar from "./components/sidebar"
import HomePage from "./pages/HomePage"
import ProfilePage from "./pages/ProfilePage"
import ToolsPage from "./pages/ToolsPage"
import RoadmapPage from "./pages/RoadmapPage"
import ContactsPage from "./pages/ContactsPage"

export type PageType = "home" | "profile" | "tools" | "roadmap" | "contacts"

function App() {
    const [currentPage, setCurrentPage] = useState<PageType>("home")
    const [sidebarOpen, setSidebarOpen] = useState(true)
    const [isInitialLoad, setIsInitialLoad] = useState(true)

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsInitialLoad(false)
        }, 100)
        return () => clearTimeout(timer)
    }, [])

    const renderPage = () => {
        const pageVariants = {
            initial: { opacity: 0, x: 20, scale: 0.98 },
            animate: { opacity: 1, x: 0, scale: 1 },
            exit: { opacity: 0, x: -20, scale: 0.98 },
        }

        const pageTransition = {
            duration: 0.4,
            ease: [0.4, 0, 0.2, 1],
        }

        switch (currentPage) {
            case "home":
                return (
                    <motion.div
                        key="home"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="w-full h-full"
                    >
                        <HomePage onNavigate={setCurrentPage} />
                    </motion.div>
                )
            case "profile":
                return (
                    <motion.div
                        key="profile"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="w-full h-full"
                    >
                        <ProfilePage />
                    </motion.div>
                )
            case "tools":
                return (
                    <motion.div
                        key="tools"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="w-full h-full"
                    >
                        <ToolsPage />
                    </motion.div>
                )
            case "roadmap":
                return (
                    <motion.div
                        key="roadmap"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="w-full h-full"
                    >
                        <RoadmapPage />
                    </motion.div>
                )
            case "contacts":
                return (
                    <motion.div
                        key="contacts"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="w-full h-full"
                    >
                        <ContactsPage />
                    </motion.div>
                )
            default:
                return (
                    <motion.div
                        key="home"
                        variants={pageVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={pageTransition}
                        className="w-full h-full"
                    >
                        <HomePage onNavigate={setCurrentPage} />
                    </motion.div>
                )
        }
    }

    return (
        <div className="relative h-screen w-screen bg-black overflow-hidden">
            {/* Main content area - always full width */}
            <main className="w-full h-full overflow-hidden">
                <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
            </main>

            {/* Sidebar overlaid on top with higher z-index */}
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                isInitialLoad={isInitialLoad}
            />
        </div>
    )
}

export default App
