import keycode from "keycode";

import { objectFromEditorImmutable } from "../../../../../utils/composer";

export default ({ key }) => {
  return {
    onKeyDown(event, change) {
      const { value } = change;
      if (!event.metaKey || keycode(event.which) !== key) return;
      if (value.focusBlock.type !== "image") return;
      event.preventDefault();

      const previousData = objectFromEditorImmutable(value.focusBlock.data);
      let featureStatus = previousData.feature ? false : true;
      change.setBlocks({
        type: "image",
        data: { ...previousData, feature: featureStatus },
      });
      return true;
    },
  };
};
