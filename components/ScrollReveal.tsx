import React from 'react';
import { motion } from 'framer-motion';

interface ScrollRevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
    stagger?: number;
    direction?: 'up' | 'down' | 'left' | 'right';
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
    children,
    className = '',
    delay = 0,
    stagger = 0,
    direction = 'up',
}) => {
    const getDirectionOffset = () => {
        switch (direction) {
            case 'up':
                return { y: 20 };
            case 'down':
                return { y: -20 };
            case 'left':
                return { x: 20 };
            case 'right':
                return { x: -20 };
            default:
                return { y: 20 };
        }
    };

    const directionOffset = getDirectionOffset();

    return (
        <motion.div
            initial={{ opacity: 0, ...directionOffset }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
                duration: 0.6,
                delay: delay + stagger,
                ease: [0.2, 0.65, 0.3, 0.9],
            }}
            className={className}
        >
            {children}
        </motion.div>
    );
};

export default ScrollReveal;
