export const CARD_AFFILIATE = shop => {
  const endorsement = (
    <p style={{ paddingBottom: "1.5em" }}>
      <strong>
        Analog.Cafe chose to endorse {shop ? shop : "select"} products &
        services.
      </strong>{" "}
      All of the recommendations are based on repeated positive experiences
      being a customer ourselves.
    </p>
  );

  const shopMap = {
    aw: "Analogue Wonderland",
    fb: "FilmBase",
    bmc: "Buy Me a Coffee",
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
          <strong>free roll of 35mm film</strong> with your first order!
        </p>
      </>
    ),
    default: (
      <>
        {endorsement}
        <p style={{ paddingBottom: "1.5em" }}>
          If you choose to purchase{" "}
          {shop
            ? `or use the services of ${shop}`
            : "some of the products linked here"}
          , a small percentage of the sale may come back to Analog.Cafe — at no
          extra cost to you.
        </p>
        <p>Your support is appreciated!</p>
      </>
    ),
  };
  const imageMap = {
    [shopMap.aw]: "image-froth_3880952_rz6iNfqQ0",
  };
  return {
    info: {
      title: "Analog.Cafe Recommends",
      image: imageMap[shop],
      text: messageMap[shop] || messageMap["default"],
    },
    id: "help/affiliate",
  };
};
