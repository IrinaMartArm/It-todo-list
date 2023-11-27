 import {EditableSpan} from "../EditableSpan";
//
// export default {
//     title: 'EditableSpan component',
//     component: EditableSpan
// }
//
// export const EditableSpanExample = () => {
//     return <EditableSpan title={'Example'} onChange={()=>{}}/>
// }


import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'


const meta: Meta<typeof EditableSpan> = {
    title: 'TODOLISTS/EditableSpan',
    component: EditableSpan,
    tags: ['autodocs'],
    argTypes: {
        title: {
            description: 'Start value empty. Add value push button set string.'
        },
        onChange: {
            description: 'Value EditableSpan changed'
        }
    }
};

export default meta;
type Story = StoryObj<typeof EditableSpan>;

export const EditableSpanStory: Story = {
    args: {
        onChange: action('Value EditableSpan changed')
    }
};
