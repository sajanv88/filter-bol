import Card from '../../ui/card';
import Checkbox from '../../ui/checkbox';
import Button from '../../ui/button';
import Badge from '../../ui/badge';
import SearchInput from '../search/search-input';

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

    return (
        <Card cardTitle="Productgroep">
            <section className="flex flex-col gap-2 space-y-6">
                {onSearchEvent && <SearchInput onSearchEvent={onSearchEvent} />}
                {selectedItems.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {selectedItems.map(onRenderBadge)}
                    </div>
                )}
                <div className="flex flex-col space-y-4 max-h-[17.8rem] overflow-y-auto">
                    {items.map(onRenderItem)}
                </div>
                <Button onClick={() => onFilterChange(selectedItems)}>
                    Toepassen
                </Button>
            </section>
        </Card>
    );
}
