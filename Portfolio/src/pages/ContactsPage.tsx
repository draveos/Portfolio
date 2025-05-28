"use client"

import type React from "react"
import { motion } from "framer-motion"

type ContactsPageProps = {}

const ContactsPage: React.FC<ContactsPageProps> = () => {
    return (
        <div className="w-full h-screen relative overflow-hidden">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-yellow-400 via-pink-500 to-purple-600" />

            <motion.h1
                className="absolute top-[400px] left-1/2 transform -translate-x-1/2 text-6xl font-light text-white drop-shadow-lg"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
            >
                Contacts
            </motion.h1>

            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex flex-col gap-12 mt-16">
                <motion.div
                    className="bg-white bg-opacity-90 rounded-3xl p-8 flex items-center gap-6 cursor-pointer backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                    whileHover={{ scale: 1.05, rotate: 2, y: -5 }}
                >
                    <div className="w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black text-sm">
                        TALK
                    </div>
                    <div className="text-black text-xl font-medium">sej5432</div>
                </motion.div>

                <motion.div
                    className="bg-white bg-opacity-90 rounded-3xl p-8 flex items-center gap-6 cursor-pointer backdrop-blur-sm shadow-2xl hover:shadow-3xl transition-all"
                    initial={{ opacity: 0, x: 50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                    whileHover={{ scale: 1.05, rotate: -2, y: -5 }}
                >
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 via-pink-500 to-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl">
                        📷
                    </div>
                    <div className="text-black text-xl font-medium">@SEJN_K</div>
                </motion.div>
            </div>

            {/* Floating elements */}
            <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.6 }}
            >
                {Array.from({ length: 8 }).map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-5 h-5 bg-white bg-opacity-30 rounded-full"
                        style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                        }}
                        animate={{
                            y: [0, -20, 0],
                            rotate: [0, 180, 360],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Number.POSITIVE_INFINITY,
                            delay: Math.random() * 2,
                        }}
                    />
                ))}
            </motion.div>
        </div>
    )
}

export default ContactsPage
