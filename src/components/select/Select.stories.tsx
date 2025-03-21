import { Meta, StoryFn } from "@storybook/react";

import Select from "./Select";
import { useState } from "react";

export default {
  title: "components/Select",
  component: Select,
  argTypes: {
    size: {
      options: ["small", "big"],
      mapping: ["small", "big"],
      control: { type: "radio" },
    },
    withDefaultValue: {
      options: [false, true],
      mapping: [false, true],
      control: { type: "boolean" },
    },
  },
} as Meta<typeof Select>;

const DUMMY_OPTIONS = [
  {
    id: 0,
    value: "Default Option",
  },
  {
    id: 1,
    value: "Option1",
  },
  {
    id: 2,
    value: "Option2",
  },
  {
    id: 3,
    value: "Option3",
  },
];

const args = {
  options: DUMMY_OPTIONS,
  withDefaultValue: true,
};

const Template: StoryFn<typeof Select> = (args) => {
  const [selectedValue, setSelectedValue] = useState(DUMMY_OPTIONS[0]);

  return (
    <Select
      {...args}
      selectedValue={selectedValue}
      onOptionClick={setSelectedValue}
    />
  );
};

export const Small = Template.bind({});
Small.args = { ...args, size: "small" };

export const Big = Template.bind({});
Big.args = { ...args, size: "big" };
