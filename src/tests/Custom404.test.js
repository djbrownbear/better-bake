import * as React from "react";
import { renderWithProviders } from "../utils/test-utils";
import Custom404 from "../components/Custom404";

describe("Custom404", () => {
  it("will match the snapshot", () => {
    const view = renderWithProviders(<Custom404 />);
    expect(view).toMatchSnapshot();
  })
})