import { BadRequestException, createParamDecorator, ExecutionContext, Type } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import { PropertyType } from '../enum/property-type';
import { PaginationDto } from '../dtos/pagination.dto';
import { DefaultPagination } from '../types/default-pagination';

/**
 * Decorator intended for building a PaginationRequest object based on the query string parameters
 */

export const PaginationParams = <TEntity extends Type<any>>(entity: TEntity) => {
  const entityInstance = new entity();
  const entityOrderKeys: string[] = Reflect.getMetadata(PropertyType.Sort, entityInstance) || [];
  const entitySearchKeys: string[] = Reflect.getMetadata(PropertyType.Search, entityInstance) || [];

  return createParamDecorator(
    (
      data: DefaultPagination = {
        defaultPage: 1,
        defaultLimit: 10,
        defaultSort: {},
        defaultSortDirection: 'ASC',
        defaultSearch: {},
        defaultSearchValue: '',
        maxAllowedSize: 50,
      },
      ctx: ExecutionContext,
    ) => {
      const {
        query: { sortBy, sortDirection, searchBy, searchValue, ...params },
      } = ctx.switchToHttp().getRequest();
      // eslint-disable-next-line prefer-const
      let { page, limit } = params;

      const { defaultLimit, defaultSort, defaultSortDirection, maxAllowedSize, defaultSearch, defaultSearchValue } =
        data;

      // Create and validate a PaginationDto instance
      const paginationDto = plainToInstance(PaginationDto, {
        page: +page,
        limit: +limit,
        sortBy,
        sortDirection,
        searchBy,
        searchValue,
      });
      const errors = validateSync(paginationDto);
      if (paginationDto.sortBy && !entityOrderKeys.includes(paginationDto.sortBy)) {
        errors.push({
          property: 'sortBy',
          constraints: {
            isEnum: `sortBy must be one of the following values: ${entityOrderKeys.join(', ')}`,
          },
        });
      }
      if (paginationDto.searchBy && !entitySearchKeys.includes(paginationDto.searchBy)) {
        errors.push({
          property: 'searchBy',
          constraints: {
            isEnum: `searchBy must be one of the following values: ${entitySearchKeys.join(', ')}`,
          },
        });
      }
      if (errors.length > 0) {
        throw new BadRequestException(
          errors.map((error) => ({ field: error.property, errors: Object.values(error.constraints ?? {}) })),
        );
      }

      const sortParams = sortBy ? { [sortBy]: sortDirection ? sortDirection : defaultSortDirection } : defaultSort;

      const searchParams = searchBy ? { [searchBy]: searchValue ? searchValue : defaultSearchValue } : defaultSearch;

      limit = limit && limit >= 0 ? +limit : defaultLimit;

      limit = +limit < +maxAllowedSize ? limit : maxAllowedSize;
      return Object.assign(data ? data : {}, {
        page,
        limit,
        sortParams,
        searchParams,
      });
    },
  )();
};
