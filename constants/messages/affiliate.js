export const CARD_AFFILIATE = shop => {
  const endorsement = (
    <p style={{ paddingBottom: "1.5em" }}>
      <strong>
        Analog.Cafe chooses to endorse {shop ? shop : "select"} products &
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
    default: (
      <>
        {endorsement}
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
