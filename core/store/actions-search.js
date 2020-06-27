import { GOOGLE_SEARCH_API } from "../../constants/authentication";
import puppy from "../../utils/puppy";

export const setSearchResults = (data, appendItems = false) => {
  if (appendItems === false)
    return {
      type: "SEARCH.SET_RESULTS",
      payload: data,
    };
  return {
    type: "SEARCH.ADD_RESULTS",
    payload: data,
  };
};
export const setSearchStatus = isFetching => {
  return {
    type: "SERCH.SET_STATUS",
    payload: isFetching,
  };
};

const TEST = {
  kind: "customsearch#search",
  url: {
    type: "application/json",
    template:
      "https://www.googleapis.com/customsearch/v1?q={searchTerms}&num={count?}&start={startIndex?}&lr={language?}&safe={safe?}&cx={cx?}&sort={sort?}&filter={filter?}&gl={gl?}&cr={cr?}&googlehost={googleHost?}&c2coff={disableCnTwTranslation?}&hq={hq?}&hl={hl?}&siteSearch={siteSearch?}&siteSearchFilter={siteSearchFilter?}&exactTerms={exactTerms?}&excludeTerms={excludeTerms?}&linkSite={linkSite?}&orTerms={orTerms?}&relatedSite={relatedSite?}&dateRestrict={dateRestrict?}&lowRange={lowRange?}&highRange={highRange?}&searchType={searchType}&fileType={fileType?}&rights={rights?}&imgSize={imgSize?}&imgType={imgType?}&imgColorType={imgColorType?}&imgDominantColor={imgDominantColor?}&alt=json",
  },
  queries: {
    request: [
      {
        title: "Google Custom Search - test",
        totalResults: "24",
        searchTerms: "test",
        count: 10,
        startIndex: 1,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "013056101972584049933:x1gt1xvwgyu",
      },
    ],
    nextPage: [
      {
        title: "Google Custom Search - test",
        totalResults: "24",
        searchTerms: "test",
        count: 10,
        startIndex: 11,
        inputEncoding: "utf8",
        outputEncoding: "utf8",
        safe: "off",
        cx: "013056101972584049933:x1gt1xvwgyu",
      },
    ],
  },
  context: {
    title: "Analog.Cafe",
  },
  searchInformation: {
    searchTime: 0.442372,
    formattedSearchTime: "0.44",
    totalResults: "24",
    formattedTotalResults: "24",
  },
  items: [
    {
      kind: "customsearch#result",
      title:
        "Lomochrome Metropolis: Specs, History, and a Detailed Overview of ...",
      htmlTitle:
        "Lomochrome Metropolis: Specs, History, and a Detailed Overview of ...",
      link: "https://www.analog.cafe/r/lomochrome-metropolis-ko2u",
      displayLink: "www.analog.cafe",
      snippet:
        "A double exposure by Louis Dazy, taken on one of the test rolls. ... The film, while \nstill being tested and tweaked, is ready to be packaged in 35mm, 120, 110 and ...",
      htmlSnippet:
        "A double exposure by Louis Dazy, taken on one of the \u003cb\u003etest\u003c/b\u003e rolls. ... The film, while \u003cbr\u003e\nstill being \u003cb\u003etested\u003c/b\u003e and tweaked, is ready to be packaged in 35mm, 120, 110 and&nbsp;...",
      cacheId: "GPLlLLtqjvEJ",
      formattedUrl: "https://www.analog.cafe/r/lomochrome-metropolis-ko2u",
      htmlFormattedUrl: "https://www.analog.cafe/r/lomochrome-metropolis-ko2u",
      pagemap: {
        cse_thumbnail: [
          {
            src:
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcTz_kBoYkBmBaFF4cVfGLq7tWhyMHXsH6nkvdUkorLWOIsrVbgb3j2Qdajh",
            width: "275",
            height: "183",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1499531_Hy4x9yXWr.jpg",
            "next-head-count": "15",
            "twitter:card": "summary_large_image",
            "og:type": "article",
            "apple-mobile-web-app-status-bar-style": "whtie",
            "twitter:site": "@analog_cafe",
            viewport: "initial-scale=1.0, width=device-width",
            "apple-mobile-web-app-capable": "yes",
            "og:title":
              "Lomochrome Metropolis: Specs, History, and a Detailed Overview of the New Film From Lomography",
            "og:description":
              "New colour film is coming! I spoke with Birgit Buchart, a Marketing PR Manager at Lomography USA on Thursday about the email I’ve received earlier. Titled: “Confidential: NEW Lomography Color Negative Film in the Making. ”Today I am able to reveal some of the details about this new stock.",
          },
        ],
        cse_image: [
          {
            src:
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1499531_Hy4x9yXWr.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Testing the Canon Sure Shot AF-7 in Chongqing: Part 2 of 2 ...",
      htmlTitle:
        "\u003cb\u003eTesting\u003c/b\u003e the Canon Sure Shot AF-7 in Chongqing: Part 2 of 2 ...",
      link:
        "https://www.analog.cafe/r/testing-the-canon-sure-shot-af-7-in-chongqing-f083",
      displayLink: "www.analog.cafe",
      snippet:
        "This post is Part 2 of a test run did of an old film camera I bought. The camera, a \nCanon Sure Shot AF-7, was loaded with Kodak ColorPlus. The images are very,\n ...",
      htmlSnippet:
        "This post is Part 2 of a \u003cb\u003etest\u003c/b\u003e run did of an old film camera I bought. The camera, a \u003cbr\u003e\nCanon Sure Shot AF-7, was loaded with Kodak ColorPlus. The images are very,\u003cbr\u003e\n&nbsp;...",
      cacheId: "aZFLFFnHn0IJ",
      formattedUrl:
        "https://www.analog.cafe/.../testing-the-canon-sure-shot-af-7-in-chongqing- f083",
      htmlFormattedUrl:
        "https://www.analog.cafe/.../\u003cb\u003etesting\u003c/b\u003e-the-canon-sure-shot-af-7-in-chongqing- f083",
      pagemap: {
        cse_thumbnail: [
          {
            src:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQoL7ryBFilC9hY-Rgr7AXf64OSy1YS5fmVrq53lGLISrdTZJIGH_cbS4bu",
            width: "274",
            height: "184",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1484058_By2sarKvG.jpg",
            "next-head-count": "15",
            "twitter:card": "summary_large_image",
            "og:type": "article",
            "apple-mobile-web-app-status-bar-style": "whtie",
            "twitter:site": "@analog_cafe",
            viewport: "initial-scale=1.0, width=device-width",
            "apple-mobile-web-app-capable": "yes",
            "og:title":
              "Testing the Canon Sure Shot AF-7 in Chongqing: Part 2 of 2",
            "og:description":
              "This post is Part 2 of a test run did of an old film camera I bought. The camera, a Canon Sure Shot AF-7, was loaded with Kodak ColorPlus. The images are very, very minimally cropped, if at all. I wanted to preserve imperfections at the edges of the frames and also keep a consistent feel to the set.",
          },
        ],
        cse_image: [
          {
            src:
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1484058_By2sarKvG.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "Testing the Olympus Supertrip in Shanghai: A New Old Camera in a ...",
      htmlTitle:
        "\u003cb\u003eTesting\u003c/b\u003e the Olympus Supertrip in Shanghai: A New Old Camera in a ...",
      link:
        "https://www.analog.cafe/r/testing-the-olympus-supertrip-in-shanghai-sfd8",
      displayLink: "www.analog.cafe",
      snippet:
        "... them both here. While the test run of the Canon Sure Shot AF-7 was mainly \ndone in Chongqing, I tested the Olympus Supertrip once I'd got back to Shanghai.",
      htmlSnippet:
        "... them both here. While the \u003cb\u003etest\u003c/b\u003e run of the Canon Sure Shot AF-7 was mainly \u003cbr\u003e\ndone in Chongqing, I \u003cb\u003etested\u003c/b\u003e the Olympus Supertrip once I&#39;d got back to Shanghai.",
      cacheId: "xkRBCW6Xg98J",
      formattedUrl:
        "https://www.analog.cafe/r/testing-the-olympus-supertrip-in-shanghai-sfd8",
      htmlFormattedUrl:
        "https://www.analog.cafe/r/\u003cb\u003etesting\u003c/b\u003e-the-olympus-supertrip-in-shanghai-sfd8",
      pagemap: {
        cse_thumbnail: [
          {
            src:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSZQ-dLllGwgDf8Vn0Wm2IVziQST0kGCDaCjsja3LOa2XNwff6vcJIVkyBy",
            width: "274",
            height: "184",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1484072_3da5a59cfca54a44a065728dea6e4ffa.jpg",
            "next-head-count": "15",
            "twitter:card": "summary_large_image",
            "og:type": "article",
            "apple-mobile-web-app-status-bar-style": "whtie",
            "twitter:site": "@analog_cafe",
            viewport: "initial-scale=1.0, width=device-width",
            "apple-mobile-web-app-capable": "yes",
            "og:title":
              "Testing the Olympus Supertrip in Shanghai: A New Old Camera in a New Old City",
            "og:description":
              "The Olympus Supertrip is the second of two film cameras I picked up from a charity shop in Nottingham. The other was a Canon Sure Shot AF-7. If you’ve not read it yet, I’d recommend the article I wrote about them both here. While the test run of the Canon Sure Shot AF-7 was mainly done in Chongqing, I tested the Olympus Supertrip once I’d got back to Shanghai.",
          },
        ],
        cse_image: [
          {
            src:
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1484072_3da5a59cfca54a44a065728dea6e4ffa.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Testing the Canon Sure Shot AF-7 in Chongqing: Part 1 of 2 ...",
      htmlTitle:
        "\u003cb\u003eTesting\u003c/b\u003e the Canon Sure Shot AF-7 in Chongqing: Part 1 of 2 ...",
      link:
        "https://www.analog.cafe/r/testing-the-canon-sure-shot-af-7-in-chongquing-u79w",
      displayLink: "www.analog.cafe",
      snippet:
        "Airport Square in Chongqing is probably not a place you'll ever go to. That's not \nme being an elitist travel bore. Not deliberately anyway. Airport Square is a ...",
      htmlSnippet:
        "Airport Square in Chongqing is probably not a place you&#39;ll ever go to. That&#39;s not \u003cbr\u003e\nme being an elitist travel bore. Not deliberately anyway. Airport Square is a&nbsp;...",
      cacheId: "DAgJ4WzrTKoJ",
      formattedUrl:
        "https://www.analog.cafe/.../testing-the-canon-sure-shot-af-7-in-chongquing- u79w",
      htmlFormattedUrl:
        "https://www.analog.cafe/.../\u003cb\u003etesting\u003c/b\u003e-the-canon-sure-shot-af-7-in-chongquing- u79w",
      pagemap: {
        cse_thumbnail: [
          {
            src:
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcQaHj7B6SAWpZ-3DWP3Lt0duW39g5rzZIHlDlqmlI4zgOltVN3SzoaPPP0",
            width: "274",
            height: "184",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1484058_HJcHsSFwz.jpg",
            "next-head-count": "15",
            "twitter:card": "summary_large_image",
            "og:type": "article",
            "apple-mobile-web-app-status-bar-style": "whtie",
            "twitter:site": "@analog_cafe",
            viewport: "initial-scale=1.0, width=device-width",
            "apple-mobile-web-app-capable": "yes",
            "og:title":
              "Testing the Canon Sure Shot AF-7 in Chongqing: Part 1 of 2",
            "og:description":
              "Airport Square in Chongqing is probably not a place you’ll ever go to. That’s not me being an elitist travel bore. Not deliberately anyway. Airport Square is a place I found myself in due to a bonus day in Chongqing after a delayed flight caused a missed connection.",
          },
        ],
        cse_image: [
          {
            src:
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1484058_HJcHsSFwz.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Voigtländer Vitessa L: German Precision Optics in a Foldable ...",
      htmlTitle:
        "Voigtländer Vitessa L: German Precision Optics in a Foldable ...",
      link: "https://www.analog.cafe/r/voigtlander-vitessa-l-fzyi",
      displayLink: "www.analog.cafe",
      snippet:
        "Although I've ran no tests to check this claim, I can confirm that under ideal \nconditions this lens is indeed exceptional. Unfortunately, the camera comes with \na ...",
      htmlSnippet:
        "Although I&#39;ve ran no \u003cb\u003etests\u003c/b\u003e to check this claim, I can confirm that under ideal \u003cbr\u003e\nconditions this lens is indeed exceptional. Unfortunately, the camera comes with \u003cbr\u003e\na&nbsp;...",
      cacheId: "LqPsTazB6VQJ",
      formattedUrl: "https://www.analog.cafe/r/voigtlander-vitessa-l-fzyi",
      htmlFormattedUrl: "https://www.analog.cafe/r/voigtlander-vitessa-l-fzyi",
      pagemap: {
        cse_thumbnail: [
          {
            src:
              "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRbgNCOLZXg-kjfZapztAEcDcwcBQIMHvmQmHL5X6RHHdHfY7owPWWrxkA",
            width: "225",
            height: "225",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1000000_6x-GGaoPa.jpg",
            "next-head-count": "15",
            "twitter:card": "summary_large_image",
            "og:type": "article",
            "apple-mobile-web-app-status-bar-style": "whtie",
            "twitter:site": "@analog_cafe",
            viewport: "initial-scale=1.0, width=device-width",
            "apple-mobile-web-app-capable": "yes",
            "og:title":
              "Voigtländer Vitessa L: German Precision Optics in a Foldable Rangefinder Camera",
            "og:description":
              "Voigtländer Vitessa is a German 35mm film rangefinder camera, manufactured in the mid-1950s. At the top of its line, it boasts a highly-regarded fixed 50mm foldable Ultron lens with an aperture range of 𝑓2-22. Its quiet, vibration-free leaf shutter fires between 1 and 1/500th of a second.",
          },
        ],
        cse_image: [
          {
            src:
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1000000_6x-GGaoPa.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "A Beginner's Guide to Film Photography: 2020 Edition — Analog.Cafe",
      htmlTitle:
        "A Beginner&#39;s Guide to Film Photography: 2020 Edition — Analog.Cafe",
      link:
        "https://www.analog.cafe/r/a-beginners-guide-to-film-photography-zq0f",
      displayLink: "www.analog.cafe",
      snippet:
        "But unlike vehicles and clothing, film cameras are able to withstand the test of \ntime quite well. Because over a billion of them were made and no more than five\n ...",
      htmlSnippet:
        "But unlike vehicles and clothing, film cameras are able to withstand the \u003cb\u003etest\u003c/b\u003e of \u003cbr\u003e\ntime quite well. Because over a billion of them were made and no more than five\u003cbr\u003e\n&nbsp;...",
      cacheId: "Hutk3mvyQPYJ",
      formattedUrl:
        "https://www.analog.cafe/r/a-beginners-guide-to-film-photography-zq0f",
      htmlFormattedUrl:
        "https://www.analog.cafe/r/a-beginners-guide-to-film-photography-zq0f",
      pagemap: {
        cse_thumbnail: [
          {
            src:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQrB8SSLozst8lRLJwQ_eadPWwn2we_QK6I8jFy1EWX7v2GvrVwm9cMrpnq",
            width: "276",
            height: "183",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1507950_HyzuRgCKm.jpg",
            "next-head-count": "15",
            "twitter:card": "summary_large_image",
            "og:type": "article",
            "apple-mobile-web-app-status-bar-style": "whtie",
            "twitter:site": "@analog_cafe",
            viewport: "initial-scale=1.0, width=device-width",
            "apple-mobile-web-app-capable": "yes",
            "og:title": "A Beginner’s Guide to Film Photography: 2020 Edition",
            "og:description":
              "Shooting analogue cameras is not difficult, as long as you have a solid idea of how to do it right, which this guide should aptly provide. If you’ve already got your film and camera, scroll down to “Photography 101,” a four-part sub-series about key photographic concepts.",
          },
        ],
        cse_image: [
          {
            src:
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1507950_HyzuRgCKm.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Lee Webb — Analog.Cafe",
      htmlTitle: "Lee Webb — Analog.Cafe",
      link: "https://www.analog.cafe/u/lee-webb",
      displayLink: "www.analog.cafe",
      snippet:
        "Testing the Canon Sure Shot AF-7 in Chongqing. Part 2 of 2. A well-illustrated \nread with 6 images by Lee Webb. It was published on March 13, 2018 and will ...",
      htmlSnippet:
        "\u003cb\u003eTesting\u003c/b\u003e the Canon Sure Shot AF-7 in Chongqing. Part 2 of 2. A well-illustrated \u003cbr\u003e\nread with 6 images by Lee Webb. It was published on March 13, 2018 and will&nbsp;...",
      cacheId: "cWohrSeEQIsJ",
      formattedUrl: "https://www.analog.cafe/u/lee-webb",
      htmlFormattedUrl: "https://www.analog.cafe/u/lee-webb",
      pagemap: {
        metatags: [
          {
            "og:image":
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1000000_1d24be6dec0a496687a9c2a326c64640.jpg",
            "next-head-count": "16",
            "twitter:card": "summary_large_image",
            "og:type": "profile",
            "apple-mobile-web-app-status-bar-style": "whtie",
            "twitter:site": "@analog_cafe",
            viewport: "initial-scale=1.0, width=device-width",
            "apple-mobile-web-app-capable": "yes",
            "profile:username": "lee-webb",
            "og:title": "Lee Webb — Analog.Cafe",
            "profile:first_name": "Lee",
            "og:description":
              "Englishman in Shanghai. Street photography. Film and vintage lenses. Make it ’til you make it.",
          },
        ],
        cse_image: [
          {
            src:
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1000000_1d24be6dec0a496687a9c2a326c64640.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "Dwell: And The Self-Portraiture Series — Analog.Cafe",
      htmlTitle: "Dwell: And The Self-Portraiture Series — Analog.Cafe",
      link: "https://www.analog.cafe/zine/dwell-uw62",
      displayLink: "www.analog.cafe",
      snippet:
        "... served as an escape from the fear and drudgery (yes, boring: waiting for test \nresults, the extremely focused, rigid medical routines) of the cancer experience.",
      htmlSnippet:
        "... served as an escape from the fear and drudgery (yes, boring: waiting for \u003cb\u003etest\u003c/b\u003e \u003cbr\u003e\nresults, the extremely focused, rigid medical routines) of the cancer experience.",
      cacheId: "ERAVmBgVvZwJ",
      formattedUrl: "https://www.analog.cafe/zine/dwell-uw62",
      htmlFormattedUrl: "https://www.analog.cafe/zine/dwell-uw62",
      pagemap: {
        cse_thumbnail: [
          {
            src:
              "https://encrypted-tbn3.gstatic.com/images?q=tbn:ANd9GcR__eKh8MMMjQS9DgSKqr_qKhj5oh_D8x07HX3WiCd_e_CQaQyJFZpHVhU",
            width: "250",
            height: "202",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_805556_HkuJwxZv7.jpg",
            "next-head-count": "15",
            "twitter:card": "summary_large_image",
            "og:type": "article",
            "twitter:site": "@analog_cafe",
            viewport: "initial-scale=1.0, width=device-width",
            "og:title": "Dwell: And The Self-Portraiture Series",
            "og:description":
              "In the summer of 2017, I was diagnosed with a rare autoimmune condition that was connected to the one word nobody ever wants to hear: cancer. Following many scans and blood work, a splenectomy, a bone marrow biopsy, and chemotherapy, a year later, and my lymphoma is in remission.",
          },
        ],
        cse_image: [
          {
            src:
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1236111_r1FkPeZwQ.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title: "KOTD Level Up: A Vancouver Rap Battle Event — Analog.Cafe",
      htmlTitle: "KOTD Level Up: A Vancouver Rap Battle Event — Analog.Cafe",
      link: "https://www.analog.cafe/r/a-vancouver-rap-battle-event-rjh4",
      displayLink: "www.analog.cafe",
      snippet:
        "Lucky, my yellow Pumas pass the test; there is no one to pat me down in the \nusual fashion of a clubbing “welcome.” Easy. My old hometown, aside from \nstarring ...",
      htmlSnippet:
        "Lucky, my yellow Pumas pass the \u003cb\u003etest\u003c/b\u003e; there is no one to pat me down in the \u003cbr\u003e\nusual fashion of a clubbing “welcome.” Easy. My old hometown, aside from \u003cbr\u003e\nstarring&nbsp;...",
      cacheId: "U65zpX4nduEJ",
      formattedUrl:
        "https://www.analog.cafe/r/a-vancouver-rap-battle-event-rjh4",
      htmlFormattedUrl:
        "https://www.analog.cafe/r/a-vancouver-rap-battle-event-rjh4",
      pagemap: {
        cse_thumbnail: [
          {
            src:
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcTAAAUtOeZDw8UNXhBIGioK2CxPE_AQknibSL_Xuqy0qhizKysxb4a8SMlu",
            width: "275",
            height: "183",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1502090_HklbJXvK4.jpg",
            "next-head-count": "15",
            "twitter:card": "summary_large_image",
            "og:type": "article",
            "apple-mobile-web-app-status-bar-style": "whtie",
            "twitter:site": "@analog_cafe",
            viewport: "initial-scale=1.0, width=device-width",
            "apple-mobile-web-app-capable": "yes",
            "og:title": "KOTD Level Up: A Vancouver Rap Battle Event",
            "og:description":
              "The event is held at a The Red Room, a downtown Vancouver venue. Scheduled for an unusually early seven o’clock in the evening, ending at ten. Ken, who invited me to the event, met me around eight. He held his own show earlier, performing under “Swabski” at the University of British Columbia campus.",
          },
        ],
        cse_image: [
          {
            src:
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1502090_HklbJXvK4.jpg",
          },
        ],
      },
    },
    {
      kind: "customsearch#result",
      title:
        "Polaroid Land SX-70: The Most Comprehensive Instant Camera and ...",
      htmlTitle:
        "Polaroid Land SX-70: The Most Comprehensive Instant Camera and ...",
      link: "https://www.analog.cafe/r/polaroid-sx-70-ycmp",
      displayLink: "www.analog.cafe",
      snippet:
        "Their early tests suffered from the inability to fix the image, having it gradually ... \nJust to add colour to the results, Edwin Land and Howard Rogers had to test ...",
      htmlSnippet:
        "Their early \u003cb\u003etests\u003c/b\u003e suffered from the inability to fix the image, having it gradually ... \u003cbr\u003e\nJust to add colour to the results, Edwin Land and Howard Rogers had to \u003cb\u003etest\u003c/b\u003e&nbsp;...",
      cacheId: "fz0XzFtavuYJ",
      formattedUrl: "https://www.analog.cafe/r/polaroid-sx-70-ycmp",
      htmlFormattedUrl: "https://www.analog.cafe/r/polaroid-sx-70-ycmp",
      pagemap: {
        cse_thumbnail: [
          {
            src:
              "https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcSEMfDUe13rWKeGb2zGBePT8_BAe4id1lpCQIEQ244X5kdd0ofOYlk6FlBo",
            width: "225",
            height: "225",
          },
        ],
        metatags: [
          {
            "og:image":
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1000000_U4U75h8Yf.jpg",
            "next-head-count": "15",
            "twitter:card": "summary_large_image",
            "og:type": "article",
            "apple-mobile-web-app-status-bar-style": "whtie",
            "twitter:site": "@analog_cafe",
            viewport: "initial-scale=1.0, width=device-width",
            "apple-mobile-web-app-capable": "yes",
            "og:title":
              "Polaroid Land SX-70: The Most Comprehensive Instant Camera and Film Guide Online",
            "og:description":
              "SX-70 is a stunning camera. Along with film, it is one of the most technologically advanced products ever created. This is Polaroid’s finest offering; world’s one and only foldable instant SLR. ✹ Update: In this guide, I refer to the company that produces film for SX-70 cameras, Polaroid Originals — formerly named Impossible Project.",
          },
        ],
        cse_image: [
          {
            src:
              "https://res.cloudinary.com/analog-cafe/image/upload/c_fill,fl_progressive,w_1268/image-froth_1000000_U4U75h8Yf.jpg",
          },
        ],
      },
    },
  ],
};

export const getSearchResults = (params, appendItems) => {
  return dispatch => {
    if (params.q === "") {
      dispatch(setSearchStatus(false));
      return dispatch(
        setSearchResults({
          queries: {
            request: [
              {
                count: 0,
                startIndex: 1,
              },
            ],
          },
          items: [],
        })
      );
    }
    dispatch(setSearchStatus(true));

    const { key, cx, url } = GOOGLE_SEARCH_API;
    let status;

    return dispatch(setSearchResults(TEST, appendItems));

    puppy({ url, params: { key, cx, ...params } })
      .then(r => {
        status = r.status;
        return r.json();
      })
      .then(response => {
        dispatch(setSearchStatus(false));
        if (status === 200) dispatch(setSearchResults(response, appendItems));
      })
      .catch(() => {
        dispatch(setSearchStatus(false));
      });
  };
};
