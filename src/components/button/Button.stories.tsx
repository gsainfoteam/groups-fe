import { Meta, StoryFn } from "@storybook/react";

import Button from "./Button";

export default {
  title: "components/Button",
  component: Button,
  argTypes: {
    variant: {
      options: ["default", "outlined", "contained", "emphasized", "disabled"],
      mapping: [undefined, "outlined", "contained", "emphasized", "disabled"],
      control: { type: "select" },
    },
    size: {
      options: ["default(small)", "big", "cta"],
      mapping: [undefined, "big", "cta"],
      control: { type: "select" },
    },
    animated: {
      options: ["false", "true"],
      mapping: [undefined, true],
      control: { type: "boolean" },
    },
  },
} as Meta<typeof Button>;

const Template: StoryFn<typeof Button> = (args) => {
  return <Button {...args} />;
};

const args = {
  children: "button",
  animated: true,
  className: "",
};

export const Default = Template.bind({});
Default.args = { ...args, size: "small" };

export const Outlined = Template.bind({});
Outlined.args = { ...args, variant: "outlined", size: "small" };

export const Contained = Template.bind({});
Contained.args = { ...args, variant: "contained", size: "small" };

export const Emphasized = Template.bind({});
Emphasized.args = { ...args, variant: "emphasized", size: "small" };

export const Disabled = Template.bind({});
Disabled.args = { ...args, variant: "disabled", size: "small" };
