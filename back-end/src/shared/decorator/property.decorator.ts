import { PropertyType } from '../enum/property-type';

export function Property(type: PropertyType) {
  return function (target: any, propertyKey: string) {
    const properties = Reflect.getMetadata(type, target) || [];
    properties.push(propertyKey);
    Reflect.defineMetadata(type, properties, target);
  };
}
