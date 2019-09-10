import keycode from "keycode";

export const objectFromImmutable = previousDataImmutable => {
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

export default ({ key }) => {
  return {
    onKeyDown(event, change) {
      const { value } = change;
      if (!event.metaKey || keycode(event.which) !== key) return;
      if (value.focusBlock.type !== "image") return;
      event.preventDefault();

      const previousData = objectFromImmutable(value.focusBlock.data);
      let featureStatus = previousData.feature ? false : true;
      change.setBlocks({
        type: "image",
        data: { ...previousData, feature: featureStatus },
      });
      return true;
    },
  };
};
