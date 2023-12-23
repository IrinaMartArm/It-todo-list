import AppWithRedux from "./AppWithRedux";
import type {Meta, StoryObj} from '@storybook/react';
import {Decorator} from "./Decorator";


const  meta: Meta<  typeof  AppWithRedux> = {
    title:   'TODOLISTS/AppWithRedux',
    component:   AppWithRedux,
    tags: [  'autodocs'],
    decorators: [Decorator]
};

export default  meta;

type Story = StoryObj<  typeof  AppWithRedux>;

export const  AppWithReduxStoryWithDecorator: Story = {}




// export default {
//     title: 'AppExample',
//     component: AppWithRedux,
//     // decorator: Decorator
// }
//
// export const AppWithReduxExample = () => {
//     return <AppWithRedux/>
// }