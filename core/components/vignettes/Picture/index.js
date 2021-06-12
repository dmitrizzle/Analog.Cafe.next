import { useDispatch, useSelector } from "react-redux";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

import { getPictureInfo } from "../../../store/actions-picture";
import { inputAutoFormat } from "../../../../utils/text-input";
import { paragraph } from "../../../../constants/styles/typography";
import { reset } from "../../../../user/components/forms/SubtitleInput";
import { withRedux } from "../../../../utils/with-redux";
import Figure from "./components/Figure";
import base64ToBlob from "../../../../utils/storage/base-64-to-blob";
import ga from "../../../../utils/data/ga";

export const pictureFromImmutableSlate = previousDataImmutable => {
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

const Textarea = dynamic(() => import("react-textarea-autosize"));
const PictureMenu = dynamic(() =>
  import("../../../../user/components/pages/Composer/components/PictureMenu")
);

const PlainTextarea = styled(Textarea)`
  ${reset};
  ${paragraph}
`;

const Picture = props => {
  const user = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [caption, setCaption] = useState(props.node?.data.get("caption"));
  const [src, setSrc] = useState(props.node?.data.get("src"));
  const [key, setKey] = useState();
  const [captionInputFocus, setCaptionInputFocus] = useState(false);

  const handleChange = event => {
    const caret = event.target.selectionStart;
    const element = event.target;
    window &&
      window.requestAnimationFrame(() => {
        element.selectionStart = caret;
        element.selectionEnd = caret;
      });

    let caption = inputAutoFormat(element.value);
    const { node, editor } = props;
    const feature = node.data.get("feature");
    const src = node.data.get("src");
    const key = node.data.get("key") || false;
    const file = node.data.get("file") || false;
    const properties = { data: { caption, src, feature, key, file } };

    const resolvedState = editor.value
      .change()
      .setNodeByKey(node.key, properties);
    editor.onChange(resolvedState);
    setKey(key);
  };

  const handleTextareaClick = event => {
    event.preventDefault();
    event.stopPropagation();
  };

  props.node?.data.get("caption") !== caption &&
    setCaption(props.node?.data.get("caption"));

  const loadImage = async (file, key) => {
    try {
      if (file && file.constructor !== Object)
        return setSrc(URL.createObjectURL(file));

      const localForage = await import("localforage");
      const data = await localForage.getItem(key);

      if (!data) return;
      const oUrl = URL.createObjectURL(base64ToBlob(data));
      setSrc(oUrl);
    } catch (err) {
      console.log(err);
    }
  };

  (() => {
    const { node } = props;
    if (!node) return;

    const { data } = node;
    const _key = data.get("key");
    const _src = data.get("src");

    if (key === _key) return;
    if (!key && !src) return setSrc(_src);

    const _file = data.get("file");

    if (!_key) return;
    loadImage(_file, _key);
    setKey(_key);
  })();

  useEffect(() => {
    return () => {
      // clean up image blob
      src.includes("blob:") && URL.revokeObjectURL(src);
    };
  }, []);

  const handleRemovePicture = () => {
    const { node, editor } = props;
    if (!editor.value.document.getDescendant(node.key)) return;
    editor.onChange(editor.value.change().removeNodeByKey(node.key));
  };

  const handleFeaturePicture = () => {
    const { node, editor } = props;
    const previousData = pictureFromImmutableSlate(
      editor.value.document.getChild(node.key).data
    );
    let featureStatus = previousData.feature ? false : true;
    editor.onChange(
      editor.value
        .change()
        .setNodeByKey(node.key, {
          type: "image",
          data: { ...previousData, feature: featureStatus },
        })
        .focus()
    );
  };

  const handleGetAuthor = (src, caption) => {
    if (!src || !props.readOnly) return;
    dispatch(getPictureInfo(src, caption));
    ga("event", {
      category: "nav",
      action: "picture.modal",
      label: src,
    });
  };

  const handleCaptionInputBlur = () => setCaptionInputFocus(false);

  const handleCaptionInputFocus = () => setCaptionInputFocus(true);

  const { attributes, node, isSelected, editor, parent } = props;
  if (!editor) return null;
  const focus = editor.value.isFocused && isSelected;
  const className = focus ? "focus" : "nofocus";
  const feature = node.data.get("feature");

  const nextBlock = parent.getNextBlock(node.get("key"));
  const foldSpacer = nextBlock
    ? nextBlock.get("data").get("feature")
      ? true
      : false
    : false;

  return (
    <div
      style={{ clear: "both", position: "relative" }}
      onClick={() => {
        return null;
      }}
    >
      {!props.readOnly && focus ? (
        <PictureMenu
          feature={feature}
          removePicture={handleRemovePicture}
          featurePicture={handleFeaturePicture}
        />
      ) : null}
      <Figure
        {...attributes}
        readOnly={props.readOnly}
        src={src}
        className={className}
        composer={!props.readOnly}
        feature={feature}
        caption={caption}
        foldSpacer={foldSpacer}
        onClick={() => {
          handleGetAuthor(src, caption);
        }}
        userRole={user?.info.role}
        captionInputFocus={captionInputFocus}
        focus={focus}
      >
        {!props.readOnly ? (
          <PlainTextarea
            value={caption}
            placeholder="Add caption&hellip;"
            onChange={handleChange}
            onClick={handleTextareaClick}
            onFocus={handleCaptionInputFocus}
            onBlur={handleCaptionInputBlur}
          />
        ) : (
          <span>{caption}</span>
        )}
      </Figure>
    </div>
  );
};

export default withRedux(Picture);
