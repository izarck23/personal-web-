import { describe, expect, it } from "vitest";
import { templates, addCartItem, cartTotal, templateZip } from "@/content/templates";
describe("standalone template catalogue", () => {
  it("includes landing, startup and authentication but no generated salon or Genzii app", () => {
    expect(templates.map((item) => item.slug)).toEqual([
      "landing-page",
      "startup",
      "authentication",
    ]);
  });
  it("does not invent template prices", () => {
    expect(cartTotal(["startup"])).toBeNull();
  });
  it("adds each valid template to cart only once", () => {
    expect(addCartItem(["startup"], "startup")).toEqual(["startup"]);
    expect(addCartItem([], "authentication")).toEqual(["authentication"]);
  });
  it("does not add unknown projects", () => {
    expect(addCartItem([], "genzii")).toEqual([]);
  });
  it("keeps downloads separate from app code", () => {
    expect(templateZip("authentication")).toBe("/downloads/authentication-template.zip");
  });
});
