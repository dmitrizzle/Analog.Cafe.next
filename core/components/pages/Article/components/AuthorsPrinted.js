import React from "react";

import Link from "../../../controls/Link";

export const AuthorsPrinted = ({ authors, shouldLink, limit }) => {
  if (!authors) return null;

  // do not include unknown and unlisted authors
  const listedAuthors = authors.filter(
    author =>
      author.id && author.id !== "unknown" && !author.id.includes("not-listed")
  );

  const Template = ({ author, authorIndex, connector, shouldLink }) => (
    <span>
      {shouldLink && author.id ? (
        <Link to={`/u/${author.id}`}>{author.title || author.name}</Link>
      ) : (
        author.title || author.name
      )}
      {!authorIndex && totalListedAuthors > 1 ? " with iamges by " : connector}
    </span>
  );

  // separate lead author
  const leadAuthor = listedAuthors.filter(
    author => author.authorship === "article"
  );
  const imageAuthors = listedAuthors.filter(
    author => author.authorship === "photography"
  );
  const sortedAuthors = [...leadAuthor, ...imageAuthors];
  const totalAuthors = sortedAuthors.length;
  const totalListedAuthors =
    limit && limit < totalAuthors ? limit : totalAuthors;

  return (
    <>
      {sortedAuthors.map((author, index) => {
        if (index > totalListedAuthors - 1) return null;

        let connector = ", and ";
        if (totalListedAuthors === 3) connector = " and ";
        if (totalListedAuthors > index + 2) connector = ", ";
        if (totalListedAuthors === 1 || index === totalListedAuthors - 1)
          connector = "";

        return (
          <Template
            totalListedAuthors={totalListedAuthors}
            authorIndex={index}
            author={author}
            key={author.id || index}
            connector={connector}
            shouldLink={shouldLink}
          />
        );
      })}
      {limit && totalAuthors - limit > 0 && <> +{totalAuthors - limit}</>}
    </>
  );
};
