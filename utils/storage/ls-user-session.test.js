import { clearComposerStorage, getLocalSessionInfo } from "./ls-user-session";

describe("Test localStorage functions for user sessions", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("Null when window.localStorage is not defined", () => {
    expect(getLocalSessionInfo()).toBe(null);
  });
  it("Returns value when stored", () => {
    const fakeValue = { test: "test" };
    localStorage.setItem("session-info", JSON.stringify(fakeValue));
    getLocalSessionInfo();
    expect(getLocalSessionInfo()).toEqual(fakeValue);
  });

  it("Clears localStorage and adds backup items", () => {
    const fakeStore = {
      "composer-header-state": "123",
      "composer-content-state": "xyz",
      "composer-data": "abc",
    };
    Object.keys(fakeStore).forEach(key =>
      localStorage.setItem(key, fakeStore[key])
    );

    clearComposerStorage();
    Object.keys(fakeStore).forEach(key =>
      expect(localStorage.getItem(key)).toBe(null)
    );
    expect(localStorage.getItem("backup-composer-header-state")).toBe("123");
    expect(localStorage.getItem("backup-composer-content-state")).toBe("xyz");
  });
});
