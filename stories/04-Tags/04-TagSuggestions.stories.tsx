import { Meta, Story } from "@storybook/react";
import TagSuggestions, {
  TagSuggestionsProps,
} from "../../src/tags/TagSuggestions";

import React from "react";
import { TagType } from "../../src/types";
import { action } from "@storybook/addon-actions";

export default {
  title: "Tags/Tag Suggestions",
  component: TagSuggestions,
  parameters: {
    actions: {
      handles: ["click .option", "click button"],
    },
  },
  decorators: [
    (Story) => (
      <div className="story">
        <div className="tag-container">{Story()}</div>
        <style jsx>{`
          .tag-container {
            background-color: white;
            margin-top: 55px;
            padding: 10px;
            max-width: 150px;
          }
        `}</style>
      </div>
    ),
  ],
} as Meta;

const TagTemplate: Story<TagSuggestionsProps> = (args) => {
  return <TagSuggestions {...args} />;
};

export const Editable = TagTemplate.bind({});
Editable.args = {
  title: "A title",
  description: "A title",
  tags: ["A title"],
  type: TagType.CATEGORY,
  onSelectTag: action("selected tag"),
};
