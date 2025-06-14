import type React from 'react';
import { cn } from '../libs/utils';

interface CardProps
    extends Omit<React.HTMLAttributes<HTMLDivElement>, 'className'> {
    className?: string;
    children: React.ReactNode;
    cardTitle?: string;
}
export default function Card({
    children,
    className,
    cardTitle,
    ...rest
}: CardProps) {
    return (
        <div
            className={cn(
                `border border-gray-400 bg-gray-100 rounded-sm p-4`,
                className
            )}
            {...rest}
        >
            {cardTitle && (
                <h3 className="text-lg font-semibold mb-2">{cardTitle}</h3>
            )}
            {children}
        </div>
    );
}
