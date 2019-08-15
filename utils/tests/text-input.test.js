import { inputAutoFormat } from "../text-input";

it("Formats punctuation", () => {
  expect(inputAutoFormat("'A'")).toBe("‘A’");
  expect(inputAutoFormat(" 'A' ")).toBe(" ‘A’ ");
  expect(inputAutoFormat(" 'A'")).toBe(" ‘A’");
  expect(inputAutoFormat("'A' ")).toBe("‘A’ ");

  expect(inputAutoFormat('"A"')).toBe("“A”");
  expect(inputAutoFormat(' "A" ')).toBe(" “A” ");
  expect(inputAutoFormat(' "A"')).toBe(" “A”");
  expect(inputAutoFormat('"A" ')).toBe("“A” ");

  expect(inputAutoFormat("A - B")).toBe("A — B");
  expect(inputAutoFormat("A..")).toBe("A… ");
});
