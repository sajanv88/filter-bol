import { cn } from '../libs/utils';

interface ButtonProps
    extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'className'> {
    children: React.ReactNode;
    className?: string;
}
export default function Button({ children, className, ...rest }: ButtonProps) {
    return (
        <button
            className={cn(
                'bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded',
                className
            )}
            {...rest}
        >
            {children}
        </button>
    );
}
