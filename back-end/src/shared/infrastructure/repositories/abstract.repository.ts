import { Repository, SelectQueryBuilder } from 'typeorm';

export abstract class AbstractRepository<T> {
  constructor(protected readonly repository: Repository<T>) {}

  public camelToSnakeCase(str: string): string {
    return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }

  public applySearchParams(
    queryBuilder: SelectQueryBuilder<T>,
    searchParams: Record<string, any>,
  ): SelectQueryBuilder<T> {
    for (const [key, value] of Object.entries(searchParams)) {
      const snakeCaseKey = this.camelToSnakeCase(key);
      queryBuilder.andWhere(`${snakeCaseKey} LIKE :${key}`, {
        [key]: `%${value}%`,
      });
    }
    return queryBuilder;
  }

  public applySortParams(queryBuilder: SelectQueryBuilder<T>, sortParams: Record<string, any>): SelectQueryBuilder<T> {
    Object.entries(sortParams).forEach(([key, direction]) => {
      const snakeCaseKey = this.camelToSnakeCase(key);
      queryBuilder.orderBy(`${snakeCaseKey}`, direction);
    });
    return queryBuilder;
  }
}
