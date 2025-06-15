import { gql } from '../../libs/__generated__/gql';

export const QUERY_CATEGORIES = gql(
    `query Categories {
        categories
    }`
);

export const SEARCH_CATEGORIES_QUERY = gql(`
    query SearchCategories($searchTerm: String!) {
        searchCategories(searchTerm: $searchTerm)
    }
`);
