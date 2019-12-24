import { makeFroth } from "../../../utils/froth";

export const FILM_PRICE_DATA = [
  {
    brand: "Adox",
    make: "Silvermax",
    iso: "100",
    description: (
      <>
        If the store you’re shopping at is offering niche film selections, as in
        something other than Fuji, Kodak, or Ilford, it’s very likely to stock
        Adox Silvermax. This emulsion has two very interesting properties: an
        incredible exposure latitude of fourteen zones if developed in their
        prescribed chemistry, and an optional <em>positive</em> developing
        process, effectively letting you create black-and-white slides.
      </>
    ),
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 11.01,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 11 },
      },
    ],
  },
];

export const CURRENCY = {
  EXCHANGE: { cad: 1, usd: 0.76, eur: 0.68, gbp: 0.58, jpy: 82.24, thb: 22.68 },
  SYMBOL: {
    cad: "$",
    usd: "$",
    eur: "€",
    gbp: "£",
    jpy: "¥",
    thb: "฿",
  },
};

export const seo = {
  title: "35mm Film Price Guide",
  description:
    "How much does 35mm camera film cost? Use this tool to figure out what a fair deal is for your roll, whether the prices have increased or wend down and more.",
  images: [
    {
      url: makeFroth({ src: "image-froth_750000_SkhbW7eNN", size: "m" }).src,
    },
  ],
};
