import lscache from "lscache";

import { clearComposerStorage, getLocalSessionInfo } from "./ls-user-session";

describe("Test localStorage functions for user sessions", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("Returns value when stored", () => {
    const fakeValue = { test: "test" };
    lscache.set("session-info", fakeValue);
    getLocalSessionInfo();
    expect(getLocalSessionInfo()).toEqual(fakeValue);
  });

  it("Clears localStorage and adds backup items", () => {
    const fakeStore = {
      "composer-header-state": "123",
      "composer-content-state": "xyz",
      "composer-data": "abc",
    };
    Object.keys(fakeStore).forEach(key => lscache.set(key, fakeStore[key]));

    clearComposerStorage();
    Object.keys(fakeStore).forEach(key => expect(lscache.get(key)).toBe(null));
    expect(lscache.get("backup-composer-header-state")).toBe("123");
    expect(lscache.get("backup-composer-content-state")).toBe("xyz");
  });
});
