"use client"

import { useState, useEffect } from "react"
import { AnimatePresence } from "framer-motion"
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
        switch (currentPage) {
            case "home":
                return <HomePage onNavigate={setCurrentPage} />
            case "profile":
                return <ProfilePage />
            case "tools":
                return <ToolsPage />
            case "roadmap":
                return <RoadmapPage />
            case "contacts":
                return <ContactsPage />
            default:
                return <HomePage onNavigate={setCurrentPage} />
        }
    }

    return (
        <div className="flex h-screen w-screen bg-black overflow-hidden">
            <Sidebar
                isOpen={sidebarOpen}
                onToggle={() => setSidebarOpen(!sidebarOpen)}
                currentPage={currentPage}
                onNavigate={setCurrentPage}
                isInitialLoad={isInitialLoad}
            />
            <main
                className="flex-1 h-screen overflow-hidden relative"
                style={{
                    marginLeft: sidebarOpen ? "348px" : "40px",
                    transition: "margin-left 0.6s ease",
                }}
            >
                <AnimatePresence mode="wait">{renderPage()}</AnimatePresence>
            </main>
        </div>
    )
}

export default App
