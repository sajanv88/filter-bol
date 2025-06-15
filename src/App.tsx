import CategoriesProvider from './features/categories/categories-provider';
import CategoriesFilter from './features/categories/categoris-filter';

function App() {
    return (
        <main>
            <aside className="w-full sm:max-w-sm p-4">
                <CategoriesProvider>
                    <CategoriesFilter />
                </CategoriesProvider>
            </aside>
        </main>
    );
}
export default App;
