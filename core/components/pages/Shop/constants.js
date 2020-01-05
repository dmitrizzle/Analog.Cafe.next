export const SHOP_INVENTORY = [
  {
    title: "PhotoKlassik Magazine",
    referral: "https://photoklassik-international.com/shop/ref/29/",
    poster: "image-froth_1000000_Xnar7C0l",
    description: (
      <>
        <p>
          PhotoKlassik is a one-of-a-kind magazine that reports exclusively on
          film photography.
        </p>
        <p>
          <strong>
            You will be buying directly from PhotoKlassik website.
          </strong>{" "}
          There you’ll be able to select your issue or subscription option.
        </p>
      </>
    ),
    buttons: [
      {
        to: "/r/photoklassik-international-quarterly-magazine-review-ycy3",
        text: "Read the Review",
      },
      {
        to: "REFERRAL",
        text: (
          <>
            Buy Magazine <small style={{ fontSize: ".5em" }}>from</small> $20
          </>
        ),
      },
    ],
  },
];
