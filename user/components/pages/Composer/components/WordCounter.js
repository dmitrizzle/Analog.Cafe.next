import { loadTextContent } from "@roast-cms/french-press-editor/dist/utils/storage";
import React from "react";

const WordCounter = () => <span>{loadTextContent().split(" ").length + 1}</span>;

export default WordCounter;
