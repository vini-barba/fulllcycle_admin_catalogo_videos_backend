import SearchParams from "./search-params";

describe("SearchParams Unit Tests", () => {
  test("page prop", () => {
    const params = new SearchParams();
    expect(params.page).toBe(1);

    const arrange = [
      { page: null, expected: 1 },
      { page: undefined, expected: 1 },
      { page: "", expected: 1 },
      { page: "fake", expected: 1 },
      { page: 0, expected: 1 },
      { page: -1, expected: 1 },
      { page: 5.5, expected: 1 },
      { page: true, expected: 1 },
      { page: false, expected: 1 },
      { page: {}, expected: 1 },

      { page: 1, expected: 1 },
      { page: 2, expected: 2 },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ page: i.page as any }).page).toBe(i.expected);
    });
  });

  test("limit prop", () => {
    const params = new SearchParams();
    expect(params.limit).toBe(15);

    const arrange = [
      { limit: null, expected: 15 },
      { limit: undefined, expected: 15 },
      { limit: "", expected: 15 },
      { limit: "fake", expected: 15 },
      { limit: 0, expected: 15 },
      { limit: -1, expected: 15 },
      { limit: 5.5, expected: 15 },
      { limit: true, expected: 15 },
      { limit: false, expected: 15 },
      { limit: {}, expected: 15 },

      { limit: 1, expected: 1 },
      { limit: 2, expected: 2 },
      { limit: 10, expected: 10 },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ limit: i.limit as any }).limit).toBe(
        i.expected
      );
    });
  });

  test("sort prop", () => {
    const params = new SearchParams();
    expect(params.sort).toBeNull();

    const arrange = [
      { sort: null, expected: null },
      { sort: undefined, expected: null },
      { sort: "", expected: null },
      { sort: 0, expected: "0" },
      { sort: -1, expected: "-1" },
      { sort: 5.5, expected: "5.5" },
      { sort: true, expected: "true" },
      { sort: false, expected: "false" },
      { sort: {}, expected: "[object Object]" },
      { sort: "field", expected: "field" },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ sort: i.sort as any }).sort).toBe(i.expected);
    });
  });

  test("sortDir prop", () => {
    let params = new SearchParams();
    expect(params.sortDir).toBeNull();

    params = new SearchParams({ sort: null });
    expect(params.sortDir).toBeNull();

    params = new SearchParams({ sort: undefined });
    expect(params.sortDir).toBeNull();

    params = new SearchParams({ sort: "" });
    expect(params.sortDir).toBeNull();

    const arrange = [
      { sortDir: null, expected: "asc" },
      { sortDir: undefined, expected: "asc" },
      { sortDir: "", expected: "asc" },
      { sortDir: 0, expected: "asc" },
      { sortDir: "fake", expected: "asc" },

      { sortDir: "asc", expected: "asc" },
      { sortDir: "ASC", expected: "asc" },
      { sortDir: "desc", expected: "desc" },
      { sortDir: "DESC", expected: "desc" },
    ];

    arrange.forEach((i) => {
      expect(
        new SearchParams({ sort: "field", sortDir: i.sortDir as any }).sortDir
      ).toBe(i.expected);
    });
  });

  test("filter prop", () => {
    const params = new SearchParams();
    expect(params.filter).toBeNull();

    const arrange = [
      { filter: null, expected: null },
      { filter: undefined, expected: null },
      { filter: "", expected: null },

      { filter: 0, expected: "0" },
      { filter: -1, expected: "-1" },
      { filter: 5.5, expected: "5.5" },
      { filter: true, expected: "true" },
      { filter: false, expected: "false" },
      { filter: {}, expected: "[object Object]" },
      { filter: "field", expected: "field" },
    ];

    arrange.forEach((i) => {
      expect(new SearchParams({ filter: i.filter as any }).filter).toBe(
        i.expected
      );
    });
  });
});
