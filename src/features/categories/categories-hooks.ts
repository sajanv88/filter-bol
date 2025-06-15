import { useContext } from 'react';
import { CategoriesContext } from './categories-provider';

export function useCategories() {
    const context = useContext(CategoriesContext);
    if (!context) {
        throw new Error(
            'useCategories must be used within a CategoriesProvider'
        );
    }
    return context;
}
