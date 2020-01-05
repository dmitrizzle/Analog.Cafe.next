import "jest-styled-components";

import { awsDownloadLinkpattern } from "./Dashboard";

describe("Dashboard tests", () => {
  it("Has correct AWS link pattern string", () => {
    expect(awsDownloadLinkpattern).toBe("analog.cafe/downloads/");
  });
});
