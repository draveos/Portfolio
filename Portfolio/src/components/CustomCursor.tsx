"use client"

import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

/**
 * CustomCursor  ✧ celestial edition ✧
 * -------------------------------------------------
 * ▸ Center cursor  : glowing white star (radial‑gradient)
 * ▸ Orbital sparks : 6 little stars revolving around the core, giving a “following” aura
 * ▸ Click (or angry‑repel) : core turns black & grows (keeps previous angry behaviour)
 * ▸ Repel logic + hide OS cursor preserved
 */

interface CustomCursorProps {
    repelCenter: { x: number; y: number }
    repelRadius?: number
    repelStrength?: number
    repelCooldown?: number
    isAngry?: boolean
}

interface OrbitStar {
    id: number
    baseAngle: number
    radius: number
    size: number
    speed: number
}

const ORBIT_COUNT = 6

const CustomCursor: React.FC<CustomCursorProps> = ({
                                                       repelCenter,
                                                       repelRadius = 120,
                                                       repelStrength = 150,
                                                       repelCooldown = 1200,
                                                       isAngry = false,
                                                   }) => {
    const [mouse, setMouse] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    const [cursor, setCursor] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 })
    const [isRepelling, setIsRepelling] = useState(false)
    const [orbits] = useState<OrbitStar[]>(() =>
        Array.from({ length: ORBIT_COUNT }, (_, i) => ({
            id: i,
            baseAngle: (i / ORBIT_COUNT) * Math.PI * 2,
            radius: 18 + (i % 2) * 6,
            size: 2.5 + (i % 3) * 0.8,
            speed: 0.9 + i * 0.15,
        }))
    )

    // track time for orbits
    const timeRef = useRef(0)
    const rafRef = useRef<number>()
    const lastRepelTime = useRef<number>(0)

    // capture mouse
    useEffect(() => {
        const move = (e: MouseEvent) => setMouse({ x: e.clientX, y: e.clientY })
        window.addEventListener("mousemove", move)
        return () => window.removeEventListener("mousemove", move)
    }, [])

    // main loop (lerp + repel + orbit time)
    useEffect(() => {
        const step = () => {
            timeRef.current += 0.016 // ~60 fps increment

            const now = Date.now()
            const dx = mouse.x - repelCenter.x
            const dy = mouse.y - repelCenter.y
            const dist = Math.hypot(dx, dy)

            if (!isRepelling && isAngry && dist < repelRadius && now - lastRepelTime.current > repelCooldown) {
                // repel kick
                const nx = dx / (dist || 1)
                const ny = dy / (dist || 1)
                setCursor((prev) => ({ x: prev.x + nx * repelStrength, y: prev.y + ny * repelStrength }))
                setIsRepelling(true)
                lastRepelTime.current = now
                setTimeout(() => setIsRepelling(false), repelCooldown)
            } else if (!isRepelling) {
                // smooth follow
                setCursor((prev) => ({ x: prev.x + (mouse.x - prev.x) * 0.2, y: prev.y + (mouse.y - prev.y) * 0.2 }))
            }

            rafRef.current = requestAnimationFrame(step)
        }
        rafRef.current = requestAnimationFrame(step)
        return () => cancelAnimationFrame(rafRef.current!)
    }, [mouse, repelCenter, isAngry, isRepelling])

    // hide native cursor
    useEffect(() => {
        document.body.style.cursor = "none"
        return () => { document.body.style.cursor = "" }
    }, [])

    return (
        <div style={{ position: "fixed", inset: 0, pointerEvents: "none", zIndex: 99999 }}>
            {/* ORBITING STARS */}
            {orbits.map((s) => {
                const angle = s.baseAngle + timeRef.current * s.speed
                const ox = Math.cos(angle) * s.radius
                const oy = Math.sin(angle) * s.radius
                return (
                    <motion.div
                        key={s.id}
                        style={{
                            position: "absolute",
                            left: cursor.x + ox,
                            top: cursor.y + oy,
                            width: s.size,
                            height: s.size,
                            borderRadius: "50%",
                            transform: "translate(-50%, -50%)",
                            background: "radial-gradient(circle, #ffffff 0%, rgba(255,255,255,0.6) 60%, transparent 100%)",
                            boxShadow: "0 0 4px #ffffffa0",
                        }}
                        animate={{ opacity: [0.6, 1, 0.6] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: s.id * 0.1 }}
                    />
                )
            })}

            {/* CORE */}
            <motion.div
                style={{ position: "absolute", left: cursor.x, top: cursor.y, transform: "translate(-50%, -50%)" }}
                animate={{ scale: isRepelling ? (isAngry ? 2 : 1.5) : 1 }}
                transition={{ duration: 0.3, ease: [0.34, 1.56, 0.64, 1] }}
            >
                <AnimatePresence mode="wait">
                    {isAngry && isRepelling ? (
                        <motion.div
                            key="black"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 2, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.4, ease: "backOut" }}
                            style={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                background: "black",
                                boxShadow: "0 0 40px #000",
                            }}
                        />
                    ) : (
                        <motion.div
                            key="white"
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            style={{
                                width: 28,
                                height: 28,
                                borderRadius: "50%",
                                background: "radial-gradient(circle, #ffffff 0%, #ffffffc0 40%, transparent 100%)",
                                boxShadow: "0 0 22px #ffffff, 0 0 50px #ffffff70",
                            }}
                        />
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    )
}

export default CustomCursor
