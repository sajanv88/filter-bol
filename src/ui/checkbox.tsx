import { cn } from '../libs/utils';

interface CheckboxProps
    extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'className'> {
    className?: string;
    labelText: string;
}

export default function Checkbox({
    className,
    labelText,
    ...rest
}: CheckboxProps) {
    const identifierText = labelText.toLowerCase();
    return (
        <span className="inline-flex items-center">
            <input
                id={identifierText}
                type="checkbox"
                className={cn(
                    `appearance-none w-5 h-5 border-2 rounded-none border-gray-300 relative
                 checked:before:content-['']  checked:before:absolute checked:before:block checked:before:w-3 
                 checked:before:h-3 checked:before:top-[2px] checked:before:left-[2px] checked:before:bg-blue-600`,
                    className
                )}
                {...rest}
            />
            <label className="ml-2" htmlFor={identifierText}>
                {labelText}
            </label>
        </span>
    );
}
