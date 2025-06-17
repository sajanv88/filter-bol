import type { Meta, StoryObj } from '@storybook/react-vite';

import { expect, within } from 'storybook/test';

import { Page } from './Page';

const meta = {
    title: 'Categories/Filter',
    component: Page,
    parameters: {
        // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
        layout: 'fullscreen',
    },
} satisfies Meta<typeof Page>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on component testing: https://storybook.js.org/docs/writing-tests/interaction-testing
export const CategoriesFilterDefaultTest: Story = {
    play: async ({ canvasElement, step }) => {
        const canvas = within(canvasElement);
        await step('Categeories filter default behaviour', async () => {
            const toepassen = canvas.getByRole('button', {
                name: /Toepassen/i,
            });
            const zoek = canvas.getByPlaceholderText('Zoek op...');
            await expect(toepassen).toBeInTheDocument();
            await expect(toepassen).toBeDisabled();
            await expect(zoek).toBeInTheDocument();
            await expect(zoek).toHaveValue('');
        });
    },
};

export const CategoriesFilterWithSearchTest: Story = {
    play: async ({ canvas, step, userEvent }) => {
        await step('Type in search input', async () => {
            const zoek = canvas.getByPlaceholderText('Zoek op...');
            await userEvent.type(zoek, 'fantasy');
            await expect(zoek).toHaveValue('fantasy');
        });
    },
};

export const CategoriesFilterWithSearchTermTest: Story = {
    play: async ({ canvas, step, userEvent }) => {
        await step('Check if search results are shown', async () => {
            const renderedItemsContainer = canvas.getByTestId(
                'rendered-items-container'
            );
            await expect(renderedItemsContainer).toBeInTheDocument();
            const values = within(renderedItemsContainer).getAllByText(
                /fantasy/i
            );
            await expect(values).toHaveLength(1);
            const zoek = canvas.getByPlaceholderText('Zoek op...');
            await userEvent.clear(zoek);
        });
    },
};

export const CategoriesFilterSelectedItemTest: Story = {
    play: async ({ canvas, step, userEvent }) => {
        await step('Badge is not shown by default', async () => {
            const selectedItems = canvas.queryByTestId(
                'selected-items-container'
            );
            await expect(selectedItems).not.toBeInTheDocument();
        });
        await step(
            'Badge should be shown when categories are selected and when clicked the trash icon on the badge it should deleted the selected category',
            async () => {
                const checkbox = canvas.getByRole('checkbox', {
                    name: /Thrillers/i,
                });
                await userEvent.click(checkbox);
                const selectedItems = canvas.queryByTestId(
                    'selected-items-container'
                );
                await expect(selectedItems).toBeInTheDocument();

                const badge = canvas.getByLabelText('remove-Thrillers');
                await expect(badge).toBeInTheDocument();
                await userEvent.click(badge);
            }
        );
    },
};
