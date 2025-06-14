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
    return (
        <label className="inline-flex items-center">
            <input
                type="checkbox"
                className={cn(
                    `appearance-none w-8 h-8 border-2 rounded-none border-gray-300 relative
                 checked:before:content-['']  checked:before:absolute checked:before:block checked:before:w-5 
                 checked:before:h-5 checked:before:top-[4px] checked:before:left-[4px] checked:before:bg-blue-600`,
                    className
                )}
                {...rest}
            />
            <span className="ml-2">{labelText}</span>
        </label>
    );
}
