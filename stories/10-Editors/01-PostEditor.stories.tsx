import {
  EDITOR_TEXT_VALUES,
  getInitialTextString,
} from "../utils/editor-controls";
import { EditorContext, ImageUploaderContext } from "../../src/index";
import { Meta, Story } from "@storybook/react";
//import { linkTo } from "@storybook/addon-links";
import PostEditor, {
  PostEditorHandler,
  PostEditorProps,
} from "../../src/post/PostEditor";

import Button from "../../src/buttons/Button";
import Modal from "../../src/common/Modal";
import React from "react";
import { action } from "@storybook/addon-actions";
import book from "../images/book.png";
import crack from "../images/crack.png";
import crown from "../images/crown.png";
import goreBackground from "../images/gore.png";
import kinkmeme from "../images/kink-meme.png";
import mamoruAvatar from "../images/mamoru.png";
import oncelerAvatar from "../images/oncie.jpg";
import oncelerBoard from "../images/onceler-board.png";
import reindeerEars from "../images/reindeer-ears.png";
import tuxedoAvatar from "../images/tuxedo-mask.jpg";

export default {
  title: "Editors / Post Editor",
  component: PostEditor,
  decorators: [
    (Story) => (
      <EditorContext.Provider value={{ fetchers: embedFetchers }}>
        <ImageUploaderContext.Provider
          value={{
            onImageUploadRequest: async (url) => {
              action("imageUpload")(url);
              return Promise.resolve(`uploaded: ${url}`);
            },
          }}
        >
          {Story()}
        </ImageUploaderContext.Provider>
      </EditorContext.Provider>
    ),
  ],
} as Meta;

const embedFetchers = {
  getOEmbedFromUrl: (url: string) => {
    const LOAD_DELAY = 1000;
    const promise = new Promise((resolve, reject) => {
      fetch(`http://localhost:8061/iframely?uri=${url}`)
        .then((response) => {
          setTimeout(() => {
            resolve(response.json());
          }, LOAD_DELAY);
        })
        .catch((error) => {
          reject(error);
        });
    });
    return promise;
  },
};

const RECENT_BOARDS = [
  {
    slug: "gore",
    avatar: "/" + goreBackground,
    description: "Love me some bruised bois (and more).",
    color: "#f96680",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "oncie-den",
    avatar: "/" + oncelerBoard,
    description: "Party like it's 2012",
    color: "#27caba",
    updates: 10,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "fic-club",
    avatar: "/" + book,
    description: "Come enjoy all the fics!",
    color: "#7724d2",
    updates: 5,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
  {
    slug: "kink-memes",
    avatar: "/" + kinkmeme,
    description: "No limits. No shame.",
    color: "#000000",
    link: { href: "#slug", onClick: action("#slug") },
    updates: 10,
  },
  {
    slug: "areallylongcrackyslug",
    avatar: "/" + crack,
    description: "What's crackalackin",
    color: "#f9e066",
    updates: 3,
    backgroundColor: "#131518",
    link: { href: "#slug", onClick: action("#slug") },
  },
];

const PostEditorTemplate: Story<PostEditorProps> = (args) => (
  <PostEditor {...args} />
);
export const Base = PostEditorTemplate.bind({});
Base.args = {
  secretIdentity: { name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
  userIdentity: { name: "SexyDaddy69", avatar: `/${mamoruAvatar}` },
  onCancel: action("cancel"),
  onSubmit: (promise) => {
    promise.then(action("submit"));
  },
  suggestedCategories: [
    "dank memes",
    "hot yaois",
    "pls.... help....",
    "off topic",
  ],
  availableBoards: RECENT_BOARDS,
  initialBoard: "gore",
};

export const WithAdditionalIdentities = PostEditorTemplate.bind({});
WithAdditionalIdentities.args = {
  ...Base.args,
  additionalIdentities: [
    { id: "id1", name: "Tuxedo Mask", avatar: `/${tuxedoAvatar}` },
    {
      id: "id2",
      name: "Mega Mod",
      avatar: `/${oncelerAvatar}`,
      color: "red",
      accessory: crown,
    },
  ],
};

export const WithSelectView = PostEditorTemplate.bind({});
WithSelectView.args = {
  ...WithAdditionalIdentities.args,
  viewOptions: [{ name: "Thread" }, { name: "Gallery" }, { name: "Timeline" }],
};

export const WithAccessories = PostEditorTemplate.bind({});
WithAccessories.args = {
  ...WithSelectView.args,
  accessories: [
    {
      id: "ac1",
      name: "Reindeer",
      accessory: reindeerEars,
    },
    {
      id: "ac2",
      name: "Crown",
      accessory: crown,
    },
  ],
};

export const SmallestSupportedViewport = PostEditorTemplate.bind({});
SmallestSupportedViewport.args = {
  ...WithAccessories.args,
};
SmallestSupportedViewport.decorators = [
  (Story) => (
    <div style={{ maxWidth: "345px" }}>
      <Story />
    </div>
  ),
];

export const WithinModal = PostEditorTemplate.bind({});
WithinModal.args = {
  ...WithAccessories.args,
};
WithinModal.decorators = [
  (Story) => (
    <Modal isOpen={true}>
      <Story />
    </Modal>
  ),
];

export const LongWithinModal = PostEditorTemplate.bind({});
LongWithinModal.args = {
  ...WithAccessories.args,
  initialText:
    '[{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."},{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."},{"insert":"Open RP"},{"attributes":{"header":1},"insert":"\\n"},{"insert":{"block-image":"https://cdn.discordapp.com/attachments/443967088118333442/691486081895628830/unknown.png"}}, {"attributes":{"italic":true},"insert":"You have my sword..."}]',
};
LongWithinModal.decorators = [
  (Story) => (
    <Modal isOpen={true}>
      <Story />
    </Modal>
  ),
];

export const Loading = PostEditorTemplate.bind({});
Loading.args = {
  ...WithAccessories.args,
  initialText: getInitialTextString(EDITOR_TEXT_VALUES.LONG_WORD),
  loading: true,
};
Loading.decorators = [
  (Story, storyArgs) => {
    const [loading, setLoading] = React.useState(true);
    storyArgs.args.loading = loading;
    return (
      <div style={{ marginLeft: "20px" }}>
        {/* @ts-ignore */}
        <Story />
        <div
          style={{
            position: "absolute",
            right: 0,
            bottom: 0,
            zIndex: 2000,
            display: "flex",
            flexDirection: "column",
          }}
        >
          <Button onClick={() => setLoading(!loading)}>
            Change Load State
          </Button>
        </div>
      </div>
    );
  },
];

export const TestFocus = PostEditorTemplate.bind({});
TestFocus.args = WithAccessories.args;
TestFocus.decorators = [
  (Story) => {
    const postRef = React.createRef<PostEditorHandler>();
    return (
      <div style={{ marginLeft: "20px" }}>
        {/* @ts-ignore */}
        <Story postRef={postRef} />
        <div style={{ marginTop: "20px" }}>
          <Button
            onClick={() => {
              action("focus")(postRef.current);
              postRef.current?.focus();
            }}
          >
            Focus! (TODO: bugged)
          </Button>
        </div>
      </div>
    );
  },
];

export const EditTagsOnly = PostEditorTemplate.bind({});
EditTagsOnly.args = {
  ...WithAccessories.args,
  initialText: getInitialTextString(EDITOR_TEXT_VALUES.LONG_WORD),
  editableSections: {
    tags: true,
  },
};

export const Minimizable = PostEditorTemplate.bind({});
Minimizable.args = {
  ...Base.args,
  minimizable: true,
};
