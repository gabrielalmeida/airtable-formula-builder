import f from "./index";

describe("Airtable formula", () => {
  it("creates AND formula", () => {
    expect(f.AND(["X", "Y"])).toEqual("AND(X, Y)");
  });

  it("creates OR formula", () => {
    expect(f.OR(["X", "Y"])).toEqual("OR(X, Y)");
  });

  it("creates EQUALS formula", () => {
    expect(f.EQUALS("X", "Y")).toEqual("{X} = 'Y'");
  });

  it("creates FIND formula", () => {
    expect(f.FIND("X", "Y", ">", "Z")).toEqual('FIND("X", {Y}) > Z');
  });

  it("creates COMMA STRING from ARRAY", () => {
    expect(f._str(["X", "Y", "Z", ""])).toEqual("X, Y, Z");
  });

  it("creates nested OR/AND formula", () => {
    expect(f.AND(["X", f.OR(["Y", "Z"])])).toEqual("AND(X, OR(Y, Z))");
  });
});
