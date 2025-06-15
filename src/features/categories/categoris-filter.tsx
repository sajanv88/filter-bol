import GenericFilter from '../generic-filter/generic-filter';
import { useCategories } from './categories-hooks';

export default function CategoriesFilter() {
    const {
        categories,
        onCategorySelected,
        onCategoriesApplied,
        selectedCategories,
        onCategoriesSearch,
    } = useCategories();

    return (
        <GenericFilter
            items={categories}
            onSearchEvent={searchTerm => {
                if (onCategoriesSearch) {
                    onCategoriesSearch(searchTerm);
                }
            }}
            onFilterChange={selectedItems => {
                if (onCategoriesApplied) {
                    onCategoriesApplied(selectedItems);
                }
            }}
            onSelectEvent={item => {
                if (onCategorySelected) {
                    onCategorySelected(item);
                }
            }}
            selectedItems={selectedCategories ?? []}
        />
    );
}
