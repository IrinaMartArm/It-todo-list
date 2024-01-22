import { AddItemForm } from "components/addItemForm/AddItemForm";
import type { Meta, StoryObj } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import React from "react";

const meta: Meta<typeof AddItemForm> = {
  title: "TODOLISTS/AddItemForm",
  component: AddItemForm,
  tags: ["autodocs"],
  argTypes: {
    addText: {
      description: "Button clicked inside form",
      action: "clicked",
    },
  },
};

export default meta;

type Story = StoryObj<typeof AddItemForm>;

// export const ErrorTodoListFormStory = () => (
//   <AddItemForm addText={action("clicked")} />
// );
// export const DisableTodoListFormStory = () => (
//   <AddItemForm addText={action("clicked")} disabled={true} />
// );
