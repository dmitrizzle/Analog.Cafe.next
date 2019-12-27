// eslint-disable-next-line
import React from "react";

import { DOMAIN } from "../../../constants/router/defaults";
import { makeFroth } from "../../../utils/froth";

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
      "If the store you’re shopping at is offering niche film selections, as in something other than Fuji, Kodak, or Ilford, it’s very likely to stock Adox Silvermax. This emulsion has two very interesting properties: an incredible exposure latitude of fourteen zones if developed in their prescribed chemistry, and an optional positive developing process, effectively letting you create black-and-white slides.",
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
      "CineStill is particularly interesting for having no anti-halation layer, which results in an orange glow around lights in the night scenes. Even more peculiarly, this film is meant for specialized ECN-2 process. The team who brought it to still photography market adopted it for standard C-41 chemistry from the movie picture Kodak Vision line.",
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
    description: "A slower, daylight-balanced cousin of CineStill 800T.",
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
      "A classic amongst students and monochrome film shooters on a budget. Low price does not suggest low quality in this Czech-made emulsion.",
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
      "A classic slide film emulsion for that fantastic contrast, extremely fine grain and a colour reproduction. Provia was introduced after Velvia emulsions. It is thought to have better colour management and easier to scan transparency.",
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
    posters: ["image-froth_1500000_ryewB3pwV"],
  },
  {
    brand: "Fujifilm",
    make: "Fujichrome Velvia",
    iso: "100",
    description:
      "Velvia has been pro photographers’ favourite for many years. This medium-low speed ISO stock comes with the strongest colour and contrast out of all Fuji E-6 slide film stocks.",
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
    posters: ["image-froth_1491916_HkglvrnavE"],
  },
  {
    brand: "Fujifilm",
    make: "Fujichrome Velvia",
    iso: "50",
    description:
      "The second most expensive film on this list. It has, perhaps, the finest grain out of all colour emulsions. The film produces a slightly lower contrast than Velvia 100 and, in my experience, tends to make a colder, finer colour palette.",
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
      "One of the cheapest film stocks on the market. Some suspect this to be the film which Agfa has been repackaging and selling as Agfa Vista 200. That, however, is unconfirmed.",
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
      "This film comes in white packaging with green lettering in Japanese. It’s cheap, grainy, has fantastic contrast, and tends to have pronounced blues and reds.",
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
    posters: ["image-froth_1507950_Skbs_Vb07"],
  },
  {
    brand: "Fujifilm",
    make: "Fujicolor Pro",
    iso: "400H",
    description:
      "Comparable Kodak Portra line. This film is fairly easy to find online, though I tend to see it less often in physical stores.",
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
  },
  {
    brand: "Fujifilm",
    make: "Neopan Acros",
    iso: "100",
    description:
      "This fine-grain black-and-white film is one of my personal favourites. The film comes with a silky-smooth texture due to the “finest grain” on the black-and-white emulsion. My favourite property of Neopan Acros, however, is the way it reacts to light. Specifically in high-contrast situations. There are rumours that Fujifilm may not, discontinue this stock (it has been announced to be cut from production in 2018).",
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
    posters: ["image-froth_1512027_B13cpBr2m"],
  },
  {
    brand: "Fujifilm",
    make: "Superia X-Tra",
    iso: "400",
    description:
      "A cheap colour film from Fujifilm. It seems to produce generally warmer tones than most Fuji colour stocks while retaining those signature bright reds.",
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
      "When Kodak made noise in 2018 about bringing back T-Max P3200, Ilford teased that they never left, referring to this very film which they have been producing for some years continuously. Both are the fastest box speed emulsions.",
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
    description: "A fine grain pro line of Ilford action film.",
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
      "An excellent emulsion for street photography. Though grainy it may be the right tool to capture the grittiness of daily human life.",
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
    posters: ["image-froth_1500657_rJEwBnaDV"],
  },
  {
    brand: "Ilford",
    make: "Ortho Plus",
    iso: "80",
    description:
      "Fine-grainde, sharp black and white film. Not sensitive to red hues. It’s capable of producing drammatic portraits, but keep an eye on reddish skin tones, which will turn darker in the final exposure.",
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
      "This is a slow, fine-grained black-and-white film. Good for shallower depth of field in bright light and plenty of detail when enlarged.",
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
      "This is the black-and-white film that could be processed in C-41 (colour) chemistry. Since colour-only labs are more common, this emulsion could be the ticket to cheaper and faster turnaround time for monochrome negatives.",
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
      "This film is a high-contrast monochrome emulsion that Bellamy Hunt, also known as Japan Camera Hunter is sourcing directly from a factory that produces surveillance emulsions.",
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
    posters: ["image-froth_1508229_r1Swr3pPE"],
  },
  {
    brand: "Kodak",
    make: "Ektachrome",
    iso: "E100",
    description:
      "Ektachrome is back! Extremely fine grain, remarkably accurate colour reproduction, reacts well to pushing up to three stops. This slide film comes with remarkably wide exposure latitude.",
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
    posters: ["image-froth_1508296_SylrPr3aPE"],
  },
  {
    brand: "Kodak",
    make: "Ektar",
    iso: "100",
    description:
      "A colour negative that behaves almost like slide film; in my experience I found it to have a fairly narrow exposure latitude as compared to other colour negative films. Kodak Ektar is known to have the finest film grain, a strong contrast, and moderate to high saturation.",
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
    posters: ["image-froth_1508229_HJ8PB36D4"],
  },
  {
    brand: "Kodak",
    make: "Portra",
    iso: "160",
    description:
      "Portra is a premium film line from Kodak with droves of fans around the world. Fine grain and natural tones. I find it to have a little narrower exposure latitude and forgiveness than what I usually like for this speed, however. If overexposed, it may colour shift towards teal.",
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
    posters: ["image-froth_1539629_S1l8vH3avV"],
  },
  {
    brand: "Kodak",
    make: "Portra",
    iso: "400",
    description:
      "The higher-speed Portra is sufficiently different from the 160 version — and not just in sensitivity. This film is generally easier to photograph with and scan. The results are often a bit more forgiving in terms of exposure.",
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
      "Portra 800 is not necessarily well-suited for night photography, despite its high ISO number. It is, however, a great daylight film that brings fantastic details out in the shadows and is quite suitable for overcast days and dim lighting. It is more grainy than its slower speed counterparts, although it tends to have a pleasant texture, especially in the bright areas.",
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
    posters: ["image-froth_666862_S12-Y2vn4"],
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
