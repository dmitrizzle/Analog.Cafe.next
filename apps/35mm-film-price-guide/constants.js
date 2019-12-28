import { DOMAIN } from "../../constants/router/defaults";
import { makeFroth } from "../../utils/froth";

export const DATE = {
  published: 1541376000,
  modified: 1577059200,
};
export const FILM_PRICE_DATA = [
  {
    brand: "Adox",
    make: "Silvermax",
    iso: "100",
    description:
      "If the store you’re shopping at is offering niche film selections, as in something other than Fuji, Kodak, or Ilford, it’s very likely to stock Adox Silvermax. This emulsion has two fascinating properties: an incredible exposure latitude of fourteen zones if developed in their prescribed chemistry, and an optional positive developing process, effectively letting you create black-and-white slides.",
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
  {
    brand: "CineStill",
    make: "",
    iso: "800T",
    description:
      "CineStill is a pre-processed Kodak Vision 3 motion picture film. Initially backed with black sticky stuff called rem-jet, this film has been modified by “The Brothers Wright,” founders of SineStill, to be ready for development in regular C-41 chemistry. The purpose of rem-jet is to filter out halation – red halos around bright objects, by having it removed, the resulting emulsion produces unique colour effects, particularly noticeable on dark backgrounds. The halation effect is present to some degree in all films; however, CineStill 800T creates the most pronounced visuals. The “T” stands for the tungsten-balanced colour palette, meant to look natural in yellow light common for indoor lighting; in the daytime, the emulsion produces a teal colour shift. This film can be pushed to 3200ISO.",
    posters: ["image-froth_1507538_rkvEbPpF4", "image-froth_1459238_BkTWtnv3N"],
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 17.97,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 15 },
      },
    ],
  },
  {
    brand: "CineStill",
    make: "",
    iso: "50D",
    description:
      "Initially backed with black sticky stuff called rem-jet, this film has been modified by “The Brothers Wright,” founders of SineStill, to be ready for development in regular C-41 chemistry. The purpose of rem-jet is to filter out halation – red halos around bright objects, by having it removed, the resulting emulsion produces unique colour effects, particularly noticeable on dark backgrounds. The halation effect is present to some degree in all films; however, CineStill 800T creates the most pronounced visuals.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 16.74,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 15 },
      },
    ],
  },
  {
    brand: "Fomapan",
    make: "Classic",
    iso: "100",
    description:
      "Fomapan 100 is a classic choice amongst students and monochrome film shooters on a budget. The film features medium-high contrast and relatively large grain.  This emulsion is also the basis for KosmoFoto Mono, which is a beautifully-rebranded Foma.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 6.19,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 6 },
      },
    ],
  },
  {
    brand: "Fujifilm",
    make: "Fujichrome Provia",
    iso: "100F",
    description:
      "Fuji Provia is the successor to Fujifilm’s incredible slide emulsion line, Velvia. It features high contrast, fine grain, and scanner-friendly transparency. Being a slide film makes it easy to compare your digital results to the original palette and is a pleasure to look at. As with most Fuji films, this emulsion shows a slight navy-blue colour shift; it’s also quite sensitive to red colours while retaining natural skin tones.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 26.37,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 18 },
      },
    ],
    posters: ["image-froth_1500000_ryewB3pwV", "image-froth_1500000_cFx3Otqm"],
  },
  {
    brand: "Fujifilm",
    make: "Fujichrome Velvia",
    iso: "100",
    description:
      "Fuji Velvia 100 is the most contrasty Fujifilm’s slide film stock. This fine emulsion is often a photographer’s favourite choice for nature and landscape photography. The fine grain and low exposure latitude could be used to make the details pop and add life to an otherwise flat scene. Being a slide film makes it easy to compare your digital results to the original palette and is a pleasure to look at.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 24.33,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 19 },
      },
    ],
    posters: [
      "image-froth_1491916_HkglvrnavE",
      "image-froth_1500000_B1LqgT2pG",
      "image-froth_1500000_BJ7LbcnLG",
      "image-froth_666667_r1fUb9n8G",
    ],
  },
  {
    brand: "Fujifilm",
    make: "Fujichrome Velvia",
    iso: "50",
    description:
      "Fuji Velvia 50 has half the sensitivity of its ISO100 cousin, for which it makes up with a more natural colour palette and even more refined grain renderings. This emulsion can create tones as precise as those of high-end digital cameras while retaining a unique, organic character of the photochemical imaging process. As with most Fuji films, this emulsion shows a slight navy-blue colour shift; however, this is less pronounced with Velvia 50. Being a slide film makes it easy to compare your digital results to the original palette and is a pleasure to look at.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 28.13,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 22 },
      },
    ],
    posters: ["image-froth_1500000_Skbvrn6wN"],
  },
  {
    isDead: true,
    brand: "Fujifilm",
    make: "Fujicolor",
    iso: "C200",
    description:
      "Fujicolor C200 is one of the cheapest film stocks on the market. Some suspect this to be the film that Agfa has been repackaging and selling as Agfa Vista 200. That, however, is unconfirmed. This emulsion features medium-sized grain with medium-high saturation, easy to manage exposure latitude and a cool colour palette with high sensitivity to red, as it usually tends to be with Fujifilm stocks.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 6.18,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 6 },
      },
    ],
    posters: ["image-froth_1508229_SyMwr26wV"],
  },
  {
    brand: "Fujifilm",
    make: "Fujicolor Industrial",
    iso: "100",
    description:
      "This film comes in white packaging with green lettering in Japanese. The Kanji branding, 業務記錄用, denotes that this emulsion is meant to be sold to business customers. However, it’s been in use by amateurs alike. Not too long ago, this film used to be one of the cheapest colour emulsions on the market. Alas, after the recent Fujifilm price hikes and discontinuations, its cost hovers above the average. Fujicolor Industrial features medium-sized grain, punchy reds, and a slightly warmer colour palette when compared to other Fuji stocks, which tend to shift towards the cooler end of the spectrum.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 15.07,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 9 },
      },
    ],
    posters: [
      "image-froth_1507950_Skbs_Vb07",
      "image-froth_1494536_H1k8Wc2UG",
      "image-froth_1559259_HyMspQxcz",
    ],
  },
  {
    brand: "Fujifilm",
    make: "Fujicolor Pro",
    iso: "400H",
    description:
      "Fujicolor Pro 400H is Fujifilm’s well-received counterpart to Kodak Portra 400 medium-grain pro stock. It’s capable of producing natural tones in daylight though I found it to become less useable in dark shadows or subdued light. As with most Fuji films, this emulsion shows a slight navy-blue colour shift, which intensifies in the dusk.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 18.92,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 13 },
      },
    ],
    posters: [
      "image-froth_1502059_hJ6CpHWf",
      "image-froth_1502253_6h16tYX0",
      "image-froth_1502253_2wYiTdiV",
    ],
  },
  {
    brand: "Fujifilm",
    make: "Neopan Acros",
    iso: "100",
    description:
      "This fine-grain black-and-white film is one of my personal favourites. The film features a silky-smooth texture thanks to the “finest grain” on the black-and-white emulsion – as per Fujifilm’s spec sheet. My favourite property of Neopan Acros is the way it saturates with light. Specifically in high-contrast situations. This film was axed in 2018 by Fuji, as part of their film discontinuation spree, only to be revived in late 2019 with modernized chemistry due to popular demand.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 14.55,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 13 },
      },
    ],
    posters: [
      "image-froth_656127_BJW79SlxX",
      "image-froth_1424197_HkHi_M4-r",
      "image-froth_1498848_S1cfqSlem",
      "image-froth_1512027_B13cpBr2m",
    ],
  },
  {
    brand: "Fujifilm",
    make: "Superia X-Tra",
    iso: "400",
    description:
      "Fujifilm Superia X-Tra is a moderately-priced high-speed colour film with punchy reds and balanced blues. This film is one of the most common options at brick-and-mortar stores. From what I’ve seen, the palette is a little too muddy for my taste. Its medium-sized grain is strangely fuzzy, though not in a bad way; however, the skin tones tend to suffer from the increased sensitivity to magenta hues.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 9.26,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 7 },
      },
    ],
  },
  {
    brand: "Ilford",
    make: "Delta Professional",
    iso: "3200",
    description:
      "When Kodak made noise in 2018 about bringing back T-Max P3200, Ilford teased that they never left, referring to this very film which they have been producing for some years continuously. Both T-Max and Delta Pro 3200 are the fastest box speed emulsions with chunky grain and high contrast. However, Delta tends to give less punch to the shadows, producing a more balanced/less contrasty photographs.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 13.04,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 13 },
      },
    ],
  },
  {
    brand: "Ilford",
    make: "Delta Professional",
    iso: "400",
    description: "A fine grain pro line of Ilford’s “action” film.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 11.95,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 10 },
      },
    ],
  },
  {
    brand: "Ilford",
    make: "FP4 Plus",
    iso: "125",
    description: "A sharp, fine-grained medium-speed black-and-white film.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 17.97,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 15 },
      },
    ],
  },
  {
    brand: "Ilford",
    make: "HP5 Plus",
    iso: "400",
    description:
      "An excellent emulsion for street photography. Though grainy, it may be the right tool to capture the grittiness of daily human life. Fast and easy to develop at home.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 8.99,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 8 },
      },
    ],
    posters: [
      "image-froth_653846_S1U75Hgxm",
      "image-froth_1515232_BkoM9Heg7",
      "image-froth_1500657_rJEwBnaDV",
    ],
  },
  {
    brand: "Ilford",
    make: "Ortho Plus",
    iso: "80",
    description:
      "Ilford Ortho Plus is a fine-grained, sharp black and white film. It’s been released in 35mm at the end of 2019. Not sensitive to red hues. It’s capable of producing dramatic portraits, but keep an eye on reddish skin tones, which may turn darker in the final exposure.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 14.18,
        },
      },
    ],
  },
  {
    brand: "Ilford",
    make: "Pan F Plus",
    iso: "50",
    description:
      "Pan F Plus is a slow, fine-grained black-and-white film. Great for shallower depth of field in bright light and plenty of detail when enlarged.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 10.5,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 11 },
      },
    ],
  },

  {
    brand: "Ilford",
    make: "XP2 Super",
    iso: "400",
    description:
      "XP2 Super is the black-and-white film that should be processed in C-41 (colour) chemistry. Since colour-only labs are more commonly-found world-wide, this emulsion is the ticket to the cheaper and faster turnaround time for monochrome negatives.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 10.89,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 12 },
      },
    ],
  },
  {
    brand: "JCH",
    make: "StreetPan",
    iso: "400",
    description:
      "This film is a high-contrast medium-grained monochrome emulsion that Bellamy Hunt, also known as Japan Camera Hunter, sourced directly from a factory that produces surveillance emulsions. Though StreetPan creates jet-black shadows and milky-white highlights, it levels off in the extremes, letting you retain the details in those saturated scenes.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 13.98,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 12 },
      },
    ],
    posters: ["image-froth_1502090_6yvQS2r1", "image-froth_1502090_GyWTCRpg"],
  },
  {
    brand: "Kodak",
    make: "ColorPlus",
    iso: "200",
    description:
      "One of the cheapest 35mm colour film stocks out there. A classic.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 5.16,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 6 },
      },
    ],
    posters: [
      "image-froth_1508229_r1Swr3pPE",
      "image-froth_1480456_SknzHBAz7",
      "image-froth_1484058_By2sarKvG",
    ],
  },
  {
    brand: "Kodak",
    make: "Ektachrome",
    iso: "E100",
    description:
      "Kodak has recently revived its Ektachrome line of slide emulsions. The film is extremely fine-grained and features a more forgiving exposure latitude than most other E-6 rolls. Because of that, along with a reasonable price tag, Ektachrome is easy to shoot, scan, and make a daily tool for colour light capture. Being a slide film makes it easy to compare your digital results to the original palette and is a pleasure to look at.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 18.76,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 21 },
      },
    ],
    posters: [
      "image-froth_1508296_SylrPr3aPE",
      "image-froth_1600000_ByxOKgftaX",
      "image-froth_1508296_qJKV59N0",
    ],
  },
  {
    brand: "Kodak",
    make: "Ektar",
    iso: "100",
    description:
      "A colour negative that behaves almost like slide film; in my experience, I found it to have a reasonably narrow exposure latitude as compared to other colour negative films. Kodak Ektar is known to have the finest C-41 film grain (only rivalled by CineStill 50D), a strong contrast, and moderate to high saturation. The film produces punchy greens and vivid reds while still able to hold back when there’s little colour in the scene. Still, some photographers warn against using this emulsion when photographing skin tones as they tend to shift towards pink.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 11.4,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 11 },
      },
    ],
    posters: [
      "image-froth_1480456_Hke9zAIxg4",

      "image-froth_1508229_HJ8PB36D4",
      "image-froth_1500000_ryLciivPE",

      "image-froth_666667_Sahpn7Gn",
      "image-froth_1014885_HyiosRs3z",
    ],
  },
  {
    brand: "Kodak",
    make: "Portra",
    iso: "160",
    description:
      "Portra is a premium film line from Kodak with droves of fans around the world. Fine-grained with natural, precisely-balanced tones. The emulsion renders with a variegated palette of dyes with cool mid-tones, and bright yellows. The film, unfortunately, has a narrow exposure latitude, and in case of over-exposure, its greys clip to teal. Portra 160 looks noticeably cleaner in medium format as its grain feels “dense” when magnified.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 13.59,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 10 },
      },
    ],
    posters: [
      "image-froth_1539629_S1l8vH3avV",
      "image-froth_1507950_dX6JL7Nt",
      "image-froth_1507950_xRYjZ7u6",
    ],
  },
  {
    brand: "Kodak",
    make: "Portra",
    iso: "400",
    description:
      "The mid-ISO Portra 400 is sufficiently different from the 160 version — and not just in speed. Portra is a premium film line from Kodak that features natural-looking, precisely-balanced dyes. The emulsion renders with a variegated palette of colours with cool mid-tones, and bright yellows. 160 has a narrow exposure latitude and prefers a medium-format-sized plane. 400 is vastly more forgiving with light and is nicely suited for 35mm.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 12.94,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 11 },
      },
    ],
    posters: ["image-froth_1508789_HyiZvhawN"],
  },
  {
    brand: "Kodak",
    make: "Portra",
    iso: "800",
    description:
      "Portra 800 is ill-suited for night photography with artificial lighting, despite its high ISO number. It is, however, an excellent daylight film that brings fantastic details out in the shadows and performs well in overcast and dim lighting. It is more grainy than its slower speed counterparts. The fastest Portra stock exposes significantly more pleasing tones when over-exposed than 160.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 15.02,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 13 },
      },
    ],
    posters: ["image-froth_1522796_S1FnaJA7r", "image-froth_1522796_awyCI4-T"],
  },
  {
    brand: "Kodak",
    make: "T-Max",
    iso: "100",
    description:
      "Fine grain, sharpness, all of it. T-Max is a proprietary technology Kodak has developed which changes the way silver halide crystals align themselves, resulting in better-resolving emulsions.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 8.97,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 8 },
      },
    ],
  },
  {
    brand: "Kodak",
    make: "T-Max",
    iso: "400",
    description:
      "One of the finest-grained high-speed black-and-white films on the market. Similar, but not the same, as Ilford Delta series.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 9.23,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 8 },
      },
    ],
  },
  {
    brand: "Kodak",
    make: "T-Max",
    iso: "P3200",
    description:
      "A seemingly higher-contrast version of Ilford Delta Professional 3200 for the ridiculous light sensitivity, only recently brought back from the dead by Kodak. When buying film this sensitive, consider that you will need a good light meter to match its tolerance in the dark.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 11.27,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 12 },
      },
    ],
    posters: ["image-froth_1502090_H1SzBNQF4"],
  },

  {
    brand: "Kodak",
    make: "Tri-X",
    iso: "400",
    description:
      "This is one of the topmost favourite emulsions by monochrome photographers. A balance of contrast, grain, and versatility.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 9.4,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 8 },
      },
    ],
  },
  {
    brand: "Kodak",
    make: "UltraMax",
    iso: "400",
    description: "Cheap, widely-available, fast colour film.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 8.58,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 7 },
      },
    ],
  },
  {
    brand: "Kosmofoto",
    make: "Mono",
    iso: "100",
    description:
      "Kosmofoto Stephen Dowling’s branded emulsion. Undoubtedly, one of the prettiest film packages on any shelf. You should know that this is a rebranded emulsion, similar to how Agfa Vista is a rebranded Fuji film.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 11.61,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 8 },
      },
    ],
  },
  {
    brand: "Lomography",
    make: "Lomochrome Purple",
    iso: "100-400",
    description:
      "This speciality film lets you shoot anywhere between 100 and 400 ISO, as long as you process according to the temperature specifications in C-41 chemicals. The film adds unique purple tones to images, depending on lighting conditions.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 16.89,
        },
      },
    ],
  },
  {
    brand: "Rollei",
    make: "RPX",
    iso: "25",
    description:
      "A sharp, low-speed, high-contrast film. The slowest film of the bunch.",
    price: [
      {
        date: 1577059200,
        avg: {
          cad: 10.44,
        },
      },
      {
        date: 1541376000,
        avg: { cad: 10 },
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

export const DONNOR_ARTICLE = {
  id: "6zt1",
  slug: "35mm-film-price-guide-6zt1",
};

export const routes = {
  self: "/app/35mm-film-price-guide",
};
export const seo = {
  title: "35mm Film Price Guide",
  description:
    "How much does 35mm camera film cost? Use this tool to quickly find film that costs and looks right.",
  image: makeFroth({ src: "image-froth_750000_SkhbW7eNN", size: "m" }).src,
  published: new Date(DATE.published * 1000),
  modified: new Date(DATE.modified * 1000),
  canonical: DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION + routes.self,
};
