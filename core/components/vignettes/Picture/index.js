import { connect } from "react-redux";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import styled from "styled-components";

import base64ToBlob from "../../../../utils/base-64-to-blob";
import ga from "../../../../utils/data/ga";
import { getPictureInfo } from "../../../store/actions-picture";
import { inputAutoFormat } from "../../../../utils/text-input";
import { paragraph } from "../../../../constants/styles/typography";
import { reset } from "../../../../user/components/forms/SubtitleInput";
import Figure from "./components/Figure";
import PictureMenu from "../../../../user/components/pages/Composer/components/PictureMenu";

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
const PlainTextarea = styled(Textarea)`
  ${reset};
  ${paragraph}
`;

const Picture = props => {
  const [caption, setCaption] = useState(props.node?.data.get("caption") || "");
  const [src, setSrc] = useState(props.node?.data.get("src") || "");
  const [key, setKey] = useState("");
  const [authorCard, setAuthorCard] = useState({});
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

  // props.node?.data.get("caption") !== caption &&
  //   setCaption(props.node?.data.get("caption"));

  const loadImage = async (file, key) => {
    try {
      if (file && file.constructor !== Object)
        return setSrc(URL.createObjectURL(file));

      const localForage = await import("localforage");
      await localForage.ready();
      const data = await localForage.getItem(key);

      if (data && base64ToBlob(data))
        return setSrc(URL.createObjectURL(base64ToBlob(data)));

      setKey(key);
    } catch (err) {
      console.log(err);
    }
  };

  (() => {
    if (src) return;
    const { node } = props;
    if (!node) return;
    const { data } = node;
    const caption = data.get("caption");
    const key = data.get("key");
    const file = data.get("file");
    const src = data.get("src");
    setCaption(caption);

    if (!key) setSrc(src);
    else loadImage(file, key);
    setKey(key);
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

  // componentWillReceiveProps = nextProps => {
  //   const caption = nextProps.node.data.get("caption");
  //   if (caption !== this.state.caption) {
  //     this.setState({ caption });
  //   }
  // };

  const handleGetAuthor = src => {
    if (!src || !props.readOnly) return;
    props.getPictureInfo(src);
    ga("event", {
      category: "Navigation",
      action: "Picture.get_author",
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
          handleGetAuthor(src);
        }}
        userRole={props.user && props.user.info.role}
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

// class Picture extends React.PureComponent {
//   constructor(props) {
//     super(props);
//     if (props.node)
//       this.state = {
//         caption: props.node.data.get("caption") || "",
//         src: props.node.data.get("src") || "",
//         key: "",
//         authorCard: {},
//         captionInputFocus: false,
//       };
//     else this.state = {};
//   }
//
//   handleChange = event => {
//     const caret = event.target.selectionStart;
//     const element = event.target;
//     window &&
//       window.requestAnimationFrame(() => {
//         element.selectionStart = caret;
//         element.selectionEnd = caret;
//       });
//
//     let caption = inputAutoFormat(element.value);
//     const { node, editor } = this.props;
//     const feature = node.data.get("feature");
//     const src = node.data.get("src");
//     const key = node.data.get("key") || false;
//     const file = node.data.get("file") || false;
//     const properties = { data: { caption, src, feature, key, file } };
//
//     const resolvedState = editor.value
//       .change()
//       .setNodeByKey(node.key, properties);
//     editor.onChange(resolvedState);
//     this.setState({ key });
//   };
//   handleTextareaClick = event => {
//     event.preventDefault();
//     event.stopPropagation();
//   };
//   componentDidMount = () => {
//     const { node } = this.props;
//     if (!node) return;
//     const { data } = node;
//     const caption = data.get("caption");
//     const key = data.get("key");
//     this.setState({ caption });
//     this.loadImage(data.get("file"), key, data.get("src"));
//     this.setState({ key });
//   };
//   componentWillUnmount = () => {
//     this.state.src.includes("blob:") && URL.revokeObjectURL(this.state.src);
//   };
//   loadImage = (file, key, src) => {
//     if (!key) {
//       this.setState({ src });
//     } else {
//       import("localforage").then(localForage => {
//         localForage.getItem(key).then(data => {
//           if (data) {
//             const src = URL.createObjectURL(base64ToBlob(data));
//             this.setState({ src });
//           } else if (file && file.constructor !== Object) {
//             const src = URL.createObjectURL(file);
//             this.setState({ src });
//           }
//         });
//       });
//       this.setState({ key });
//     }
//   };
//   handleRemovePicture = () => {
//     const { node, editor } = this.props;
//     if (!editor.value.document.getDescendant(node.key)) return;
//     editor.onChange(editor.value.change().removeNodeByKey(node.key));
//   };
//   handleFeaturePicture = () => {
//     const { node, editor } = this.props;
//     const previousData = pictureFromImmutableSlate(
//       editor.value.document.getChild(node.key).data
//     );
//     let featureStatus = previousData.feature ? false : true;
//     editor.onChange(
//       editor.value
//         .change()
//         .setNodeByKey(node.key, {
//           type: "image",
//           data: { ...previousData, feature: featureStatus },
//         })
//         .focus()
//     );
//   };
//   componentWillReceiveProps = nextProps => {
//     const caption = nextProps.node.data.get("caption");
//     if (caption !== this.state.caption) {
//       this.setState({ caption });
//     }
//   };
//   handleGetAuthor = src => {
//     if (!src || !this.props.readOnly) return;
//     this.props.getPictureInfo(src);
//     ga("event", {
//       category: "Navigation",
//       action: "Picture.get_author",
//       label: src,
//     });
//   };
//
//   handleCaptionInputBlur = () => {
//     this.setState({
//       captionInputFocus: false,
//     });
//   };
//   handleCaptionInputFocus = () => {
//     this.setState({
//       captionInputFocus: true,
//     });
//   };
//
//   render = () => {
//     const { attributes, node, isSelected, editor, parent } = this.props;
//     if (!editor) return null;
//     const { src } = this.state;
//     const focus = editor.value.isFocused && isSelected;
//     const className = focus ? "focus" : "nofocus";
//     const feature = node.data.get("feature");
//
//     const nextBlock = parent.getNextBlock(node.get("key"));
//     const foldSpacer = nextBlock
//       ? nextBlock.get("data").get("feature")
//         ? true
//         : false
//       : false;
//
//     return (
//       <div
//         style={{ clear: "both", position: "relative" }}
//         onClick={() => {
//           return null;
//         }}
//       >
//         {!this.props.readOnly && focus ? (
//           <PictureMenu
//             feature={feature}
//             removePicture={this.handleRemovePicture}
//             featurePicture={this.handleFeaturePicture}
//           />
//         ) : null}
//         <Figure
//           {...attributes}
//           readOnly={this.props.readOnly}
//           src={src}
//           className={className}
//           composer={!this.props.readOnly}
//           feature={feature}
//           caption={this.state.caption}
//           foldSpacer={foldSpacer}
//           onClick={() => {
//             this.handleGetAuthor(src);
//           }}
//           userRole={this.props.user && this.props.user.info.role}
//           captionInputFocus={this.state.captionInputFocus}
//           focus={focus}
//         >
//           {!this.props.readOnly ? (
//             <PlainTextarea
//               value={this.state.caption}
//               placeholder="Add caption&hellip;"
//               onChange={this.handleChange}
//               onClick={this.handleTextareaClick}
//               onFocus={this.handleCaptionInputFocus}
//               onBlur={this.handleCaptionInputBlur}
//             />
//           ) : (
//             <span>{this.state.caption}</span>
//           )}
//         </Figure>
//       </div>
//     );
//   };
// }

const mapStateToProps = ({ picture, user }) => {
  return { picture, user };
};
const mapDispatchToProps = dispatch => {
  return {
    getPictureInfo: src => {
      dispatch(getPictureInfo(src));
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Picture);
