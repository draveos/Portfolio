"use client"

import type React from "react"
import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"

type ProfilePageProps = {}

interface MousePosition {
    x: number
    y: number
}

interface SwimmingText {
    id: string
    text: string
    x: number
    y: number
    vx: number
    vy: number
    side: "left" | "right"
}

const leftTexts = ["UI / UX Designer", "Interactive", "Developer", "from", "CAU", "AI Department"]
const rightTexts = ["Design for fun", "for life", "and most", "importantly", "with passion", "with creativity"]

const ProfilePage: React.FC<ProfilePageProps> = () => {
    const [mousePos, setMousePos] = useState<MousePosition>({ x: 0, y: 0 })
    const [clickCount, setClickCount] = useState(0)
    const [glassShaking, setGlassShaking] = useState(false)
    const [glassBroken, setGlassBroken] = useState(false)
    const [glassShards, setGlassShards] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>(
        [],
    )
    const [swimmingTexts, setSwimmingTexts] = useState<SwimmingText[]>([])
    const animationRef = useRef<number>()

    // Initialize swimming texts
    useEffect(() => {
        const initTexts: SwimmingText[] = [
            ...leftTexts.map((text, index) => ({
                id: `left-${index}`,
                text,
                x: 150,
                y: 200 + index * 40,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                side: "left" as const,
            })),
            ...rightTexts.map((text, index) => ({
                id: `right-${index}`,
                text,
                x: window.innerWidth - 250,
                y: 200 + index * 40,
                vx: (Math.random() - 0.5) * 0.5,
                vy: (Math.random() - 0.5) * 0.5,
                side: "right" as const,
            })),
        ]
        setSwimmingTexts(initTexts)
    }, [])

    // Mouse tracking
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({ x: e.clientX, y: e.clientY })
        }

        window.addEventListener("mousemove", handleMouseMove)
        return () => window.removeEventListener("mousemove", handleMouseMove)
    }, [])

    // Swimming animation
    useEffect(() => {
        const animate = () => {
            setSwimmingTexts((prev) =>
                prev.map((text) => {
                    let { x, y, vx, vy } = text

                    // Natural swimming motion
                    x += vx
                    y += vy

                    // Boundary bouncing
                    if (x < 50 || x > window.innerWidth - 200) vx *= -1
                    if (y < 150 || y > window.innerHeight - 100) vy *= -1

                    // Cursor avoidance (fish-like behavior)
                    const dx = mousePos.x - x
                    const dy = mousePos.y - y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    if (distance < 100) {
                        const avoidanceForce = 0.02
                        const avoidX = (-dx / distance) * avoidanceForce
                        const avoidY = (-dy / distance) * avoidanceForce
                        vx += avoidX
                        vy += avoidY
                    }

                    // Damping
                    vx *= 0.99
                    vy *= 0.99

                    // Random movement
                    vx += (Math.random() - 0.5) * 0.01
                    vy += (Math.random() - 0.5) * 0.01

                    return { ...text, x, y, vx, vy }
                }),
            )

            animationRef.current = requestAnimationFrame(animate)
        }

        animationRef.current = requestAnimationFrame(animate)
        return () => {
            if (animationRef.current) {
                cancelAnimationFrame(animationRef.current)
            }
        }
    }, [mousePos])

    const handleFaceClick = () => {
        if (glassBroken) return

        setClickCount((prev) => prev + 1)
        setGlassShaking(true)

        setTimeout(() => setGlassShaking(false), 200)

        if (clickCount >= 99) {
            setGlassBroken(true)
            // Create glass shards
            const shards = Array.from({ length: 12 }, (_, i) => ({
                id: i,
                x: 0,
                y: 0,
                vx: (Math.random() - 0.5) * 10,
                vy: (Math.random() - 0.5) * 10,
            }))
            setGlassShards(shards)
        }
    }

    const faceX = mousePos.x * 0.1
    const faceY = mousePos.y * 0.1

    return (
        <div className="w-full h-screen bg-neutral-900 relative overflow-hidden">
            {/* Title */}
            <motion.h1
                className="absolute top-[632px] left-[778px] text-[200px] font-extralight text-white leading-[64px] text-center w-[1645px]"
                initial={{ opacity: 0, y: -30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
                style={{ transform: "scale(0.5)", transformOrigin: "top left" }}
            >
                Se Jin Kim
            </motion.h1>

            {/* Swimming Texts */}
            {swimmingTexts.map((text) => (
                <motion.div
                    key={text.id}
                    className="absolute text-gray-300 text-lg pointer-events-none select-none z-10"
                    style={{
                        x: text.x,
                        y: text.y,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.8 }}
                >
                    {text.text}
                </motion.div>
            ))}

            {/* Left Text Column */}
            <div
                className="absolute left-[744px] top-[976px] w-96 h-[579px] text-white text-5xl font-bold leading-[64px]"
                style={{ transform: "scale(0.5)", transformOrigin: "top left" }}
            >
                UI / UX Designer
                <br />
                Interactive Developer
                <br />
                <br />
                from <br />
                <br />
                CAU <br />
                AI Department
            </div>

            {/* Right Text Column */}
            <div
                className="absolute left-[2007px] top-[976px] w-96 h-[579px] text-white text-5xl font-bold leading-[64px] text-right"
                style={{ transform: "scale(0.5)", transformOrigin: "top left" }}
            >
                Design for fun
                <br />
                for life
                <br />
                <br />
                and most importantly
                <br />
                <br />
                with passion
                <br />
                with creativity
            </div>

            {/* Face Container */}
            <motion.div
                className="absolute left-[1105px] top-[1030px] w-[992px] h-[612px] cursor-pointer z-20"
                style={{
                    x: faceX,
                    y: faceY,
                    transform: "scale(0.5)",
                    transformOrigin: "top left",
                }}
                onClick={handleFaceClick}
                animate={glassShaking ? { rotate: [0, -2, 2, -2, 2, 0] } : {}}
                transition={{ duration: 0.2 }}
            >
                {/* Face Circle */}
                <div className="w-full h-full bg-gradient-to-br from-gray-400 to-gray-600 rounded-full relative flex items-center justify-center">
                    {/* Beard */}
                    <div className="absolute bottom-32 w-96 h-64 bg-gray-800 rounded-b-full" />

                    {/* Eyes */}
                    <div className="absolute top-64 left-[300px] w-16 h-16 bg-black rounded-full" />
                    <div className="absolute top-64 right-[300px] w-16 h-16 bg-black rounded-full" />

                    {/* Glasses */}
                    <AnimatePresence>
                        {!glassBroken && (
                            <motion.div
                                className="absolute top-48 flex items-center gap-8"
                                animate={glassShaking ? { x: [-4, 4, -4, 4, 0] } : {}}
                                exit={{ opacity: 0, scale: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {/* Left lens */}
                                <div className="w-48 h-40 border-8 border-black rounded-2xl bg-white bg-opacity-20" />
                                {/* Bridge */}
                                <div className="w-12 h-4 bg-black" />
                                {/* Right lens */}
                                <div className="w-48 h-40 border-8 border-black rounded-2xl bg-white bg-opacity-20" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Glass Shards */}
                    <AnimatePresence>
                        {glassBroken &&
                            glassShards.map((shard) => (
                                <motion.div
                                    key={shard.id}
                                    className="absolute w-8 h-8 bg-white opacity-80"
                                    initial={{ x: 0, y: -80, rotate: 0 }}
                                    animate={{
                                        x: shard.vx * 80,
                                        y: shard.vy * 80,
                                        rotate: 360,
                                        opacity: 0,
                                    }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                />
                            ))}
                    </AnimatePresence>
                </div>

                {/* Click counter */}
                <div className="absolute -bottom-32 left-1/2 transform -translate-x-1/2 text-white text-2xl">
                    {clickCount}/100
                </div>
            </motion.div>
        </div>
    )
}

export default ProfilePage
