import { getFirstNameFromFull, turnicateSentence } from "../author-credits";

it("Can get first name from full name string", () => {
  expect(getFirstNameFromFull("A B c r@nd0m")).toBe("A");
  expect(getFirstNameFromFull("Name")).toBe("Name");
});

it("Can turnicate sentence without last word remainder", () => {
  expect(turnicateSentence("Two one, zero five", 1)).toBe("…");
  expect(turnicateSentence("Two one, zero five", 3)).toBe("…");
  expect(turnicateSentence("Two one, zero five", 4)).toBe("…");
  expect(turnicateSentence("Two one, zero five", 5)).toBe("Two…");
  expect(turnicateSentence("Two one, zero five", 9)).toBe("Two…");
  expect(turnicateSentence("Two one, zero five", 10)).toBe("Two one…");
  expect(turnicateSentence("Two one, zero five", 14)).toBe("Two one…");
  expect(turnicateSentence("Two one, zero five", 15)).toBe("Two one, zero…");
});
