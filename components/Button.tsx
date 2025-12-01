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
    const baseStyles = 'btn';

    const variantStyles = {
        primary: 'btn--primary',
        secondary: 'btn--secondary',
    } as const;

    const sizeStyles = {
        sm: 'btn--sm',
        md: 'btn--md',
        lg: 'btn--lg',
    } as const;

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={cn(
                baseStyles,
                variantStyles[variant],
                sizeStyles[size],
                fullWidth && 'w-full',
                className
            )}
            {...props}
        >
            {icon && (
                <span className="btn__icon" aria-hidden>
                    {icon}
                </span>
            )}
            <span>{children}</span>
        </motion.button>
    );
};

export default Button;
