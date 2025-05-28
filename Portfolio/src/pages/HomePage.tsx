import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { PageType } from "../App"

const LETTERS = [
    // x, y, rotation, (font is picked dynamically)
    { letter: "P", x: 170, y: 60, rotate: -6 },
    { letter: "O", x: 260, y: 80, rotate: 7 },
    { letter: "R", x: 370, y: 115, rotate: 18 },
    { letter: "T", x: 470, y: 175, rotate: 29 },
    { letter: "F", x: 545, y: 250, rotate: 44 },
    { letter: "O", x: 610, y: 335, rotate: 58 },
    { letter: "L", x: 660, y: 435, rotate: 71 },
    { letter: "I", x: 690, y: 540, rotate: 83 },
    { letter: "O", x: 720, y: 650, rotate: 98 },
]

const BOXES = [
    { x: 180, y: 220, rotate: -15, icon: "/profile-icon.svg", label: "Profile", page: "profile" },
    { x: 315, y: 300, rotate: 2, icon: "/tools-icon.svg", label: "Tools", page: "tools" },
    { x: 500, y: 390, rotate: 14, icon: "/roadmap-icon.svg", label: "Roadmap", page: "roadmap" },
    { x: 660, y: 500, rotate: 28, icon: "/contacts-icon.svg", label: "Contacts", page: "contacts" },
]

const FONT_LIST = [
    "Rubik Doodle Shadow, cursive", "Major Mono Display, monospace", "Righteous, cursive", "Orbitron, sans-serif",
    "Unica One, sans-serif", "Bebas Neue, sans-serif", "Permanent Marker, cursive", "Audiowide, sans-serif", "Fira Code, monospace"
]

interface HomePageProps {
    onNavigate: (page: PageType) => void
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const [animatingOut, setAnimatingOut] = useState(false)
    const [fontMap, setFontMap] = useState<string[]>(() => LETTERS.map((_, i) => FONT_LIST[i % FONT_LIST.length]))
    const [hovered, setHovered] = useState<number | null>(null)

    // Font animation effect (for 5 seconds, slows down)
    useEffect(() => {
        let running = true
        let start = Date.now()
        const duration = 5000
        const fontShuffle = () => {
            if (!running) return
            const now = Date.now()
            const t = now - start
            if (t < duration) {
                setFontMap(prev => prev.map((f, i) =>
                    Math.random() < (0.16 * (1 - t / duration)) ? FONT_LIST[Math.floor(Math.random() * FONT_LIST.length)] : f
                ))
                setTimeout(fontShuffle, Math.max(70, 700 * (t / duration)))
            }
        }
        fontShuffle()
        return () => { running = false }
    }, [])

    const handleBoxClick = (target: PageType) => {
        setAnimatingOut(true)
        setTimeout(() => onNavigate(target), 850)
    }

    // Helper for font swap on hover
    const handleLetterHover = (idx: number) => {
        setHovered(idx)
        setFontMap((prev) =>
            prev.map((f, i) => i === idx ? FONT_LIST[Math.floor(Math.random() * FONT_LIST.length)] : f)
        )
    }

    // ——— Layout/Arc is *approximate* — tune positions and fonts as you wish!
    return (
        <div className="relative w-full h-screen overflow-hidden bg-neutral-900 rounded-[48px]">
            {/* Letters in Arc */}
            {LETTERS.map((item, i) => (
                <motion.div
                    key={i}
                    className="absolute select-none text-white drop-shadow-lg"
                    style={{
                        fontFamily: fontMap[i],
                        fontSize: 88,
                        fontWeight: 800,
                        left: item.x,
                        top: item.y,
                        rotate: `${item.rotate}deg`,
                        textShadow: "0 8px 32px #fff, 0 2px 2px #0005",
                        filter: hovered === i ? "brightness(1.25) blur(0.5px)" : "",
                        transition: "filter 0.25s"
                    }}
                    initial={{ opacity: 0, y: -100, scale: 0.7 }}
                    animate={animatingOut
                        ? { y: 600, opacity: 0, scale: 0.7, rotate: item.rotate + 180 }
                        : { y: 0, opacity: 1, scale: 1, rotate: item.rotate }
                    }
                    transition={{ duration: animatingOut ? 0.9 : 1, delay: 0.04 * i }}
                    onMouseEnter={() => handleLetterHover(i)}
                    onMouseLeave={() => setHovered(null)}
                    whileHover={{ scale: 1.15 }}
                >{item.letter}</motion.div>
            ))}

            {/* Boxes in Arc */}
            {BOXES.map((box, i) => (
                <motion.button
                    key={i}
                    className="absolute w-[120px] h-[120px] bg-white flex items-center justify-center rounded-2xl shadow-xl hover:shadow-2xl transition-all border-4 border-neutral-900"
                    style={{
                        left: box.x, top: box.y, rotate: `${box.rotate}deg`,
                        filter: hovered === i + 10 ? "brightness(1.2) drop-shadow(0 0 24px #fff8)" : ""
                    }}
                    initial={{ opacity: 0, y: -90, scale: 0.7, rotate: box.rotate - 20 }}
                    animate={animatingOut
                        ? { y: 620, opacity: 0, scale: 0.7, rotate: box.rotate + 130 }
                        : { y: 0, opacity: 1, scale: 1, rotate: box.rotate }
                    }
                    transition={{ duration: animatingOut ? 0.8 : 1.2, delay: 0.13 * i + 0.6 }}
                    onMouseEnter={() => setHovered(i + 10)}
                    onMouseLeave={() => setHovered(null)}
                    onClick={() => handleBoxClick(box.page as PageType)}
                >
                    {/* Use SVG icons, emoji, or imported images */}
                    <img src={box.icon} alt={box.label} className="w-16 h-16" />
                </motion.button>
            ))}
        </div>
    )
}

export default HomePage
