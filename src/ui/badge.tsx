import { ReactSVG } from 'react-svg';
import Button from './button';
import TrashIcon from '../assets/trash.svg';
interface BadgeProps {
    className?: string;
    text: string;
    onRemove?: () => void;
}
export default function Badge({ className, text, onRemove }: BadgeProps) {
    return (
        <div
            className={`inline-flex items-center justify-around px-4 py-1  text-gray-800 bg-gray-300 rounded-sm ${className}`}
        >
            {text}
            {onRemove && (
                <Button
                    size="small"
                    className="bg-transparent hover:bg-transparent text-gray-500 hover:text-gray-700"
                    onClick={onRemove}
                >
                    <ReactSVG src={TrashIcon} className="w-2" />
                </Button>
            )}
        </div>
    );
}
