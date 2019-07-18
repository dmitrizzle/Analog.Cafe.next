import React from "react";

import Link from "../../../controls/Link";

export const AuthorsPrinted = ({ authors, shouldLink, limit }) => {
  if (!authors) return null;
  const Template = ({ author, connector, shouldLink }) => (
    <span>
      {shouldLink && author.id ? (
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
  const totalListedAuthors =
    limit && limit < totalAuthors ? limit : totalAuthors;

  return (
    <>
      {sortedAuthors.map((author, index) => {
        if (index > totalListedAuthors - 1) return null;

        let connector = ", and ";
        if (totalListedAuthors === 2) connector = " and ";
        if (totalListedAuthors > index + 2) connector = ", ";
        if (totalListedAuthors === 1 || index === totalListedAuthors - 1)
          connector = "";

        return (
          <Template
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
