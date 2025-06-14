import { ReactSVG } from 'react-svg';
import { cn } from '../libs/utils';

interface InputProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
    className?: string;
    iconSrc?: string;
}

export default function Input({ className, iconSrc, ...rest }: InputProps) {
    return (
        <div className="relative">
            <input
                type="text"
                className={cn(
                    'w-full pl-4 pr-6 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500',
                    className
                )}
                {...rest}
            />
            {iconSrc && (
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
                    <ReactSVG src={iconSrc} />
                </div>
            )}
        </div>
    );
}
