import User from "./";
import { shallow, mount } from "enzyme";
import "jest-styled-components";
import configureStore from "redux-mock-store"; //ES6 modules

describe("User icon tests", () => {
  const middlewares = [];
  const mockStore = configureStore(middlewares);

  it("Has correct dimensions", () => {
    const initialState = { user: { status: "pending" } };
    const store = mockStore(initialState);
    const icon = mount(<User store={store} />);
    expect(icon).toHaveStyleRule("width", "12px");
    expect(icon).toHaveStyleRule("height", "12px");
  });
  it("Shows background image when user is logged in", () => {
    const initialState = {
      user: {
        status: "ok",
        info: {
          image: "image-froth_1499813_rkIHh1PYS",
        },
      },
    };
    const store = mockStore(initialState);
    const icon = mount(<User store={store} />);
    expect(icon).toHaveStyleRule(
      "background-image",
      `url(https://res.cloudinary.com/analog-cafe/image/upload/c_scale,fl_progressive,w_80/image-froth_1499813_rkIHh1PYS.jpg)`
    );
  });
});
