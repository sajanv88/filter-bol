import Button from './button';
import { cn } from '../libs/utils';
import { IconTrash } from '@tabler/icons-react';
interface BadgeProps {
    className?: string;
    text: string;
    onRemove?: () => void;
}
export default function Badge({ className, text, onRemove }: BadgeProps) {
    return (
        <div
            className={cn(
                `inline-flex items-center justify-between pl-4 pr-1 py-1  text-gray-800 bg-gray-300 rounded-sm text-sm`,
                className
            )}
        >
            {text}
            {onRemove && (
                <Button
                    size="small"
                    className="bg-transparent hover:bg-transparent text-gray-500 hover:text-gray-700"
                    onClick={onRemove}
                >
                    <IconTrash className="!w-4 !h-4" />
                </Button>
            )}
        </div>
    );
}
