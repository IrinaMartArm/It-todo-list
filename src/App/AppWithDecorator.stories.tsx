import App from "./App";
import type {Meta, StoryObj} from '@storybook/react';
import {Decorator} from "./Decorator";


const  meta: Meta<  typeof  App> = {
    title:   'TODOLISTS/App',
    component:   App,
    tags: [  'autodocs'],
    decorators: [Decorator]
};

export default  meta;

type Story = StoryObj<  typeof  App>;

export const  AppWithReduxStoryWithDecorator: Story = {}




// export default {
//     title: 'AppExample',
//     component: App,
//     // decorator: Decorator
// }
//
// export const AppWithReduxExample = () => {
//     return <App/>
// }