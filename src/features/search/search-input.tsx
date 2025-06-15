import Input from '../../ui/input';
import SearchIcon from '../../assets/search.svg';
import { useDebounce } from '../../hooks/use-debounce';
import { useEffect, useState } from 'react';

interface SearchInputProps {
    onSearchEvent: (searchTerm: string) => void;
}
export default function SearchInput({ onSearchEvent }: SearchInputProps) {
    const [searchTerm, setSearchTerm] = useState('');
    const debouncedValue = useDebounce(searchTerm, 800);

    useEffect(() => {
        onSearchEvent(debouncedValue);
    }, [debouncedValue]);

    function onInputChangeEvent(event: React.ChangeEvent<HTMLInputElement>) {
        const value = event.target.value;
        setSearchTerm(value);
    }
    return (
        <Input
            placeholder="Zoek op..."
            iconSrc={SearchIcon}
            value={searchTerm}
            onInput={onInputChangeEvent}
        />
    );
}
