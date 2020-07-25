jest.mock("lscache", () => ({ get: jest.fn() }));
import lscache from "lscache";

import { analytics } from "./ga";

describe("Google Analytics implementation tests", () => {
  const flushPromises = () => new Promise(setImmediate);

  beforeEach(() => {
    localStorage.clear();
  });

  it("Checks with LocalStorage for user settings", () => {
    analytics("/");
    expect(lscache.get).toHaveBeenLastCalledWith("privacy-tools");
  });

  it("Loads and initializes `react-ga` package", async () => {
    jest.mock("react-ga", () => ({
      initialize: jest.fn(),
      pageview: jest.fn(),
    }));
    const ga = await import("react-ga");

    localStorage.setItem("ga-enabled", "true");
    analytics("/");
    await flushPromises();

    expect(ga.pageview).toHaveBeenCalled();
    expect(ga.initialize).toHaveBeenCalledWith("UA-91374353-3", {
      debug: false,
      testMode: true,
      titleCase: false,
      gaOptions: {},
      gaAddress: "/static/analytics-201808051558.js",
    });
  });
});
