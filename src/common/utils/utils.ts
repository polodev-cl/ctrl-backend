import { Equal, ILike } from 'typeorm';

export function getWhereFilter(dto: any) {
  return Object.keys(dto).reduce((acc, key) => {
    if (dto[key] && !isNaN(dto[key])) acc[key] = Equal(dto[key]);
    else if (dto[key]) acc[key] = ILike(`%${ dto[key] }%`);
    return acc;
  }, {});
}
