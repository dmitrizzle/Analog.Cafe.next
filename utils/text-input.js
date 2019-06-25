export const inputAutoFormat = value =>
  value
    .replace(/'\b/g, "‘")
    .replace(/\b'/g, "’")
    .replace(/"\b/g, "“")
    .replace(/\b"/g, "”")
    .replace(/ - /g, " — ")
    .replace(/\b\.\./g, "… ");
