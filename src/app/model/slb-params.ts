export class SLBSearchParams {
  params: Map<string, string>;
  searchTerm: 'string';
  pageNumber: number;
  pageSize: number;
  sort: SortOptions;
  constructor() {
    this.sort = new SortOptions();
    this.params = null!;
    this.pageNumber = null!;
    this.searchTerm = 'string';
    this.pageSize = null!;
  }
}
export class SortOptions {
  active: string;
  direction: string;
  constructor() {
    this.active = null!;
    this.direction = null!;
  }
}
