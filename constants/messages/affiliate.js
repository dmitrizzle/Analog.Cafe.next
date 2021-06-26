export const CARD_AFFILIATE = {
  info: {
    title: "Affiliate (ad) Links",
    text: (
      <>
        <p style={{ paddingBottom: "1.5em" }}>
          Our <strong>hand-picked links</strong> from vetted partners like eBay
          are carefully chosen for their quality and relevance.
        </p>
        <p style={{ paddingBottom: "1.5em" }}>
          If you purchase{" "}
          {shop
            ? `or use the services of ${shop}`
            : "certain items linked in this article"}
          , a small percentage of the sale may be paid to Analog.Cafe — at no
          extra cost to you.
        </p>
        <p>Your support is appreciated!</p>
      </>
    ),
  },
  id: "help/affiliate",
};
