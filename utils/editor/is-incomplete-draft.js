import {
  loadTextContent,
  loadContent,
} from "@roast-cms/french-press-editor/dist/utils/storage";

import { CONTENT_MIN_LENGTH } from "../../constants/composer";
import { loadHeader } from "../storage/ls-composer";

export default () => {
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

  const imageSrcs = data.content.document.nodes
    .filter(node => !!(node.data && node.data.src))
    .map(node => node.data.src);

  const missingTitle = data.header.title.length < 3;
  const insufficientText =
    data.plaintext.split(" ").length < CONTENT_MIN_LENGTH;
  return (
    missingTitle ||
    insufficientText ||
    (imageKeys.length === 0 && imageSrcs.length === 0)
  );
};
