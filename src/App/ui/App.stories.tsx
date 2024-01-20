import App from "App/ui/App";
import type { Meta, StoryFn, StoryObj } from "@storybook/react";
import { Provider } from "react-redux";
import { store } from "App/Store";
import { Decorator, DecoratorRouter } from "App/ui/Decorator";

// const  meta: Meta<  typeof  App> = {
//     title:   'TODOLISTS/App',
//     component:   App,
//     tags: [  'autodocs'],
// };
//
// export default  meta;
//
// type Story = StoryObj<  typeof  App>;
//
// export const  AppStory: StoryFn = () => <Provider store={store}><App/></Provider>

export default {
  title: "App Stories",
  component: App,
  decorator: [Decorator, DecoratorRouter],
};

export const AppBaseExample = () => {
  return <App />;
};
