export const scrubSummary = summary =>
  summary
    .replace(
      "Get Community Letters (articles like this) monthly, via email.",
      ""
    )
    .replace("☞", "")
    .trimLeft();
