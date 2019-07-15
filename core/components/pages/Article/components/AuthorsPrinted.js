import React from "react";

import Link from "../../../controls/Link";

export const AuthorsPrinted = ({ authors, shouldLink }) => {
  if (!authors) return null;
  const Template = ({ author, connector, shouldLink }) => (
    <span>
      {shouldLink ? (
        <Link to={author.id ? `/u/${author.id}` : `/u/not-listed`}>
          {author.title || author.name}
        </Link>
      ) : (
        author.title || author.name
      )}
      {connector}
    </span>
  );

  // separate lead author
  const leadAuthor = authors.filter(author => author.authorship === "article");
  const imageAuthors = authors.filter(
    author => author.authorship === "photography"
  );
  const sortedAuthors = [...leadAuthor, ...imageAuthors];
  const totalAuthors = sortedAuthors.length;

  return sortedAuthors.map((author, index) => {
    let connector = ", and ";
    if (totalAuthors === 2) connector = " and ";
    if (totalAuthors > index + 2) connector = ", ";
    if (totalAuthors === 1 || totalAuthors === index + 1) connector = "";

    return (
      <Template
        author={author}
        key={author.id || index}
        connector={connector}
        shouldLink={shouldLink}
      />
    );
  });
};
