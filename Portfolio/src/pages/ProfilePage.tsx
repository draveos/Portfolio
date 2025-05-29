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
    originalX: number
    originalY: number
    x: number
    y: number
    vx: number
    vy: number
    side: "left" | "right"
    fontSize: number
    color: string
}

interface Particle {
    id: number
    x: number
    y: number
    vx: number
    vy: number
    life: number
    maxLife: number
}

const leftTexts = [
    { text: "UI/UX Designer", size: 32, color: "#e5e7eb" },
    { text: "Interactive", size: 28, color: "#d1d5db" },
    { text: "Developer", size: 36, color: "#f3f4f6" },
    { text: "from Seoul", size: 24, color: "#9ca3af" },
    { text: "CAU", size: 40, color: "#ffffff" },
    { text: "AI Department", size: 20, color: "#6b7280" },
]

const rightTexts = [
    { text: "Design for fun", size: 30, color: "#e5e7eb" },
    { text: "for life", size: 26, color: "#d1d5db" },
    { text: "and most", size: 22, color: "#9ca3af" },
    { text: "importantly", size: 34, color: "#f3f4f6" },
    { text: "with passion", size: 38, color: "#ffffff" },
    { text: "& creativity", size: 28, color: "#d1d5db" },
]

const centerX = 830
const centerY = 350

