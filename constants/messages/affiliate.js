export const CARD_COMMUNITY_REFERRAL = shop => {
  const endorsement = (
    <p style={{ paddingBottom: "1.5em" }}>
      <strong>
        Analog.Cafe chose to endorse {shop} products because we are their
        customer.
      </strong>{" "}
      We use and trust their service.
    </p>
  );

  const messageMap = {
    FilmBase: (
      <>
        FilmBase is Analog.Cafe’s Etsy shop where we sell premium, tested film
        cameras.
      </>
    ),
    "Analogue Wonderland": (
      <>
        {endorsement}
        <p>
          If you choose to purchase from {shop}, you will get a{" "}
          <strong>free roll of 35mm film</strong>!
        </p>
      </>
    ),
    default: (
      <>
        {endorsement}
        <p>
          If you choose to purchase from {shop}, a small percentage of a sale
          will come back to Analog.Cafe — at no extra cost to you. Your support
          is appreciated!
        </p>
      </>
    ),
  };
  return {
    info: {
      title: "Community Referral",
      text: messageMap[shop] || messageMap["default"],
    },
    id: "help/affiliate",
  };
};
