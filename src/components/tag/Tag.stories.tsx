import { Meta, StoryFn } from "@storybook/react";

import Tag from "./Tag";

export default {
  title: "components/Tag",
  component: Tag,
} as Meta<typeof Tag>;

export const Default: StoryFn<typeof Tag> = (args) => {
  return <Tag {...args} />;
};
Default.args = { name: "tag" };
