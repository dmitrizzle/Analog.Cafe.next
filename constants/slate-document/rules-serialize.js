import React from "react";

import { addKey } from "../../core/components/controls/SlateReader";
import Link from "../../core/components/controls/Link";
import Picture from "../../core/components/vignettes/Picture";

export const rulesSerializeWithProps = props => [
  {
    serialize(node, children) {
      const element = node.type;
      switch (element) {
        case "link": {
          const href = node.data.href;
          return addKey(
            <Link
              to={href}
              domain={props.options ? props.options.domain : null}
            >
              {children}
            </Link>
          );
        }
        case "image": {
          return addKey(
            <Picture
              editor={{ value: { isSelected: false } }}
              node={{
                data: { get: object => node.data[object] },
                serial: node.serial,
              }}
              readOnly={true}
            />
          );
          return addKey(<span>{children}</span>);
        }
        default:
          return addKey(<span>{children}</span>);
      }
    },
  },
];
export const RULES_SERIALIZE = [
  {
    serialize(node, children) {
      const element = node.type;
      switch (element) {
        case "paragraph": {
          return addKey(<p>{children}</p>);
        }
        case "quote": {
          return addKey(
            <div style={{ clear: "both" }}>
              <blockquote>{children}</blockquote>
            </div>
          );
        }
        case "heading": {
          return addKey(<h3>{children}</h3>);
        }
        case "divider": {
          return addKey(<hr />);
        }
        case "italic": {
          return addKey(<em>{children}</em>);
        }
        case "bold": {
          return addKey(<strong>{children}</strong>);
        }
      }
    },
  },
];
