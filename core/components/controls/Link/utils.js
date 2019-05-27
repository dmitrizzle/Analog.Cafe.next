export const makeRelative = (href = "#", domain) => {
  if (!domain) return href || "#";
  const apexName = domain.replace("www.", "");
  let address = href;
  address = address
    .replace("http://" + apexName, "")
    .replace("https://" + apexName, "")
    .replace("http://www." + apexName, "")
    .replace("https://www." + apexName, "");
  return address;
};
