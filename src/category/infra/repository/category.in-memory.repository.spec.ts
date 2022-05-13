import InMemorySearchableRepository from "../../../@shared/domain/repository/in-memory/in-memory-searchable.repository";
import SearchParams, {
  SortDirection,
} from "../../../@shared/domain/repository/searchable/params/search-params";
import Category from "../../domain/entity/category";
import CategoryInMemoryRepository from "./category.in-memory.repository";

const category1 = new Category({
  id: "1",
  name: "cat 1",
  createdAt: new Date()
});
const category2 = new Category({
  id: "2",
  name: "name",
  createdAt: new Date(new Date().getTime() + 100),
});

const category3 = new Category({
  id: "3",
  name: "cat 3",
  createdAt: new Date(new Date().getTime() + 1000),
});

describe("Test CategoryInMemoryRepository", () => {
  let repository: CategoryInMemoryRepository;
  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
  });

  it("should be defined", () => {
    expect(repository).toBeDefined();
  });

  it("should be instance of InMemorySearchableRepository ", () => {
    expect(repository instanceof InMemorySearchableRepository).toBeTruthy();
  });

  it("should insert a category", async () => {
    await repository.insert(category1);
    expect(repository.items.length).toBe(1);
  });

  it("should find a category", async () => {
    repository.insert(category1);
    const foundCategory = await repository.findById("1");
    expect(foundCategory).toBeDefined();
    expect(foundCategory.id).toBe("1");
    expect(foundCategory.name).toBe("cat 1");
  });

  it("should find all categories", async () => {

    await repository.insert(category1);
    await repository.insert(category2);

    const foundCategories = await repository.findAll();
    expect(foundCategories.length).toBe(2);
    expect(foundCategories[0].id).toBe("1");
    expect(foundCategories[0].name).toBe("cat 1");
    expect(foundCategories[1].id).toBe("2");
    expect(foundCategories[1].name).toBe("name");
  });

  it("should find all categories with filter", async () => {
    await repository.insert(category1);
    await repository.insert(category2);

    const filter = new SearchParams({
      page: 1,
      limit: 2,
      sort: "name",
      filter: "cat 1",
    });
    const foundCategories = await repository.search(filter);
    expect(foundCategories.items.length).toBe(1);
    expect(foundCategories.items[0].id).toBe("1");
    expect(foundCategories.items[0].name).toBe("cat 1");
  });

  it("should find all categories with filter and sort", async () => {
    await repository.insert(category1);
    await repository.insert(category2);
    await repository.insert(category3);

    const filter = new SearchParams({
      page: 1,
      limit: 2,
      sort: "name",
      sortDir: SortDirection.DESC,
      filter: "cat",
    });

    const foundCategories = await repository.search(filter);
    expect(foundCategories.items.length).toBe(2);
    expect(foundCategories.items[0].id).toBe("3");
    expect(foundCategories.items[0].name).toBe("cat 3");
    expect(foundCategories.items[1].id).toBe("1");
    expect(foundCategories.items[1].name).toBe("cat 1");
  });

  it("should return all categories when not filter is passed", async()=>{
    await repository.insert(category1);
    await repository.insert(category2);
    await repository.insert(category3);

    const filter = new SearchParams({
      page: 1,
      limit: 10,
      filter: "",
    });

    const foundCategories = await repository.search(filter);
    expect(foundCategories.items.length).toBe(3);
    expect(foundCategories.items[2].id).toBe("1");
    expect(foundCategories.items[1].id).toBe("2");
    expect(foundCategories.items[0].id).toBe("3");
  })
  

  it("should sort by createdAt if no sort field is informed", async () => {
    await repository.insert(category1);
    await repository.insert(category2);
    await repository.insert(category3);

    const filter1 = new SearchParams({
      page: 1,
      limit: 10,
    });

    const foundCategories1 = await repository.search(filter1);
    expect(foundCategories1.items.length).toBe(3);
    expect(foundCategories1.items[2].id).toBe("1");
    expect(foundCategories1.items[1].id).toBe("2");
    expect(foundCategories1.items[0].id).toBe("3");
  })

  it("should sort by field", async()=>{
    await repository.insert(category2);
    await repository.insert(category1);
    await repository.insert(category3);

    const filter1 = new SearchParams({
      page: 1,
      limit: 10,
      sort: "name",
      sortDir: SortDirection.DESC,
    });

    const foundCategories1 = await repository.search(filter1);
    expect(foundCategories1.items.length).toBe(3);
    expect(foundCategories1.items[0].name).toBe("name");
    expect(foundCategories1.items[1].name).toBe("cat 3");
    expect(foundCategories1.items[2].name).toBe("cat 1");

    const filter2 = new SearchParams({
      page: 1,
      limit: 10,
      sort: "name",
      sortDir: SortDirection.ASC,
    });

    const foundCategories2 = await repository.search(filter2);
    expect(foundCategories2.items.length).toBe(3);
    expect(foundCategories2.items[0].name).toBe("cat 1");
    expect(foundCategories2.items[1].name).toBe("cat 3");
    expect(foundCategories2.items[2].name).toBe("name");

  })
});
