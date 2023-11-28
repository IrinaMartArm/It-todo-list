import AppWithRedux from "../../AppWithRedux";
import type {Meta, StoryFn, StoryObj} from '@storybook/react';
import {Provider} from "react-redux";
import {store} from "../state/Store";
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