import React from 'react'
import { motion, AnimatePresence } from "motion/react"

export default function BoxWide({ children, boxKey, ...rest }) {
    const boxVariants = {
        initial: {
            opacity: 0,
            x: '50vw',
        },
        animate: {
            opacity: 1,
            x: 0,
            transition: { duration: 0.3, ease: 'easeIn' },
        },
        exit: {
            opacity: 0,
            x: '-50vw',
            transition: { duration: 0.2, ease: 'easeOut' },
        }
    };

    return(
        <AnimatePresence>
            <motion.div
                key={boxKey}
                variants={boxVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="flex h-screen w-screen overflow-hidden"
            >
                {children}
            </motion.div>
        </AnimatePresence>
    )
}