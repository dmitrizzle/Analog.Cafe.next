import {
  loadTextContent,
  loadContent,
} from "@roast-cms/french-press-editor/dist/utils/storage";

import { loadHeader } from "./storage";

export const objectFromEditorImmutable = previousDataImmutable => {
  if (!previousDataImmutable) return undefined;
  const previousData = {
    feature: previousDataImmutable.get("feature"),
    file: previousDataImmutable.get("file"),
    src: previousDataImmutable.get("src"),
    key: previousDataImmutable.get("key"),
    caption: previousDataImmutable.get("caption"),
  };
  return previousData;
};

export const isIncomplete = () => {
  const data =
    typeof localStorage === "undefined"
      ? {}
      : {
          header: loadHeader(),
          plaintext: loadTextContent(),
          content: loadContent(),
        };

  const imageKeys = data.content.document.nodes
    .filter(node => !!(node.data && node.data.key))
    .map(node => node.data.key);

  const missingTitle = data.header.title.length < 3;
  const insufficientText = data.plaintext.split(" ").length < 120;
  return missingTitle || insufficientText || imageKeys.length === 0;
};