const ProfilePage: React.FC<ProfilePageProps> = () => {
    const [mousePos, setMousePos] = useState<MousePosition>({ x: centerX, y: centerY })
    const [clickCount, setClickCount] = useState(0)
    const [glassShaking, setGlassShaking] = useState(false)
    const [glassBroken, setGlassBroken] = useState(false)
    const [glassShards, setGlassShards] = useState<Array<{ id: number; x: number; y: number; vx: number; vy: number }>>(
        [],
    )
    const [swimmingTexts, setSwimmingTexts] = useState<SwimmingText[]>([])
    const [particles, setParticles] = useState<Particle[]>([])
    const [eyeGlow, setEyeGlow] = useState(false)
    const [breathingPhase, setBreathingPhase] = useState(0)
    const animationRef = useRef<number>()
    const breathingRef = useRef<number>()

    // Initialize swimming texts with better positioning
    useEffect(() => {
        const initTexts: SwimmingText[] = [
            ...leftTexts.map((item, index) => {
                const angle = (index / leftTexts.length) * Math.PI - Math.PI / 2
                const radius = 280 + index * 20
                const originalX = centerX + Math.cos(angle + Math.PI) * radius
                const originalY = centerY + Math.sin(angle + Math.PI) * radius * 0.8

                return {
                    id: `left-${index}`,
                    text: item.text,
                    originalX,
                    originalY,
                    x: originalX,
                    y: originalY,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    side: "left" as const,
                    fontSize: item.size,
                    color: item.color,
                }
            }),
            ...rightTexts.map((item, index) => {
                const angle = (index / rightTexts.length) * Math.PI - Math.PI / 2
                const radius = 280 + index * 20
                const originalX = centerX + Math.cos(angle) * radius
                const originalY = centerY + Math.sin(angle) * radius * 0.8

                return {
                    id: `right-${index}`,
                    text: item.text,
                    originalX,
                    originalY,
                    x: originalX,
                    y: originalY,
                    vx: (Math.random() - 0.5) * 0.3,
                    vy: (Math.random() - 0.5) * 0.3,
                    side: "right" as const,
                    fontSize: item.size,
                    color: item.color,
                }
            }),
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

    // Breathing animation
    useEffect(() => {
        const breathe = () => {
            setBreathingPhase((prev) => prev + 0.02)
            breathingRef.current = requestAnimationFrame(breathe)
        }
        breathingRef.current = requestAnimationFrame(breathe)
        return () => {
            if (breathingRef.current) {
                cancelAnimationFrame(breathingRef.current)
            }
        }
    }, [])

    // Enhanced swimming animation with return-to-origin behavior
    useEffect(() => {
        const animate = () => {
            setSwimmingTexts((prev) =>
                prev.map((text) => {
                    let { x, y, vx, vy, originalX, originalY } = text

                    // Distance from mouse
                    const dx = mousePos.x - x
                    const dy = mousePos.y - y
                    const distance = Math.sqrt(dx * dx + dy * dy)

                    // Strong avoidance when mouse is near
                    if (distance < 150) {
                        const avoidanceForce = 0.08
                        const avoidX = ((-dx / distance) * avoidanceForce * (150 - distance)) / 150
                        const avoidY = ((-dy / distance) * avoidanceForce * (150 - distance)) / 150
                        vx += avoidX
                        vy += avoidY
                    }

                    // Return to original position when mouse is far
                    const returnDx = originalX - x
                    const returnDy = originalY - y
                    const returnDistance = Math.sqrt(returnDx * returnDx + returnDy * returnDy)

                    if (distance > 200 && returnDistance > 5) {
                        const returnForce = 0.02
                        vx += (returnDx / returnDistance) * returnForce
                        vy += (returnDy / returnDistance) * returnForce
                    }

                    // Natural swimming motion around original position
                    const timeOffset = Date.now() * 0.001 + text.id.charCodeAt(0)
                    const swimX = Math.sin(timeOffset * 0.5) * 2
                    const swimY = Math.cos(timeOffset * 0.3) * 1.5

                    if (distance > 200) {
                        vx += swimX * 0.01
                        vy += swimY * 0.01
                    }

                    // Apply velocity
                    x += vx
                    y += vy

                    // Damping
                    vx *= 0.95
                    vy *= 0.95

                    return { ...text, x, y, vx, vy }
                }),
            )

            // Update particles
            setParticles((prev) =>
                prev
                    .map((particle) => ({
                        ...particle,
                        x: particle.x + particle.vx,
                        y: particle.y + particle.vy,
                        vy: particle.vy + 0.1, // gravity
                        life: particle.life - 1,
                    }))
                    .filter((particle) => particle.life > 0),
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
        setEyeGlow(true)

        // Create particles on click
        const newParticles = Array.from({ length: 8 }, (_, i) => ({
            id: Date.now() + i,
            x: centerX,
            y: centerY,
            vx: (Math.random() - 0.5) * 8,
            vy: (Math.random() - 0.5) * 8 - 2,
            life: 60,
            maxLife: 60,
        }))
        setParticles((prev) => [...prev, ...newParticles])

        setTimeout(() => {
            setGlassShaking(false)
            setEyeGlow(false)
        }, 300)

        if (clickCount >= 99) {
            setGlassBroken(true)
            // Create glass shards
            const shards = Array.from({ length: 20 }, (_, i) => ({
                id: i,
                x: 0,
                y: 0,
                vx: (Math.random() - 0.5) * 15,
                vy: (Math.random() - 0.5) * 15,
            }))
            setGlassShards(shards)
        }
    }

    // Enhanced face tracking with limits
    const maxOffset = 15
    const faceOffsetX = Math.max(-maxOffset, Math.min(maxOffset, (mousePos.x - centerX) * 0.03))
    const faceOffsetY = Math.max(-maxOffset, Math.min(maxOffset, (mousePos.y - centerY) * 0.03))

    // Eye tracking
    const eyeOffsetX = (mousePos.x - centerX) * 0.02
    const eyeOffsetY = (mousePos.y - centerY) * 0.02

    // Breathing effect
    const breathingScale = 1 + Math.sin(breathingPhase) * 0.02

    return (
        <div className="w-full h-screen bg-neutral-900 relative overflow-hidden">
            {/* Ambient particles */}
            {particles.map((particle) => (
                <motion.div
                    key={particle.id}
                    className="absolute w-2 h-2 bg-white rounded-full pointer-events-none"
                    style={{
                        left: particle.x,
                        top: particle.y,
                        opacity: particle.life / particle.maxLife,
                    }}
                />
            ))}

            {/* Swimming Texts */}
            {swimmingTexts.map((text) => (
                <motion.div
                    key={text.id}
                    className="absolute pointer-events-none select-none z-10 font-light"
                    style={{
                        x: text.x,
                        y: text.y,
                        fontSize: text.fontSize,
                        color: text.color,
                        textShadow: "0 0 20px rgba(255,255,255,0.3)",
                    }}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.5 + Math.random() * 0.5, duration: 0.8 }}
                    whileHover={{ scale: 1.1, color: "#ffffff" }}
                >
                    {text.text}
                </motion.div>
            ))}

            {/* Main Title */}
            <motion.h1
                className="absolute text-6xl font-extralight text-white text-center select-none"
                style={{
                    left: centerX,
                    top: centerY + 200,
                    transform: "translateX(-50%)",
                    textShadow: "0 0 30px rgba(255,255,255,0.5)",
                }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
            >
                SeJin Kim
            </motion.h1>

            {/* Profile Container */}
            <motion.div
                className="absolute cursor-pointer z-20"
                style={{
                    left: centerX - 100,
                    top: centerY - 100,
                    x: faceOffsetX,
                    y: faceOffsetY,
                    scale: breathingScale,
                }}
                onClick={handleFaceClick}
                animate={glassShaking ? { rotate: [0, -3, 3, -3, 3, 0] } : {}}
                transition={{ duration: 0.3 }}
                whileHover={{ scale: breathingScale * 1.05 }}
            >
                {/* Profile Image Placeholder */}
                <div className="w-48 h-48 bg-gradient-to-br from-amber-200 to-amber-400 rounded-full relative flex items-center justify-center overflow-hidden shadow-2xl">
                    {/* Face features */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-amber-600 opacity-30" />

                    {/* Beard */}
                    <motion.div
                        className="absolute bottom-8 w-32 h-20 bg-gradient-to-b from-amber-800 to-amber-900 rounded-b-full"
                        animate={{ scaleY: 1 + Math.sin(breathingPhase * 0.5) * 0.05 }}
                    />

                    {/* Eyes */}
                    <div className="absolute top-16 flex gap-8">
                        <motion.div
                            className="w-4 h-4 bg-black rounded-full relative"
                            style={{
                                x: eyeOffsetX,
                                y: eyeOffsetY,
                                boxShadow: eyeGlow ? "0 0 20px #60a5fa" : "none",
                            }}
                        >
                            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
                        </motion.div>
                        <motion.div
                            className="w-4 h-4 bg-black rounded-full relative"
                            style={{
                                x: eyeOffsetX,
                                y: eyeOffsetY,
                                boxShadow: eyeGlow ? "0 0 20px #60a5fa" : "none",
                            }}
                        >
                            <div className="absolute top-1 left-1 w-1 h-1 bg-white rounded-full" />
                        </motion.div>
                    </div>

                    {/* Nose */}
                    <div className="absolute top-20 w-2 h-3 bg-amber-600 rounded-full" />

                    {/* Mouth */}
                    <motion.div
                        className="absolute top-24 w-6 h-1 bg-amber-800 rounded-full"
                        animate={{
                            scaleX: 1 + Math.sin(breathingPhase * 2) * 0.1,
                        }}
                    />

                    {/* Glasses */}
                    <AnimatePresence>
                        {!glassBroken && (
                            <motion.div
                                className="absolute top-12 flex items-center gap-2"
                                animate={glassShaking ? { x: [-2, 2, -2, 2, 0] } : {}}
                                exit={{ opacity: 0, scale: 0, rotate: 180 }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Left lens */}
                                <div className="w-12 h-10 border-2 border-black rounded-lg bg-blue-100 bg-opacity-30 backdrop-blur-sm" />
                                {/* Bridge */}
                                <div className="w-3 h-1 bg-black rounded-full" />
                                {/* Right lens */}
                                <div className="w-12 h-10 border-2 border-black rounded-lg bg-blue-100 bg-opacity-30 backdrop-blur-sm" />
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {/* Glass Shards */}
                    <AnimatePresence>
                        {glassBroken &&
                            glassShards.map((shard) => (
                                <motion.div
                                    key={shard.id}
                                    className="absolute w-2 h-2 bg-blue-200 opacity-80 rotate-45"
                                    initial={{ x: 0, y: -20, rotate: 0, scale: 1 }}
                                    animate={{
                                        x: shard.vx * 20,
                                        y: shard.vy * 20,
                                        rotate: 720,
                                        opacity: 0,
                                        scale: 0,
                                    }}
                                    transition={{ duration: 1.5, ease: "easeOut" }}
                                />
                            ))}
                    </AnimatePresence>
                </div>

                {/* Click Progress */}
                <motion.div
                    className="absolute -bottom-16 left-1/2 transform -translate-x-1/2 text-white text-lg font-light"
                    animate={{ opacity: clickCount > 0 ? 1 : 0 }}
                >
                    <div className="text-center">
                        <div className="text-sm opacity-70">Break the glasses</div>
                        <div className="text-xl">{clickCount}/100</div>
                        <div className="w-24 h-1 bg-gray-700 rounded-full mt-2 overflow-hidden">
                            <motion.div
                                className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                                initial={{ width: 0 }}
                                animate={{ width: `${clickCount}%` }}
                                transition={{ duration: 0.3 }}
                            />
                        </div>
                    </div>
                </motion.div>
            </motion.div>

            {/* Floating decorative elements */}
            {Array.from({ length: 6 }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full opacity-50"
                    style={{
                        left: centerX + Math.cos((i * Math.PI) / 3) * 300,
                        top: centerY + Math.sin((i * Math.PI) / 3) * 300,
                    }}
                    animate={{
                        y: [0, -10, 0],
                        opacity: [0.3, 0.8, 0.3],
                    }}
                    transition={{
                        duration: 3,
                        delay: i * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>
    )
}

export default ProfilePage
