import { cn } from '../libs/utils';

interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    children: React.ReactNode;
    className?: string;
    size?: 'small' | 'large';
}
export default function Button({
    children,
    size = 'large',
    className,
    ...rest
}: ButtonProps) {
    return (
        <button
            className={cn(
                'bg-blue-500 hover:bg-blue-700 text-white font-bold rounded disabled:opacity-50 disabled:pointer-events-none',
                className,

                size === 'small' && 'text-xs py-1 px-2',
                size === 'large' && 'text-lg py-2 px-4'
            )}
            {...rest}
        >
            {children}
        </button>
    );
}
