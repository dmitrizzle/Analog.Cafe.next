import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/storage";
import React from "react";

export default () => <span>{loadTextContent().split(" ").length + 1}</span>;
