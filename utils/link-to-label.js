export const LINK_LABELS = {
  twitter: "Find Me on Twitter",
  instagram: "Find Me on Instagram",
  facebook: "Find Me on Facebook",
  flickr: "Find Me on Flickr",
  px: "Find Me on 500px",
  website: "Visit My Website",
  youtube: "Find Me on YouTube",
  email: "Email Me",
  etsy: "Visit My Etsy Shop",
  kofi: "Buy Me A Coffee",
  buymeacoffee: "Buy Me A Coffee",
};

export const isEmailSimple = email => {
  let re = /\S+@\S+\.\S+/;
  return re.test(email);
};

export default link => {
  if (link.includes("twitter.com/")) return LINK_LABELS.twitter;
  else if (link.includes("instagram.com/")) return LINK_LABELS.instagram;
  else if (link.includes("youtube.com/")) return LINK_LABELS.youtube;
  else if (link.includes("facebook.com/")) return LINK_LABELS.facebook;
  else if (link.includes("flickr.com/")) return LINK_LABELS.flickr;
  else if (link.includes("500px.com/")) return LINK_LABELS.px;
  else if (link.includes("etsy.com/")) return LINK_LABELS.etsy;
  else if (link.includes("ko-fi.com")) return LINK_LABELS.kofi;
  else if (link.includes("buymeacoffee.com") || link.includes("buymeacoff.ee"))
    return LINK_LABELS.buymeacoffee;
  else if (isEmailSimple(link)) return LINK_LABELS.email;
  else if (link === "") return "";
  else return LINK_LABELS.website;
};

export const fixLinks = link => {
  if (!link || link === "") return "";
  if (isEmailSimple(link))
    return !link.includes("mailto:") ? "mailto:" + link : link;
  return !link.match(/^[a-zA-Z]+:\/\//) ? "http://" + link : link;
};
