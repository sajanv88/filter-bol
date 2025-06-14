import type { Meta, StoryObj } from '@storybook/react-vite';

import UICard from '../../ui/card';

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
    title: 'UI/Card',
    component: UICard,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout,
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/api/argtypes

    // Use `fn` to spy on the onClick arg, which will appear in the actions panel once invoked: https://storybook.js.org/docs/essentials/actions#action-args
    args: {
        cardTitle: 'Card Title',
    },
} satisfies Meta<typeof UICard>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/writing-stories/args

export const Card: Story = {
    args: {
        children:
            'This is a card component. It can contain any content you like, such as text, images, or other components.',
        cardTitle: 'Card Title',
    },
};
