import { applyDecorators, Type } from '@nestjs/common';
import { ApiQuery } from '@nestjs/swagger';
import { PropertyType } from '../enum/property-type';
import { SortDirection } from '../enum/sort-direction';

export const ApiPaginatedRequest = <TEntity extends Type<any>>(entity: TEntity) => {
  const entityInstance = new entity();
  const entityOrderKeys: string[] = Reflect.getMetadata(PropertyType.Sort, entityInstance) || [];
  const entitySearchKeys: string[] = Reflect.getMetadata(PropertyType.Search, entityInstance) || [];

  return applyDecorators(
    ApiQuery({ name: 'page', type: 'number', required: false, example: '1', description: 'Index of page' }),
    ApiQuery({
      name: 'limit',
      type: 'number',
      required: false,
      example: '10',
      description: 'The number of limited items for each page',
    }),
    ApiQuery({
      name: 'sortBy',
      enum: entityOrderKeys,
      required: false,
      description: `Sort items by entity's field`,
    }),
    ApiQuery({
      name: 'sortDirection',
      enum: SortDirection,
      required: false,
      description: 'Sort items by ascending or descending direction',
    }),
    ApiQuery({
      name: 'searchBy',
      enum: entitySearchKeys,
      required: false,
      description: `Search items by entity's field`,
    }),
    ApiQuery({ name: 'searchValue', type: 'string', required: false, description: 'Value of the search field' }),
  );
};
