import { DOMAIN } from "../../constants/router/defaults";
import { filmPriceStats } from "./utils";
import { makeFroth } from "../../utils/froth";

const referral = "/account/subscriptions?add=price_updates_35";

export const DATE = {
  published: 1541376000,
  modified: 1625726596,
};
export const FILM_PRICE_DATA = [
  {
    referral,
    referralShopName: "",
    brand: "CineStill",
    make: "",
    iso: "800T",
    description:
      "CineStill is a pre-processed Kodak Vision 3 motion picture film. Initially backed with black sticky stuff called rem-jet, this film has been modified by Brothers Wright to be ready for development in regular C-41 chemistry. The purpose of rem-jet is to filter out halation — red halos around bright objects that form when the light reflects from the pressure plate back into the medium. By having it removed, the resulting emulsion produces unique colour effects, particularly noticeable on dark backgrounds. The halation effect is present to some degree in all films; however, CineStill 800T creates the most pronounced visuals. The “T” stands for the tungsten-balanced colour palette, meant to look natural in yellow light common for indoor lighting; in the daytime, the emulsion produces a teal colour shift. This film can be push-processed up to 3200ISO.",
    posters: [
      "image-froth_1507538_rkvEbPpF4",
      "image-froth_1459238_BkTWtnv3N",
      "image-froth_1479655_Sy0asX-HN",
    ],
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 18.54,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 19.72,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 22.19,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "CineStill",
    make: "",
    iso: "50D",
    description:
      "CineStill 50D is a daylight-balanced pre-processed Kodak Vision 3 motion picture film. Initially backed with black sticky stuff called rem-jet, this film has been modified by Brothers Wright to be ready for development in regular C-41 chemistry. The purpose of rem-jet is to filter out halation – red halos around bright objects. By having it removed, the resulting emulsion produces unique colour effects, particularly noticeable on dark backgrounds. The halation effect is present to some degree in all films; however, CineStill 50D creates particularly pronounced visuals. Because this film is made from modern Kodak emulsion, it’s well-suited for scanning. It features finest colour film grain and produces very accurate colour renditions with reasonable dynamic range and moderate sharpness/contrast. 50D’s scans do not fail to remind of the late Hollywood movie pictures.",
    posters: [
      "image-froth_1502090_ITC9X0qF6",
      "image-froth_1502090_6oAAma1fA",
      "image-froth_1502090_23pXljpvx",
    ],
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 18.08,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 21.48,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 18.78,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Fomapan",
    make: "Classic",
    iso: "100",
    description:
      "Fomapan 100 is a classic choice amongst students and monochrome film shooters on a budget. The film features medium-high contrast and relatively large grain. Kosmo Foto Mono film (see below) is a repackaged version of this chemistry.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 6.27,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 6.7,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 6.96,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Fujifilm",
    make: "Fujichrome Provia",
    iso: "100F",
    description:
      "Fuji Provia is the successor to Fujifilm’s incredible slide emulsion line, Velvia. It features high contrast, fine grain, and scanner-friendly transparency. Being a slide film makes it a great reference for your digital masters and a pleasure to look at. As with most Fuji films, this emulsion shows a slight navy-blue colour shift; it’s also quite sensitive to red colours but is capable of producing natural skin tones.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 24.95,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 25.97,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 27.54,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Fujifilm",
    make: "Fujichrome Velvia",
    iso: "100",
    description:
      "Fuji Velvia 100 is the most contrasty Fujifilm’s slide film stock. This emulsion is often a photographer’s favourite choice for nature and landscape photography. The fine grain and narrow dynamic range could be used to make the details pop and add life to an otherwise flat scene. Being a reversal-type film makes it a great reference for your digital masters and a pleasure to look at straight out of a tank.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 30.83,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 28.94,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 32.8,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Fujifilm",
    make: "Fujichrome Velvia",
    iso: "50",
    description:
      "Fuji Velvia 50 has half the sensitivity of its ISO100 cousin, for which it makes up with a more natural colour palette and even more refined grain renderings. This emulsion can create tones as precise as those of high-end digital cameras while retaining a unique, organic character of the photochemical imaging process. As with most Fuji films, this emulsion shows a slight navy-blue colour shift; however, this is less pronounced with Velvia 50. Being a reversal-type film makes it a great reference for your digital masters and a pleasure to look at.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 31.73,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 28.64,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 30.09,
        },
      },
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
    referral,
    referralShopName: "",
    isDead: false,
    brand: "Fujifilm",
    make: "Fujicolor",
    iso: "C200",
    description:
      "Fujicolor C200 is one of the cheapest colour film stocks on the market. Some suspect this to be the film that Agfa has been repackaging and selling as Agfa Vista 200. That, however, is unconfirmed. This emulsion features medium-sized grain with medium-high saturation, easy to manage dynamic range and a cool colour palette with high sensitivity to red, as it usually tends to be with Fujifilm stocks.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 10.17,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 8.21,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 8.13,
        },
      },
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
    referral,
    referralShopName: "",
    isDead: true,
    brand: "Fujifilm",
    make: "Fujicolor Industrial",
    iso: "100",
    description:
      "This film comes in white packaging with green lettering in Japanese. The Kanji branding, 業務記錄用, denotes that this emulsion is meant to be sold to professional/business customers. Not too long ago, this film used to be one of the cheapest colour emulsions on the market. Following the recent Fujifilm price hike and discontinuations, its cost hovers above the average. Fujicolor Industrial features medium-sized grain, punchy reds, and a slightly warmer colour palette when compared to other Fuji stocks, which tend to shift towards the cooler end of the spectrum.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 10.57,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 16.49,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 15.49,
        },
      },
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
    referral,
    isDead: true,
    referralShopName: "",
    brand: "Fujifilm",
    make: "Fujicolor Pro",
    iso: "400H",
    description:
      "Fujicolor Pro 400H is Fujifilm’s well-received counterpart to Kodak Portra 400 medium-grain pro stock. It’s capable of producing well-saturated/natural, medium-contrast tones in daylight though I found it to be noticeably grany in subdued light. As with most Fuji films, this emulsion may exude a slight navy-blue colour shift, which intensifies when under-exposed.",
    price: [
      {
        date: 1610589155,
        avg: {
          cad: 20.79,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 20.46,
        },
      },
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
      "image-froth_1502469_ivAoXmrom",
      "image-froth_1502090_tkbqwSy-c",
      "image-froth_1502090_owstOGWzs",
    ],
  },
  {
    referral,
    referralShopName: "",
    brand: "Fujifilm",
    make: "Neopan Acros",
    iso: "100",
    description:
      "This black-and-white film is one of my personal favourites. The film features silky-smooth texture thanks to the “finest grain” – as per Fujifilm’s spec sheet. My favourite property of Neopan Acros is the way it saturates with light. Specifically in high-contrast situations. This film was axed in 2018 by Fuji, as part of their film discontinuation spree, only to be revived in late 2019 with modernized chemistry by popular demand.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 16.19,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 16.91,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 18.97,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Fujifilm",
    make: "Superia X-Tra",
    iso: "400",
    description:
      "Fujifilm Superia X-Tra is a moderately-priced high-speed colour film with punchy reds which could spill into the rest of the image, if you aren’t careful with your scans. This film is one of the most common options at brick-and-mortar stores. Its medium-sized grain is strangely fuzzy, though not in a bad way. However, the skin tones tend to suffer from the increased sensitivity to magenta hues. I also found it to behave best with the use of flash as, in my case, it seems to be prone to under-exposure.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 10.53,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 11.16,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 12.22,
        },
      },
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
    posters: ["image-froth_1502090_ADadWNkY", "image-froth_1502090_tHKKG8_0"],
  },
  {
    referral,
    referralShopName: "",
    brand: "Ilford",
    make: "Delta Professional",
    iso: "3200",
    description:
      "When Kodak made noise in 2018 about bringing back T-Max P3200, Ilford teased that they “never left,” referring to this film. Both T-Max and Delta Pro 3200 are the fastest box speed emulsions on the market with chunky grain and high contrast. However, Delta tends to give less punch to the shadows, producing nicely-balanced exposures. This film also dries remarkably flat, which makes scanning and handling very easy.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 15.99,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 14.97,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 15.75,
        },
      },
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
    posters: ["image-froth_1502090_sPfsAOvy", "image-froth_1501974_0amSocyu"],
  },
  {
    referral,
    referralShopName: "",
    brand: "Ilford",
    make: "Delta Professional",
    iso: "400",
    description:
      "There’s a lot of demand for ISO 400 monochrome film from seasoned photographers. It’s easy to meter and is a versatile choice, regardless of the lighting conditions. Ilford’s answer to the quest for the best option is an “action pro” package with grain, contrast, and sharpness similar to Rollei RPX 25, below, but in a faster, slightly grainer format.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 12.18,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 11.24,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 11.97,
        },
      },
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
    posters: ["image-froth_1502253_1Jm7TZlaR", "image-froth_1502253_CDmR5Ryw-"],
  },
  {
    referral,
    referralShopName: "",
    brand: "Ilford",
    make: "FP4 Plus",
    iso: "125",
    description:
      "FP4 Plus is a fine-grained medium-speed black-and-white film. It has a somewhat fuzzy grain structure, but because of its small size and high contrast properties, it still appears very crisp. I opt to shoot it at ISO 100. Being a monochrome emulsion, it is somewhat forgiving with over and under-exposure, however, it requires relatively accurate metering to retain all of the details.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 10.05,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 9.89,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 9.41,
        },
      },
      {
        date: 1577059200,
        avg: {
          cad: 8.83,
        },
      },
    ],
    posters: [
      "image-froth_1502090_UHlKekcl",
      "image-froth_1502090_kR6sF34X",
      "image-froth_665724_SLoUXaJg",
    ],
  },
  {
    referral,
    referralShopName: "",
    brand: "Ilford",
    make: "HP5 Plus",
    iso: "400",
    description:
      "An excellent emulsion for street photography. Though grainy, it may be the right tool to capture the grittiness of daily human life. Fast and easy to develop at home.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 9.66,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 9.35,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 9.65,
        },
      },
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
    referral,
    brand: "Ilford",
    make: "Ortho Plus",
    iso: "80",
    description:
      "Ilford Ortho Plus is a fine-grained, black and white film with medium-high sharpness/contrast. The ortho-type emulsion is not particularly sensitive to red hues but is capable of producing dramatic portraits, and “3D”-looking foileage shots.",
    posters: [
      "image-froth_1502090_C7so4zh0t",
      "image-froth_1502090_b3yLCehFw",
      "image-froth_1502090_gAKXPvDl9",
    ],
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 14.71,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 15.86,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 14.6,
        },
      },
      {
        date: 1577059200,
        avg: {
          cad: 14.18,
        },
      },
    ],
  },
  {
    referral,
    referralShopName: "",
    brand: "Ilford",
    make: "Pan F Plus",
    iso: "50",
    description:
      "Pan F Plus is a slow, fine-grained black-and-white film with medium-high contrast levels and moderate sharpness. It’s capable of rendering both eerie moods and clean tones under appropriate light conditions. The film preserves the detail in shadows and highlights remarkably well. However, in my experience, the negatives are quite curly, making scanning and sleeving an unpleasant task.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 12.5,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 11.26,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 12.6,
        },
      },
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
    posters: [
      "image-froth_1502090_EN0tmzG2",
      "image-froth_665739_Z2pNzG6M",
      "image-froth_1502090_sDH3FXwC",
    ],
  },
  {
    referral,
    referralShopName: "",
    brand: "Ilford",
    make: "XP2 Super",
    iso: "400",
    description:
      "XP2 Super is a black-and-white film emulsion meant to be processed in C-41 (colour) chemistry. Since colour-only labs are more common, this emulsion is the ticket to a cheaper, faster turnaround for over-the-counter monochrome negatives.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 12.7,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 11.8,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 12.42,
        },
      },
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
    posters: ["image-froth_1570133_H16EyzxyM"],
  },
  {
    referral,
    referralShopName: "",
    brand: "JCH",
    make: "StreetPan",
    iso: "400",
    description:
      "This film is a high-contrast medium-grained monochrome emulsion that Bellamy Hunt, also known as Japan Camera Hunter, sourced directly from a factory that produces surveillance emulsions. Though StreetPan creates jet-black shadows and milky-white highlights, it levels off in the extremes, allowing you to retain considerable amount of details in those saturated scenes — more so in the shadows.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 14.5,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 15.71,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 15.87,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Kodak",
    make: "ColorPlus",
    iso: "200",
    description:
      "One of the cheapest 35mm colour film stocks out there. A classic. ColorPlus comes with medium-fine grain and a warm, balanced colour palette with ample contrast to bring out features many other colour emulsions fail to preserve.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 6.99,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 7.37,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 7.26,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Kodak",
    make: "Ektachrome",
    iso: "E100",
    description:
      "Kodak has recently revived its Ektachrome line of slide emulsions. The film is extremely fine-grained and features a more expansive dynamic range than most other E-6 rolls. Because of that, along with a reasonable price tag, Ektachrome is easy to shoot, scan, and make a daily tool for colour light capture. Being a reversal-type film makes it easy to compare your digital results to the original palette and is a pleasure to look at.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 23.5,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 22.58,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 22.83,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Kodak",
    make: "Ektar",
    iso: "100",
    description:
      "A colour negative that behaves almost like slide film. I found it to have a relatively narrow dynamic range as compared to similar emulsions. Kodak Ektar is known to have the finest C-41 film grain (only rivalled by CineStill 50D), a strong contrast, and moderate to high saturation. The film produces punchy greens and vivid reds while still able to hold back when there’s little colour in the scene. Still, some warn against using this emulsion when photographing skin tones as they tend to shift toward the pinks.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 15.57,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 15.16,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 13.63,
        },
      },
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
      "image-froth_1508229_HJ8PB36D4",
      "image-froth_1500000_ryLciivPE",
      "image-froth_666667_Sahpn7Gn",
    ],
  },
  {
    referral,
    referralShopName: "",
    brand: "Kodak",
    make: "Portra",
    iso: "160",
    description:
      "Portra is a premium film line from Kodak with droves of fans around the world. Fine-grained with natural, precisely-balanced tones. The emulsion renders with a variegated palette of dyes with cool mid-tones, and bright yellows. The film, unfortunately, has a narrow dynamic range, and in case of an overly-bright scene, the highlights will clip to teal. Portra 160 looks noticeably cleaner in medium format as its grain feels “dense and noisy” when magnified.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 13.95,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 13.74,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 13.37,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Kodak",
    make: "Portra",
    iso: "400",
    description:
      "The higher-speed Portra 400 is sufficiently different from the 160 version — and not just in speed. Portra is a premium film line from Kodak that features natural-looking, precisely-balanced dyes. The emulsion renders with a variegated palette of colours with cool mid-tones, and bright yellows. 160 has a narrow dynamic range and demands a medium-format-sized plane. 400 is vastly more forgiving with light and is nicely suited for 35mm.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 17.01,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 15.26,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 15.04,
        },
      },
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
    posters: [
      "image-froth_1500000_B1lTycNDY7",
      "image-froth_1773274_HJ_DtP0iM",
    ],
  },
  {
    referral,
    referralShopName: "",
    brand: "Kodak",
    make: "Portra",
    iso: "800",
    description:
      "Portra 800 is ill-suited for night photography with artificial lighting, despite its high ISO number. It is, however, an excellent daylight film that brings fantastic details out in the shadows and performs well in overcast and dim lighting. It is more grainy than its slower speed counterparts. The fastest Portra stock produces significantly more pleasing tones when over-exposed than the 160.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 19.66,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 21.93,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 18.19,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Kodak",
    make: "T-Max",
    iso: "100",
    description:
      "Fine-grain, sharpness, and medium contrast. T-Max is a proprietary technology Kodak has developed, which changes the way silver halide crystals align themselves, resulting in better-resolving emulsions.",
    posters: ["image-froth_1502090_EzOHTadiB", "image-froth_1502090_qNp18GQ1A"],
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 11.99,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 11.37,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 10.88,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Kodak",
    make: "T-Max",
    iso: "400",
    description:
      "T-Max 400 is a fine-grained high-speed black-and-white film. It’s sharp yet with a generally reserved contrast profile allowing it to render minute detail quite well.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 12.03,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 12.76,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 11.81,
        },
      },
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
    posters: ["image-froth_1502630_lo03nOUZ", "image-froth_1502253_G83Nco1A"],
  },
  {
    referral,
    referralShopName: "",
    brand: "Kodak",
    make: "T-Max",
    iso: "P3200",
    description:
      "Similarly to Ilford Delta Professional 3200, this film gifts ridiculous light sensitivity. It was reformulated in 2018 by Kodak, just before their re-release of Ektachrome slide emulsion. When buying medium this sensitive, consider that you’ll need a good light meter to match the emulsion’s exposure power in the dark.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 14.9,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 15.13,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 14.63,
        },
      },
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
    referral,
    referralShopName: "",
    brand: "Kodak",
    make: "Tri-X",
    iso: "400",
    description:
      "Tri-X enjoys reverence amongst film photographers. This emulsion is a dance of contrast, sharpness, and wide dynamic range, providing it with maximum versatility that hangs in a stable balance. The grain consists of pleasing textures – neither overbearing nor reserved.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 11.52,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 11.32,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 10.8,
        },
      },
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
    posters: [
      "image-froth_1513241_SJ8J7C7Ir",
      "image-froth_1500000_SJZbTx6sM",
      "image-froth_1507813_B1Z-ooTSQ",
    ],
  },
  {
    referral,
    referralShopName: "",
    brand: "Kodak",
    make: "UltraMax",
    iso: "400",
    description:
      "UltraMax is a cheap, widely-available, fast colour film. Its grain appears “rounded,” with a slight bias towards warmer tones and an overall well-tuned neutral colour palette. This ISO 400 emulsion is remarkably sharp.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 10.06,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 10.69,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 9.88,
        },
      },
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
    posters: ["image-froth_1494536_wUCUuwph", "image-froth_1494432_HJheOgCrM"],
  },
  {
    referral,
    referralShopName: "",
    brand: "Kosmo Foto",
    make: "Mono",
    iso: "100",
    description:
      "Kosmo Foto is a well-balanced monochrome film with a slightly-larger and rougher-looking gran than what you’d expect from Neopan Acros 100 (at least in my experience). It has a decent dynamic range and exposure latitude; versatile enough to shoot on most days with the right lens.  Mono is unofficially determined to be a repackaged version of Fomapan 100. Fun fact: Mono costs less in some places than Fomapan.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 12.07,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 11.37,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 12.47,
        },
      },
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
    posters: ["image-froth_665739_-3IcgkK85"],
  },
  {
    referral,
    referralShopName: "",
    brand: "Lomography",
    make: "Lomochrome Metropolis",
    iso: "100-400",
    description:
      "“World’s first truly new color negative film stock in over a decade,” this specialty film lets you shoot anywhere between 100 and 400 ISO and process at normal time in C-41 chemicals. It’s fairly grainy with noticeable hue shifts toward green and low overall saturation. The negatives’ masks are uniquely green; the rolls are flat and easy to scan. Note that the film canister does not have a DX code.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 18.03,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 18.85,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 19.01,
        },
      },
    ],
    posters: [
      "image-froth_1502090_1nvM1EybU",
      "image-froth_665739_EP0m4em9",
      "image-froth_1502090_JC-KI-H65",
    ],
  },
  {
    referral,
    referralShopName: "",
    brand: "Lomography",
    make: "Lomochrome Purple",
    iso: "100-400",
    description:
      "This specialty film lets you shoot anywhere between 100 and 400 ISO and process at normal time in C-41 chemicals. The film adds unique purple tones to images, depending on lighting conditions. It’s usually in high demand; the chemistry tends to change over time as Lomography sources new stock to replace depleted stores. Note that the film canister does not have a DX code.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 16.15,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 16.94,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 18.63,
        },
      },
      {
        date: 1577059200,
        avg: {
          cad: 16.89,
        },
      },
    ],
    posters: ["image-froth_1500000_rJWE4RRrm"],
  },
  {
    referral,
    referralShopName: "",
    brand: "Rollei",
    make: "RPX",
    iso: "25",
    description:
      "Rollei’s sharp, low-speed, high-contrast film. RPX 25 is capable of surfacing the curves, details, and characters in images on 35mm like no other in this list. This is my favourite slow-speed monochrome 35mm film.",
    price: [
      {
        date: 1625726596,
        avg: {
          cad: 9.76,
        },
      },
      {
        date: 1610589155,
        avg: {
          cad: 10.39,
        },
      },
      {
        date: 1585963975,
        avg: {
          cad: 11.33,
        },
      },
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
    posters: [
      "image-froth_1502090_SJR6rjdIH",
      "image-froth_1502253_-mnD3nER",
      "image-froth_1502253_LlEVP5-l",
    ],
  },
];

export const DATA_SOURCES = [
  { name: "Analogue Wonderland" },
  { name: "Buy Film Canada" },
  { name: "Film Photography Project" },
  { name: "Adorama" },
  { name: "BH Photo" },
  { name: "Freestyle Photo" },
  { name: "Macodirect" },
  { name: "Walmart" },
];

export const DONOR_ARTICLE = {
  id: "6zt1",
  slug: "35mm-film-price-guide-6zt1",
};

export const routes = {
  self: "/app/average-film-prices",
};
export const seo = {
  title: "Film Prices",
  description: `Searcheable film samples, average prices ($, €, £, ¥, ฿), and mini-reviews. Use this app to save money and get better results from your film. Currently ${
    filmPriceStats().count
  } popular stocks listed.`,
  image: makeFroth({ src: "image-froth_1502630_qLsoYQH6K", size: "m" }).src,
  published: new Date(DATE.published * 1000),
  modified: new Date(DATE.modified * 1000),
  canonical: DOMAIN.PROTOCOL.PRODUCTION + DOMAIN.APP.PRODUCTION + routes.self,
};
