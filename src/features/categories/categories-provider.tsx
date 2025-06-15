import { createContext, useEffect, useState, type ReactNode } from 'react';
import { useLazyQuery, useQuery } from '@apollo/client';
import {
    QUERY_CATEGORIES,
    SEARCH_CATEGORIES_QUERY,
} from './categories-queries';

type Category = { id: string; name: string };
export type Categories = Array<Category>;

export type CategoriesType = {
    categories: Categories;
    onCategoriesSearch?: (searchTerm: string) => void;
    onCategoriesApplied?: (selectedCategories: Categories) => void;
    onCategorySelected?: (category: Category) => void;
    loading?: boolean;
    error?: string;
    selectedCategories?: Categories;
};

export const CategoriesContext = createContext<CategoriesType>({
    categories: [],
});
export const CategoriesConsumer = CategoriesContext.Consumer;

// In real production application, you would use a more stable ID which should be provided by the backend.
//  For the sake of this example, I used crypto.randomUUID().
function dummyObjectMapper(c: string) {
    return {
        id: crypto.randomUUID(),
        name: c,
    };
}

interface CategoriesProviderProps {
    children: ReactNode;
}

export default function CategoriesProvider({
    children,
}: CategoriesProviderProps) {
    const allCategories = useQuery(QUERY_CATEGORIES);

    const [doSearch, lazyCategories] = useLazyQuery(SEARCH_CATEGORIES_QUERY);
    const [categories, setCategories] = useState<Categories>([]);
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [selectedCategories, setSelectedCategories] = useState<Categories>(
        []
    );

    // I am using the URLSearchParams to get the selected items from the URL.
    // This is to ensure that when the user refresh browser page, the selected items are still there.
    useEffect(() => {
        const searchParams = new URLSearchParams(window.location.search);
        const selectedItems = searchParams.get('selectedItems');
        if (selectedItems) {
            setSelectedCategories(
                selectedItems.split(',').map(dummyObjectMapper)
            );
        }
    }, []);

    // Arrange the categories in the initial state and reset categories when the search term is empty
    // This is to ensure that when the user clears the search, we show all categories again.
    useEffect(() => {
        if (allCategories.data && !searchTerm) {
            setCategories(allCategories.data.categories.map(dummyObjectMapper));
        }
    }, [allCategories.data, searchTerm]);

    // Perform search when the search term changes
    useEffect(() => {
        if (searchTerm) {
            doSearch({
                variables: { searchTerm },
            });
        }
    }, [searchTerm]);

    // Update categories when the search results are available
    useEffect(() => {
        if (lazyCategories.data && searchTerm) {
            const searchCategories =
                lazyCategories.data.searchCategories.map(dummyObjectMapper);
            setCategories(searchCategories);
        }
    }, [lazyCategories.data, searchTerm]);

    // In this example, i am using "name" as the unique identifier for the category.
    // In a real application, you would use a more stable ID which should be provided by the backend.
    //  For the sake of this example, I used crypto.randomUUID(). Which is not a stable ID.
    function onCategorySelected(category: Category) {
        const isSelected = selectedCategories.find(
            c => c.name === category.name
        );
        if (isSelected) {
            setSelectedCategories(prev =>
                prev.filter(c => c.name !== category.name)
            );
        } else {
            setSelectedCategories(prev => [...prev, category]);
        }
    }

    function onCategoriesApplied(appliedCategories: Categories) {
        const searchParams = new URLSearchParams();
        // If there are applied categories, we update the URL with the selected items
        if (appliedCategories.length > 0) {
            const searchParams = new URLSearchParams();
            searchParams.set(
                'selectedItems',
                appliedCategories.map(c => c.name).join(',')
            );
            window.history.replaceState({}, '', `?${searchParams.toString()}`);
            return;
        }

        // If there are no applied categories, we remove the selected items from the URL
        searchParams.delete('selectedItems');
        window.history.replaceState({}, '', `?${searchParams.toString()}`);
    }

    const isLoading = lazyCategories.loading || allCategories.loading;
    const errorMessage = allCategories.error
        ? allCategories.error.message
        : undefined;

    return (
        <CategoriesContext.Provider
            value={{
                categories,
                loading: isLoading,
                error: errorMessage,
                selectedCategories,
                onCategorySelected,
                onCategoriesSearch: setSearchTerm,
                onCategoriesApplied,
            }}
        >
            {children}
        </CategoriesContext.Provider>
    );
}
