import { useEffect, useState } from 'react';

export function useDebounce<V>(value: V, delay = 800) {
    const [debouncedValue, setDebouncedValue] = useState<V>(value);

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        return () => {
            clearTimeout(handler);
        };
    }, [value, delay]);

    return debouncedValue;
}
