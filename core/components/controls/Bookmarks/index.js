import { useSelector, useDispatch } from "react-redux";
import React, { useState } from "react";

import { CardLoading } from "../Card";
import { fetchBookmarks } from "../../../store/actions-bookmarks";
import { getListMeta } from "../../pages/List/utils";
import { makeFroth } from "../../../../utils/froth";
import { turnicateSentence } from "../../../../utils/author-credits";
import { withRedux } from "../../../../utils/with-redux";
import Bookmark from "../../icons/Bookmark";
import CardButton from "../Card/components/CardButton";
import CardCaption from "../Card/components/CardCaption";
import CardSearchItem from "../Card/components/CardSearchItem";
import Form from "../../../../user/components/forms/Form";
import Link from "../Link";
import Spinner from "../../icons/Spinner";
import SubtitleInput from "../../../../user/components/forms/SubtitleInput";

export const Bookmarks = () => {
  const userStatus = useSelector(state => state.user).status;

  const bookmarks = useSelector(state => state.bookmarks);
  const dispatch = useDispatch();

  const { request } = getListMeta("/account");

  useState(() => {
    if (bookmarks.status === "initializing")
      dispatch(fetchBookmarks(request, false));
  });

  const [filterKeyword, setFilterKeyword] = useState("");

  return userStatus === "ok" ? (
    <>
      {bookmarks.items.length > 3 && (
        <Form withinGroup>
          <SubtitleInput
            placeholder={"Filter by Keyword…"}
            onChange={event => {
              setFilterKeyword(event.target?.value);
            }}
            onClick={event => event.stopPropagation()}
            required
            value={filterKeyword}
            maxLength="600"
            type="text"
            title="Filter your bookmarks by keyword"
            autoFocus={
              typeof document !== "undefined" &&
              "ontouchstart" in document.documentElement
                ? false
                : true
            }
          />
        </Form>
      )}

      {bookmarks.status !== "ok" && !bookmarks.items.length && <CardLoading />}
      {!bookmarks.items.length && bookmarks.status === "ok" && (
        <CardCaption>
          <p>
            <Bookmark
              style={{
                height: ".9em",
              }}
            />
            <strong>Bookmark</strong> something, and it will appear here.
          </p>
          <br />
          <p>Your bookmarks are automatically saved to your account.</p>
        </CardCaption>
      )}
      {bookmarks.items.map(item => {
        const Result = (
          <CardSearchItem to={`/r/${item.slug}`} key={item.id}>
            <div>
              {item.title + (item.subtitle ? ": " + item.subtitle : "")}
            </div>
            <figure
              style={{
                backgroundImage: `url(${
                  makeFroth({ src: item.poster, size: "s" }).src
                })`,
              }}
            />
            <em>{turnicateSentence(item.summary, 100)}</em>
          </CardSearchItem>
        );
        const parsedKeywords =
          item.title.toLowerCase() +
          item.subtitle.toLowerCase() +
          item.summary.toLowerCase();
        if (!filterKeyword) return Result;
        if (parsedKeywords.indexOf(filterKeyword.toLowerCase()) > -1)
          return Result;
      })}
      {bookmarks.page &&
        bookmarks.items.length < bookmarks.page["items-total"] && (
          <CardButton
            branded
            onClick={event => {
              event.stopPropagation();
              dispatch(
                fetchBookmarks(
                  {
                    ...request,
                    params: {
                      ...request.params,
                      page: parseInt(bookmarks.page.current) + 1,
                    },
                  },
                  true
                )
              );
            }}
          >
            Load More Bookmarks
            {bookmarks.status !== "ok" && (
              <>
                {" "}
                <Spinner />
              </>
            )}
          </CardButton>
        )}
    </>
  ) : (
    <CardCaption>
      <p>Save and manage your favourite reads across devices.</p>
      <br />
      <p>
        <strong>
          <Link to="/sign-in">Sign Up</Link>
        </strong>{" "}
        to use Bookmarks.
      </p>
    </CardCaption>
  );
};

export default withRedux(Bookmarks);
