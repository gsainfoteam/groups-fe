import { Meta, StoryFn } from "@storybook/react";
import Card from "./Card";

export default {
  title: "components/Card",
  component: Card,
  argTypes: {},
} as Meta<typeof Card>;

const Template: StoryFn<typeof Card> = (args) => {
  return <Card {...args} />;
};

const args = {
  children: "yay i am a description!",
};

export const Default = Template.bind({});
Default.args = { ...args };
