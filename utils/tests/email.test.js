import { anonymizeEmail, validateEmail } from "../email";

it("Anonymizes email address", () => {
  expect(anonymizeEmail("person@email.com")).toBe("p***n@email.com");
  expect(anonymizeEmail("a@b.com")).toBe("a***a@b.com");
});
it("Rejects invalid emails", () => {
  expect(validateEmail("correct@email.com")).toBe(true);
  expect(validateEmail("justtext")).toBe(false);
  expect(validateEmail("no@;semicolumn.com")).toBe(false);
  expect(validateEmail("no@#hash.com")).toBe(false);
  expect(validateEmail("no@domain-extension")).toBe(false);
});
