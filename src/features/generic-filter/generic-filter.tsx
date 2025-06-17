import Card from '../../ui/card';
import Checkbox from '../../ui/checkbox';
import Button from '../../ui/button';
import Badge from '../../ui/badge';
import SearchInput from '../search/search-input';
import { useEffect, useState } from 'react';

type FilterItemType = { id: string; name: string; [key: string]: unknown };
interface GenericFilterProps<F extends FilterItemType> {
    items: F[];
    onFilterChange: (selectedItems: F[]) => void;
    onSelectEvent: (item: F) => void;
    selectedItems: F[];
    onSearchEvent?: (searchTerm: string) => void;
    renderItem?: (item: F) => React.ReactNode;
    renderBadge?: (item: F) => React.ReactNode;
}
export default function GenericFilter<F extends FilterItemType>({
    items,
    onFilterChange,
    onSelectEvent,
    selectedItems,
    onSearchEvent,
    renderItem,
    renderBadge,
}: GenericFilterProps<F>) {
    // This state is used to keep track of the items that were already selected And can be used to track the applied filter changes
    const [existingSelectedItems, setExistingSelectedItems] = useState<F[]>([]);
    useEffect(() => {
        if (selectedItems.length > 0 && existingSelectedItems.length === 0) {
            setExistingSelectedItems(selectedItems);
        }
    }, [selectedItems]);

    function onRenderItem(item: F) {
        if (renderItem) {
            return renderItem(item);
        }

        return (
            <Checkbox
                key={item.id}
                labelText={item.name}
                checked={selectedItems.some(
                    selectedItem => selectedItem.name === item.name
                )}
                onChange={() => onSelectEvent(item)}
            />
        );
    }

    function onRenderBadge(item: F) {
        if (renderBadge) {
            return renderBadge(item);
        }
        return (
            <Badge
                key={item.id}
                text={item.name}
                onRemove={() => onSelectEvent(item)}
            />
        );
    }

    function onSubmitForm(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        onFilterChange(selectedItems);
        setExistingSelectedItems(selectedItems);
    }

    return (
        <Card cardTitle="Productgroep">
            <form onSubmit={onSubmitForm}>
                <section className="flex flex-col gap-2 space-y-6">
                    {onSearchEvent && (
                        <SearchInput onSearchEvent={onSearchEvent} />
                    )}
                    {selectedItems.length > 0 && (
                        <div
                            className="flex flex-wrap gap-2"
                            data-testid="selected-items-container"
                        >
                            {selectedItems.map(onRenderBadge)}
                        </div>
                    )}
                    <div
                        className="flex flex-col space-y-4 max-h-[17.8rem] overflow-y-auto"
                        data-testid="rendered-items-container"
                    >
                        {items.map(onRenderItem)}
                    </div>
                    <Button
                        type="submit"
                        className="w-full"
                        disabled={!existingSelectedItems.length}
                    >
                        Toepassen
                    </Button>
                </section>
            </form>
        </Card>
    );
}
