export const getFirstNameFromFull = (name, maxlength = 10) => {
  let firstName = name.split(" ")[0];
  return firstName.length > maxlength
    ? firstName.substr(0, maxlength - 1) + "…"
    : firstName;
};

export const turnicateSentence = (sentence, length) => {
  if (!sentence) return;
  if (sentence.length <= length) return sentence;
  let stub = sentence.substr(0, length - 1);
  // stripped whitespace from the tail
  const remainingWords = stub.substr(0, stub.lastIndexOf(" "));
  // strip last punctuation mark
  const stripCharFromEnd = string => {
    if (!string || !string[string.length - 1]) return "";
    return string[string.length - 1].search(/[^\w\s]|_/) > -1
      ? string.substr(0, string.length - 1)
      : string;
  };
  // repeat strip 2x in case there are two punct marks
  const remainingWordsNoChars = stripCharFromEnd(
    stripCharFromEnd(remainingWords)
  );
  return remainingWordsNoChars + "…";
};

// some authors have periods in their name (i.e. A.K.) and thus may not need to be followed by one
export const endWithAPeriod = authors => {
  if (!authors) return;
  const lastAuthorObject = authors[authors.length - 1];
  const lastAuthor = lastAuthorObject.title || lastAuthorObject.name;
  if (lastAuthor && lastAuthor[lastAuthor.length - 1].search(/[^\w\s]|_/) > -1)
    return;
  return ".";
};
