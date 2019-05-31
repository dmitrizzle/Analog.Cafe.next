const loadingDecoration =
  "///////// ///// ///////// ////////////// /////////// //////// ///// // ///////// ///// ///////// ////////////// ///////////// ////// /// // ////// ///// ///// ///////// ////////////// /////////// //////// ///// /////////// ///// ///////// ///////// ///// /////////// //////// ///// /////////// ///// ///////// ////////////// /////////// //////// ///// /////////// ///// ///////// ////////// ///////// ///// ///////// / //////// //////////// ///////// /////////// ///////////// / //////// ///// //";

const createPlainDocument = text => {
  return {
    raw: {
      document: {
        nodes: [
          {
            object: "block",
            type: "paragraph",
            nodes: [
              {
                object: "text",
                leaves: [
                  {
                    text: text,
                  },
                ],
              },
            ],
          },
        ],
      },
    },
  };
};

export const DOCUMENT_PLACEHOLDER = createPlainDocument(loadingDecoration);
export const DEFAULT_EDITOR_STATE = createPlainDocument("");
