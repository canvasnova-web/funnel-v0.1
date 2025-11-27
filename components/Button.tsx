import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary';
    size?: 'sm' | 'md' | 'lg';
    children: React.ReactNode;
    icon?: React.ReactNode;
    fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    icon,
    fullWidth = false,
    className,
    ...props
}) => {
    const baseStyles = 'relative inline-flex items-center justify-center gap-3 rounded-full font-sans font-bold uppercase tracking-widest transition-all overflow-hidden active:scale-95';

    const variantStyles = {
        primary: 'bg-gallery-black text-white shadow-2xl shadow-black/20 hover:bg-gray-800',
        secondary: 'bg-white text-gallery-black border-2 border-gallery-black hover:bg-gallery-black hover:text-white',
    };

    const sizeStyles = {
        sm: 'px-6 h-11 text-xs', // 44px height
        md: 'px-8 h-14 text-sm', // 56px height
        lg: 'px-10 h-16 text-base', // 64px height
    };

    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={cn(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            <span className="relative z-10">{children}</span>
            {icon && (
                <div className="relative z-10 w-6 h-6 rounded-full bg-int-orange flex items-center justify-center group-hover:scale-125 transition-transform duration-300">
                    {icon}
                </div>
            )}
            <div className="absolute inset-0 bg-gray-800 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
        </motion.button>
    );
};

export default Button;
