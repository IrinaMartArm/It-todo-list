import AppWithRedux from "./AppWithRedux";
import type {Meta, StoryFn, StoryObj} from '@storybook/react';
import {Provider} from "react-redux";
import {store} from "./Store";


const  meta: Meta<  typeof  AppWithRedux> = {
    title:   'TODOLISTS/AppWithRedux',
    component:   AppWithRedux,
    tags: [  'autodocs'],
};

export default  meta;

type Story = StoryObj<  typeof  AppWithRedux>;

export const  AppWithReduxStory: StoryFn = () => <Provider store={store}><AppWithRedux/></Provider>




// export default {
//     title: 'AppExample',
//     component: AppWithRedux,
//     // decorator: Decorator
// }
//
// export const AppWithReduxExample = () => {
//     return <AppWithRedux/>
// }