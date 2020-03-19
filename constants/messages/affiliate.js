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

  const shopMap = {
    aw: "Analogue Wonderland",
    fb: "FilmBase",
  };
  const messageMap = {
    [shopMap.fb]: (
      <>
        {[shopMap.fb]} is Analog.Cafe’s Etsy shop where we sell premium, tested
        film cameras.
      </>
    ),
    [shopMap.aw]: (
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
  const imageMap = {
    [shopMap.aw]: "image-froth_3880952_rz6iNfqQ0",
  };
  return {
    info: {
      title: "Community Referral",
      image: imageMap[shop],
      text: messageMap[shop] || messageMap["default"],
    },
    id: "help/affiliate",
  };
};
