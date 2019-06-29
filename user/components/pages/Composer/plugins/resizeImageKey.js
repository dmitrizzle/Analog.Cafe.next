import keycode from "keycode";

import { OBJECT_SLATE_PICTURE_FROM_IMMUTABLE } from "../../../../constants/slate-document-rules";

export default ({ key }) => {
  return {
    onKeyDown(event, change) {
      const { value } = change;
      if (!event.metaKey || keycode(event.which) !== key) return;
      if (value.focusBlock.type !== "image") return;
      event.preventDefault();

      const previousData = OBJECT_SLATE_PICTURE_FROM_IMMUTABLE(
        value.focusBlock.data
      );
      let featureStatus = previousData.feature ? false : true;
      change.setBlocks({
        type: "image",
        data: { ...previousData, feature: featureStatus },
      });
      return true;
    },
  };
};
